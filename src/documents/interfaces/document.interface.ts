/*
nos ayuda a definir la estructura de los documentos que se almacenaran en la base de datos
*/

export interface IDocument {
    id: string;
    filename: string;
    type: string;
    extratedData?: string;
    status: string;
    userId: string;
    createdAt: Date;
}
