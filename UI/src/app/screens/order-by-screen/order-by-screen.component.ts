import { Component, Input, OnInit, input } from '@angular/core';
import { TableModel } from '../../models/dataset-model';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import { StateManagementService } from '../../services/state-management-service/state-management.service';
import { Location } from '@angular/common';
import { OverlayService } from '../../services/overlay-service/overlay.service';

@Component({
  selector: 'app-order-by-screen',
  templateUrl: './order-by-screen.component.html',
  styleUrl: './order-by-screen.component.css',
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
export class OrderByScreenComponent implements OnInit {
  tableArray: TableModel[] = this.service.tableArray;

  columns: string[] = [];
  generatedQuery: string = '';
  selectedColumn: string | null = null;
  selectedOrder: string | null = null;
  isChecked: boolean = false;
  isEditable: boolean = true;
  isOptionExpanded: boolean = false;

  ngOnInit(): void {
    for (let table of this.tableArray) {
      for (let column of table.columnNames) {
        this.columns.push(table.tableName + '.' + column);
      }
    }
  }

  constructor(
    private overlayService: OverlayService,
    private service: StateManagementService,
    private location: Location
  ) {}

  preview() {
    this.overlayService.queryOverlay();
  }

  reset() {
    this.generatedQuery = '';
    this.selectedColumn = null;
    this.isChecked = false;
    this.isEditable = true;
  }

  getQuery() {
    this.generatedQuery += `ORDER BY ${this.selectedColumn} ${this.selectedOrder} `;

    this.isChecked = true;
    this.isEditable = false;
    this.service.generatedQuery += this.generatedQuery;
    this.service.console();
  }

  toggleOptionExpanded() {
    this.isOptionExpanded = !this.isOptionExpanded;
  }

  onBack() {
    this.location.back();
  }
}
