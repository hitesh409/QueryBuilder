import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrl: './display.component.css',
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
