import { Component, EventEmitter, Input, Output, output } from '@angular/core';
import { TableModel } from '../../models/dataset-model';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';

interface slotist {
  selectedAggregateFunction: string | null;
  selectedColumn: string | null;
}

@Component({
  selector: 'app-table-screen',
  templateUrl: './table-screen.component.html',
  styleUrl: './table-screen.component.css',
  animations: [
    trigger('fadeInOut', [
      state(
        'void',
        style({
          opacity: 0,
        })
      ),
      transition('void <=> *', animate('0.4s ease')),
    ]),
  ],
})
export class TableScreenComponent {
  @Input() tables: TableModel[] = [];
  @Output() selectedTable: EventEmitter<TableModel[]> = new EventEmitter<
    TableModel[]
  >();
  @Output() AggregateList: EventEmitter<string[]> = new EventEmitter<
    string[]
  >();

  generatedQuery: string = '';
  slotList: slotist[] = [
    { selectedAggregateFunction: null, selectedColumn: null },
  ];
  table: TableModel | null = null;
  selectedColumns: string[] = [];
  selectedAggr: string[] = [];
  isChecked: boolean = false;
  isEditable: boolean = true;
  isOptionExpanded: boolean = false;
  tableArray: TableModel[] = [];

  aggregateFunctions = [
    { value: 'SUM', viewValue: 'Sum' },
    { value: 'COUNT', viewValue: 'Count' },
    { value: 'AVG', viewValue: 'Average' },
    { value: 'MIN', viewValue: 'Minimum' },
    { value: 'MAX', viewValue: 'Maximum' },
  ];

  onTableSelected(table: TableModel) {
    this.tableArray.push(table);
    this.selectedTable.emit(this.tableArray);
  }

  onAggragateSelected(){
    this.AggregateList.emit(this.selectedAggr);
  }

  toggleCheckBox(column: string, event: any) {
    if (event.checked) {
      this.selectedColumns.push(column);
    } else {
      const index = this.selectedColumns.indexOf(column);
      if (index >= 0) this.selectedColumns.splice(index, 1);
    }
  }

  hasSelectedAggrAndColumns(): boolean {
    return this.slotList.some(
      (slot) => slot.selectedAggregateFunction && slot.selectedColumn
    );
  }

  reset() {
    this.generatedQuery = '';
    this.slotList = [{ selectedAggregateFunction: null, selectedColumn: null }];
    this.table = null;
    this.selectedColumns = [];
    this.selectedAggr = [];
    this.isChecked = false;
    this.isEditable = true;
  }

  addSlot() {
    this.slotList.push({
      selectedAggregateFunction: null,
      selectedColumn: null,
    });
  }

  removeSlot(index: number) {
    this.slotList.splice(index, 1);
  }

  getQuery() {
    for (let agg of this.slotList) {
      if (agg.selectedAggregateFunction && agg.selectedColumn) {
        this.selectedAggr.push(
          `${agg.selectedAggregateFunction}(${agg.selectedColumn})`
        );
      }
    }

    if (this.selectedAggr.length != 0) {
      const aggString = this.selectedAggr.join(', ');
      this.generatedQuery += aggString;
      this.onAggragateSelected();
    }

    if (this.selectedColumns.length != 0) {
      const columns = this.selectedColumns.join(', ');
      if (this.generatedQuery.length != 0) {
        this.generatedQuery += ', ';
      }
      this.generatedQuery += columns;
    }

    

    this.generatedQuery += ` from ${this.table?.tableName}`;

    this.isChecked = true;
    this.isEditable = false;

    console.log('Query: ', this.generatedQuery);
  }

  toggleOptionExpanded() {
    this.isOptionExpanded = !this.isOptionExpanded;
  }
}
