export interface DatasetModel {
    id:string,
    name:string,
    uploadedAt:Date,
}

export interface TableModel{
    tableName:string;
    columnNames:string[];
}