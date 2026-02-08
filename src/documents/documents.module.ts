import { Module } from '@nestjs/common';
import { DocumentsService } from './documents.service';
import { DocumentsController } from './documents.controller';
import { FileParserService } from './utils/file-parser.service';

@Module({
  controllers: [DocumentsController],
  providers: [DocumentsService, FileParserService],
})
export class DocumentsModule {}