import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, Input } from '@angular/core';
import { TableModel } from '../../models/dataset-model';
import { Router } from '@angular/router';

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
export class GroupByScreenComponent {

  @Input() tableArray: TableModel[] = [];

  columns = ['column1', 'column2', 'column3', 'column4']; //to be replaced with tableArray columns
  generatedQuery: string = '';
  selectedColumn: string | null = null;
  isChecked: boolean = false;
  isEditable: boolean = true;
  isOptionExpanded: boolean = false;

  constructor(private router:Router){}

  reset() {
    this.generatedQuery = '';
    this.selectedColumn = null;
    this.isChecked = false;
    this.isEditable = true;
  }

  getQuery(){

    this.generatedQuery+=`ORDER BY ${this.selectedColumn} `

    this.isChecked = true;
    this.isEditable = false;
    console.log('Query: ', this.generatedQuery);
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
