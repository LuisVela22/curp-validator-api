import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { FileParserService } from './utils/file-parser.service';

/*
aqui se implementan los metodos para subir y procesar
los documentos
*/

@Injectable()
export class DocumentsService {
    constructor(
        private prisma: PrismaService,
        private fileParser: FileParserService
    ) { }

    async uploadAndProcess(file: Express.Multer.File, userId: string) {
        const curp = await this.fileParser.extractCurp(file.buffer);

        return this.prisma.document.create({
            data: {
                filename: file.originalname,
                type: 'PDF', 
                extractedData: curp,
                status: 'VALIDATED',
                userId: userId,
            },
        });
    }

    async findAll(userId: string, page: number, limit: number, search?: string, type?: string) {
        const skip = (page - 1) * limit;

        const where: any = {
            userId: userId, 
        };

        if (type) {
            where.type = type;
        }

    
        if (search) {
            where.OR = [
                { filename: { contains: search, mode: 'insensitive' } },
                { extractedData: { contains: search, mode: 'insensitive' } },
            ];
        }

        //consulta con paginacion y filtros
        const [total, data] = await Promise.all([
            this.prisma.document.count({ where }),
            this.prisma.document.findMany({
                where,
                skip,
                take: limit,
                orderBy: { id: 'desc' },
            }),
        ]);

        return {
            meta: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit),
            },
            data,
        };
    }
}
