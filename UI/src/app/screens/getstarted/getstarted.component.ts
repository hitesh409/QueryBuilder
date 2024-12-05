import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StateManagementService } from '../../services/state-management-service/state-management.service';
import { NotificationService } from '../../services/notification-service/notification.service';

@Component({
  selector: 'app-getstarted',
  templateUrl: './getstarted.component.html',
  styleUrl: './getstarted.component.css',
})
export class GetstartedComponent {
  constructor(
    private router: Router,
    private service: StateManagementService,
    private notification: NotificationService
  ) {}

  isallowed: boolean = this.service.chosenDataset != null;
  userName: string | null = '';

  ngOnInit(): void {
    this.userName = localStorage.getItem('user');
    this.service.console();
  }

  onNext() {
    if (this.service.chosenDataset==null) {
      this.notification.showWarning('Warning','please select database first')
    } else {this.router.navigate(['/app/display']);
    this.service.flag=false;
  }
  }
}
