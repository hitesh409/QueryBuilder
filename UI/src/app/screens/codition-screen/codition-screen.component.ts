import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';
import { TableModel } from '../../models/dataset-model';
import { Router } from '@angular/router';
import { StateManagementService } from '../../services/state-management-service/state-management.service';
import { Location } from '@angular/common';
import { OverlayService } from '../../services/overlay-service/overlay.service';

interface slotist {
  logical: string | null;
  column: string | null;
  operator: string | null;
  patternType: string | null;
  firstValue: string | number | null;
  secondValue: string | number | null;
}

@Component({
  selector: 'app-codition-screen',
  templateUrl: './codition-screen.component.html',
  styleUrl: './codition-screen.component.css',
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
export class CoditionScreenComponent implements OnInit {
  tableArray: TableModel[] = this.service.tableArray;

  columns: string[] = [];
  generatedQuery: string = '';
  isAggregateFunction: boolean = this.service.aggregateFunctions.length > 0;

  ngOnInit(): void {
    for (let table of this.tableArray) {
      for (let column of table.columnNames) {
        this.columns.push(table.tableName + '.' + column);
      }
    }
  }

  slotList: slotist[] = [
    {
      logical: null,
      column: null,
      operator: null,
      patternType: null,
      firstValue: null,
      secondValue: null,
    },
  ];

  isChecked: boolean = false;
  isEditable: boolean = true;
  isOptionExpanded: boolean = false;

  operators = [
    { value: '=', viewValue: 'Equal to' },
    { value: '<>', viewValue: 'Not Equal to' },
    { value: '>', viewValue: 'Greater than' },
    { value: '<', viewValue: 'Less than' },
    { value: '>=', viewValue: 'Greater than or equal to' },
    { value: '<=', viewValue: 'Less than or equal to' },
    { value: 'LIKE', viewValue: 'Search pattern' },
    { value: 'BETWEEN', viewValue: 'Between' },
    { value: 'NOT BETWEEN', viewValue: 'Not between' },
  ];

  constructor(
    private router: Router,
    private service: StateManagementService,
    private location: Location,
    private overlayService: OverlayService
  ) {}

  reset() {
    const indexToRemove = this.service.generatedQuery.indexOf(
      this.generatedQuery
    );
    if (indexToRemove !== -1) {
      const lengthToRemove = this.generatedQuery.length;
      this.service.generatedQuery =
        this.service.generatedQuery.slice(0, indexToRemove) +
        this.service.generatedQuery.slice(indexToRemove + lengthToRemove);
    }
    this.slotList = [
      {
        logical: null,
        column: null,
        operator: null,
        patternType: null,
        firstValue: null,
        secondValue: null,
      },
    ];

    this.isChecked = false;
    this.isEditable = true;
    this.isOptionExpanded = false;
  }

  addSlot() {
    this.slotList.push({
      logical: null,
      column: null,
      operator: null,
      patternType: null,
      firstValue: null,
      secondValue: null,
    });
  }

  removeSlot(index: number) {
    this.slotList.splice(index, 1);
  }

  allFieldsFilled(): boolean {
    for (const slot of this.slotList) {
      if (
        !slot.column ||
        !slot.operator ||
        !(slot.firstValue || slot.secondValue || slot.patternType)
      ) {
        return false;
      }
    }
    return true;
  }

  getQuery() {
    this.generatedQuery += 'WHERE ';
    for (let slot of this.slotList) {
      if (slot.logical != null) this.generatedQuery += slot.logical + ' ';
      this.generatedQuery += slot.column + ' ';
      this.generatedQuery += slot.operator + ' ';
      if (slot.operator === 'LIKE' && slot.patternType != null) {
        if (slot.patternType === '0')
          this.generatedQuery += `'${slot.firstValue}%' `;
        else if (slot.patternType === '1')
          this.generatedQuery += `'%${slot.firstValue}' `;
        else this.generatedQuery += `'%${slot.firstValue}%' `;
      } else if (slot.operator === 'BETWEEN' || slot.operator === 'NOT BETWEEN')
        this.generatedQuery += `${slot.firstValue} AND ${slot.secondValue} `;
      else this.generatedQuery += slot.firstValue + ' ';
    }
    this.isChecked = true;
    this.isEditable = false;
    console.log('Query: ', this.generatedQuery);
    this.service.generatedQuery += this.generatedQuery;
    this.service.console();
  }

  onBack() {
    const indexToRemove = this.service.generatedQuery.indexOf(
      this.generatedQuery
    );
    if (indexToRemove !== -1) {
      const lengthToRemove = this.generatedQuery.length;
      this.service.generatedQuery =
        this.service.generatedQuery.slice(0, indexToRemove) +
        this.service.generatedQuery.slice(indexToRemove + lengthToRemove);
    }
    this.location.back();
  }

  toggleOptionExpanded() {
    this.isOptionExpanded = !this.isOptionExpanded;
  }

  onNextOrderBy() {
    this.router.navigate(['/app/order-by']);
  }

  onNextGroupBy() {
    this.router.navigate(['/app/group-by']);
  }

  preview() {
    this.overlayService.queryOverlay();
  }
}
