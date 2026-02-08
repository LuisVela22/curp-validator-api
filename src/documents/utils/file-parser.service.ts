import { Injectable, BadRequestException } from '@nestjs/common';
import { PdfReader } from 'pdfreader';

/*
esta clase se encarga de extraer la CURP de un archivo PDF utilizando la biblioteca pdfreader mediante una expresion
regular
*/ 

@Injectable()
export class FileParserService {
  async extractCurp(buffer: Buffer): Promise<string> {
    return new Promise((resolve, reject) => {
      let fullText = '';
      const curpRegex = /[A-Z]{4}\d{6}[HM][A-Z]{5}[A-Z\d]{1}\d{1}/;

      new PdfReader().parseBuffer(buffer, (err, item) => {
        if (err) {
          reject(new BadRequestException('Error al leer el archivo PDF'));
        } else if (!item) {
          //fin del archivo, buscamos el curp en todo el texto acumulado
          const match = fullText.match(curpRegex);
          if (match) {
            resolve(match[0]);
          } else {
            reject(new BadRequestException('No se encontró una CURP válida en el contenido del PDF'));
          }
        } else if (item.text) {
          //se va acumulando el texto de cada celda/linea
          fullText += item.text;
        }
      });
    });
  }
}