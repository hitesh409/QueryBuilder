import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TableModel } from '../../models/dataset-model';

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
export class DisplayColumnsScreenComponent {
  @Input() tableArray : TableModel[] = [];
  @Input() subQuery : string = "subQuery";
  @Output() AggregateList: EventEmitter<string[]> = new EventEmitter<
  string[]
>();

  columns: string[] = ['column1', 'column2', 'column3', 'column4']; //to be replace with tableArray
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

    

    this.generatedQuery += ` FROM ${this.subQuery}`;

    this.isChecked = true;
    this.isEditable = false;

    console.log('Query: ', this.generatedQuery);
  }

  toggleOptionExpanded() {
    this.isOptionExpanded = !this.isOptionExpanded;
  }


}
