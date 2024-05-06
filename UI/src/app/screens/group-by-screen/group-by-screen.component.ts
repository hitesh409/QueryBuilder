import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';
import { TableModel } from '../../models/dataset-model';
import { Router } from '@angular/router';
import { StateManagementService } from '../../services/state-management-service/state-management.service';

@Component({
  selector: 'app-group-by-screen',
  templateUrl: './group-by-screen.component.html',
  styleUrl: './group-by-screen.component.css',
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
export class GroupByScreenComponent implements OnInit {

  tableArray: TableModel[] = this.service.tableArray;

  columns : string[] = [];
  generatedQuery: string = '';
  selectedColumn: string | null = null;
  isChecked: boolean = false;
  isEditable: boolean = true;
  isOptionExpanded: boolean = false;

  ngOnInit():void{
    for(let table of this.tableArray){
      for(let column of table.columnNames){
        this.columns.push(table.tableName+"."+column);
      }
    }
  }

  constructor(private router:Router,private service:StateManagementService){}

  reset() {
    this.generatedQuery = '';
    this.selectedColumn = null;
    this.isChecked = false;
    this.isEditable = true;
  }

  getQuery(){

    this.generatedQuery+=`GROUP BY ${this.selectedColumn} `

    this.isChecked = true;
    this.isEditable = false;
    this.service.generatedQuery+=this.generatedQuery;
    this.service.console();
  }

  toggleOptionExpanded() {
    this.isOptionExpanded = !this.isOptionExpanded;
  }

  onNextHaving(){
    this.router.navigate(['/app/having-clause'])
  }

  onNextOrderBy(){
    this.router.navigate(['/app/order-by'])
  }

}
