import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrl: './display.component.css',
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
export class DisplayComponent {
  isExpanded = false;

  constructor(private router: Router) {}

  displayOption() {
    this.isExpanded = !this.isExpanded;
  }

  onNextTable() {
    this.router.navigate(['/app/table-selection']);
  }

  onNextCombineTable() {
    this.router.navigate(['/app/combine-tables']);
  }
}
