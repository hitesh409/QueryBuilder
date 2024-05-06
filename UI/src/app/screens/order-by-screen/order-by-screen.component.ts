import { Component, Input, OnInit, input } from '@angular/core';
import { TableModel } from '../../models/dataset-model';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import { Overlay } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { QueryOverlayComponent } from '../../overlays/query-overlay/query-overlay.component';
import { StateManagementService } from '../../services/state-management-service/state-management.service';

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
    private overlay: Overlay,
    private service: StateManagementService
  ) {}

  preview() {
    const overlayRef = this.overlay.create({
      // height:"90vh",
      // width:"90vw",
      positionStrategy: this.overlay
        .position()
        .global()
        .centerHorizontally() // Center horizontally
        .centerVertically(),
      hasBackdrop: true,
      backdropClass: 'dark-backdrop',
      panelClass: 'overlay-panel',
    });
    overlayRef.backdropClick().subscribe(() => {
      overlayRef.dispose();
    });
    const queryOverlayRef = new ComponentPortal(QueryOverlayComponent);
    overlayRef.attach(queryOverlayRef);
  }

  reset() {
    this.generatedQuery = '';
    this.selectedColumn = null;
    this.isChecked = false;
    this.isEditable = true;
  }

  getQuery() {
    this.generatedQuery += `ORDER BY ${this.selectedColumn} `;

    this.isChecked = true;
    this.isEditable = false;
    this.service.generatedQuery+=this.generatedQuery;
    this.service.console();
  }

  toggleOptionExpanded() {
    this.isOptionExpanded = !this.isOptionExpanded;
  }
}
