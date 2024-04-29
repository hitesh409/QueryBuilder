import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { TableModel } from '../../models/dataset-model';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { MatSelect } from '@angular/material/select';

interface Slotist {
  joinType: string | null;
  rightTable: TableModel | null;
  selectedColumn: string | null;
  basedOnCondition1: string | null;
  basedOncondition2: string | null;
}

@Component({
  selector: 'app-combine-tables-screen',
  templateUrl: './combine-tables-screen.component.html',
  styleUrls: ['./combine-tables-screen.component.css'],
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
export class CombineTablesScreenComponent {
  @Input() tables: TableModel[] = [];
  @Output() selectedTable: EventEmitter<TableModel[]> = new EventEmitter<TableModel[]>();
  @Output() generatedSubQuery: EventEmitter<string> = new EventEmitter<string>();
  tooltipText1: string = "Select Matching Column from left Table";
  tooltipText2: string = "Select Matching Column from right Table";
  valueSelected1: boolean = false;
  valueSelected2: boolean = false;
  
  @ViewChild('selectBox1') selectBox1!: MatSelect;
  @ViewChild('selectBox2') selectBox2!: MatSelect;
  
  ngAfterViewInit() {
    if (this.selectBox1) {
      this.selectBox1.selectionChange.subscribe(() => {
        this.valueSelected1 = true;
        this.tooltipText1 = "";
      });
    }

    if (this.selectBox2) {
      this.selectBox2.selectionChange.subscribe(() => {
        this.valueSelected2 = true;
        this.tooltipText2 = "";
      });
    }
  }

  generatedQuery: string = '';
  slotList: Slotist[] = [
    {
      joinType: null,
      rightTable: null,
      selectedColumn: null,
      basedOnCondition1: null,
      basedOncondition2: null,
    },
  ];

  selectedColumns: string[] = [];
  selectedAggr: string[] = [];
  isChecked: boolean = false;
  isEditable: boolean = true;
  isOptionExpanded: boolean = false;
  tableArray: TableModel[] = [];
  leftMostTable : TableModel | null = null;

  aggregateFunctions = [
    { value: 'SUM', viewValue: 'Sum' },
    { value: 'COUNT', viewValue: 'Count' },
    { value: 'AVG', viewValue: 'Average' },
    { value: 'MIN', viewValue: 'Minimum' },
    { value: 'MAX', viewValue: 'Maximum' },
  ];

  joins = [
    { value: 'INNER JOIN', viewValue: 'matched rows from both tables' },
    { value: 'LEFT JOIN', viewValue: 'rows from left table' },
    { value: 'RIGHT JOIN', viewValue: 'rows from right table' },
    { value: 'FULL JOIN', viewValue: 'rows from both tables' },
  ];

  onTableSelected(table: TableModel) {
    const exists = this.tableArray.some(t => t.tableName === table.tableName);
    if (!exists) {
      this.tableArray.push(table);
      console.log(this.tableArray);
    }
  }

  onEmitTable(){
    this.selectedTable.emit(this.tableArray);
  }

  reset() {
    this.generatedQuery = '';
    this.slotList = [
      {
        joinType: null,
        rightTable: null,
        selectedColumn: null,
        basedOnCondition1: null,
        basedOncondition2: null,
      },
    ];
    this.leftMostTable = null;
    this.selectedColumns = [];
    this.selectedAggr = [];
    this.isChecked = false;
    this.isEditable = true;
    this.tableArray = [];
  }

  addSlot() {
    this.slotList.push({
      joinType: null,
      rightTable: null,
      selectedColumn: null,
      basedOnCondition1: null,
      basedOncondition2: null,
    });
  }

  removeSlot(index: number) {
    this.slotList.splice(index, 1);
  }

  allFieldsFilled(): boolean {
    for (const slot of this.slotList) {
      if (
        !slot.rightTable ||
        !slot.joinType ||
        !slot.basedOnCondition1 ||
        !slot.basedOncondition2 
      ) {
        return false;
      }
    }
    return true;
  }

  getQuery() {
    
    this.generatedQuery += this.leftMostTable?.tableName+" ";

    for(let slot of this.slotList)
      {
        this.generatedQuery += slot.joinType+" ";
        this.generatedQuery += slot.rightTable?.tableName+" ";
        this.generatedQuery += "ON ";
        this.generatedQuery += slot.basedOnCondition1+" ";
        this.generatedQuery += "= ";
        this.generatedQuery += slot.basedOncondition2+" ";
      }

    this.isChecked = true;
    this.isEditable = false;
    this.onEmitTable();
    this.generatedSubQuery.emit(this.generatedQuery);
    console.log('Query: ', this.generatedQuery);
  }

  toggleOptionExpanded() {
    this.isOptionExpanded = !this.isOptionExpanded;
  }
}
