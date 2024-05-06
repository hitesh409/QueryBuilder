import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StateManagementService } from '../../services/state-management-service/state-management.service';

interface slotist{
  logical: string | null,
  column: string | null,
  operator: string | null
  value: string | number | null,
};

@Component({
  selector: 'app-having-clause-screen',
  templateUrl: './having-clause-screen.component.html',
  styleUrl: './having-clause-screen.component.css',
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
export class HavingClauseScreenComponent implements OnInit {
  aggregateFunctions : string[] = this.service.aggregateFunctions;
  generatedQuery : string = '';

  slotList: slotist[] = [
    {
      logical: null,
      column: null,
      operator: null,
      value: null,
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
  ];

  ngOnInit():void{
    for(let column of this.aggregateFunctions){
      this.aggregateFunctions.push(column);
    }
  }

  constructor(private router:Router,private service:StateManagementService){}

  reset() {
    this.slotList = [
      {
        logical: null,
        column: null,
        operator: null,
        value: null,
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
      value: null,
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
        !slot.value
      ) {
        return false;
      }
    }
    return true;
  }

  getQuery() {
    this.generatedQuery += 'HAVING ';
    for (let slot of this.slotList) {
      if (slot.logical != null) this.generatedQuery += slot.logical+" ";
      this.generatedQuery += slot.column+" ";
      this.generatedQuery += slot.operator+" ";
      this.generatedQuery += slot.value+" ";
    }
    this.isChecked = true;
    this.isEditable = false;
    this.service.generatedQuery+=this.generatedQuery;
    this.service.console();
  }

  toggleOptionExpanded() {
    this.isOptionExpanded = !this.isOptionExpanded;
  }

  onNext(){
    this.router.navigate(['/app/order-by'])
  }

}
