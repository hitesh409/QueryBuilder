import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

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
export class HavingClauseScreenComponent {
  @Input() aggregateFunctions : string[] = [];

  aggFuns: string[] = ['COUNT(id)','SUM(salary)','AVG(salary)','MAX(age)'] //to be replaced with aggregateFunctions
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

  constructor(private router:Router){}

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
    console.log('Query: ', this.generatedQuery);
  }

  toggleOptionExpanded() {
    this.isOptionExpanded = !this.isOptionExpanded;
  }

  onNext(){
    this.router.navigate(['/app/order-by'])
  }

}
