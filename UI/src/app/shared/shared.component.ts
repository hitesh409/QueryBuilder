import { Component } from '@angular/core';

@Component({
  selector: 'app-shared',
  templateUrl: './shared.component.html',
  styleUrl: './shared.component.css'
})
export class SharedComponent {
  showLogoutOverlay = false;

  toggleOverlay() {
    this.showLogoutOverlay = !this.showLogoutOverlay;
  }

  handleLogout() {
    console.log('User logged out!'); 
    this.showLogoutOverlay = false;
  }
}
