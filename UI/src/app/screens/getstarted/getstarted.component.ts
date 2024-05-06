import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-getstarted',
  templateUrl: './getstarted.component.html',
  styleUrl: './getstarted.component.css',
})
export class GetstartedComponent {
  constructor(private router: Router) {}

  onNext() {
    this.router.navigate(['/app/display']);
  }
}
