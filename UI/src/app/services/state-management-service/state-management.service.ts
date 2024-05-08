import { Injectable } from '@angular/core';
import { DatasetModel, TableModel } from '../../models/dataset-model';

@Injectable({
  providedIn: 'root',
})
export class StateManagementService {
  constructor() {}

  tables: TableModel[] = [];
  chosenDataset: DatasetModel | null = null;
  tableArray: TableModel[] = [];
  aggregateFunctions: string[] = [];
  subQuery: string | null = null;
  generatedQuery: string = 'SELECT ';
  flag: boolean = true;
  console() {
    console.log('tables: ', this.tables);
    console.log('chosenDataset: ', this.chosenDataset);
    console.log('tableArray: ', this.tableArray);
    console.log('aggregateFuction: ', this.aggregateFunctions);
    console.log('subquery: ', this.subQuery);
    console.log('Final Query: ', this.generatedQuery);
  }
}
