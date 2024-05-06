import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TableModel } from '../../models/dataset-model';
import { Router } from '@angular/router';
import { StateManagementService } from '../../services/state-management-service/state-management.service';

interface slotist {
  selectedAggregateFunction: string | null;
  selectedColumn: string | null;
}

@Component({
  selector: 'app-display-columns-screen',
  templateUrl: './display-columns-screen.component.html',
  styleUrl: './display-columns-screen.component.css',
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
export class DisplayColumnsScreenComponent implements OnInit {
  tableArray: TableModel[] = this.service.tableArray;
  subQuery: string | null = this.service.subQuery;

  columns: string[] = []; //to be replace with tableArray
  generatedQuery: string = '';
  slotList: slotist[] = [
    { selectedAggregateFunction: null, selectedColumn: null },
  ];

  selectedColumns: string[] = [];
  selectedAggr: string[] = [];
  isChecked: boolean = false;
  isEditable: boolean = true;
  isOptionExpanded: boolean = false;

  aggregateFunctions = [
    { value: 'SUM', viewValue: 'Sum' },
    { value: 'COUNT', viewValue: 'Count' },
    { value: 'AVG', viewValue: 'Average' },
    { value: 'MIN', viewValue: 'Minimum' },
    { value: 'MAX', viewValue: 'Maximum' },
  ];

  constructor(
    private router: Router,
    private service: StateManagementService
  ) {}

  ngOnInit():void{
    for(let table of this.tableArray){
      for(let column of table.columnNames)
      this.columns.push(table.tableName+"."+column)
    }
  }

  onAggragateSelected() {
    this.service.aggregateFunctions=this.selectedAggr;
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

    this.generatedQuery += ` FROM ${this.subQuery} `;

    this.isChecked = true;
    this.isEditable = false;

    this.service.generatedQuery+=this.generatedQuery;
    this.service.console();
  }

  toggleOptionExpanded() {
    this.isOptionExpanded = !this.isOptionExpanded;
  }

  onNextCondition() {
    this.router.navigate(['/app/condition-selection']);
  }

  onNextGroupBy() {
    this.router.navigate(['/app/group-by']);
  }
}
