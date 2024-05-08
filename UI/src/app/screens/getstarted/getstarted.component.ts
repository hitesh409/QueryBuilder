import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StateManagementService } from '../../services/state-management-service/state-management.service';

@Component({
  selector: 'app-getstarted',
  templateUrl: './getstarted.component.html',
  styleUrl: './getstarted.component.css',
})
export class GetstartedComponent {
  constructor(
    private router: Router,
    private service: StateManagementService
  ) {}

  isallowed: boolean = this.service.chosenDataset != null;
  isDisplay: boolean = false;

  ngOnInit(): void {
    this.service.console();
  }

  onNext() {
    if (this.service.chosenDataset==null) {
      this.isDisplay = true;
    } else {this.router.navigate(['/app/display']);
    this.service.flag=false;
  }
  }
}
