import { IsString, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

/*
este DTO nos ayuda a definir la estructura de los datos que se esperan al crear un nuevo documento
*/ 

export class CreateDocumentDto {
    @ApiProperty({example: 'Identificacion oficial', description: 'Nombre del documento'})
    @IsString()
    filename: string;

    @ApiProperty({example: 'pdf', description: 'Tipo de documento'})
    @IsEnum(['pdf', 'jpg', 'png'])
    contentType: string;
}
