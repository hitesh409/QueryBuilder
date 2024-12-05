import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth-service/auth.service';
import { OverlayRef } from '@angular/cdk/overlay';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.css',
})
export class LogoutComponent {
  @Input() showOverlay = true;
  @Output() logoutClicked = new EventEmitter<void>();
  username: string | null = '';
  email: string | null = '';
  isLoading: boolean = false;
  constructor(
    @Inject(OverlayRef) private overlayRef: OverlayRef,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.username = localStorage.getItem('user');
    this.email = localStorage.getItem('email');
  }

  logout() {
    this.isLoading = true
    this.authService.logout();
    setTimeout(() => {
      this.isLoading = false;
      this.overlayRef.dispose();
      this.router.navigate(['/login']);
    }, 2000);
  }

  closeOverlay() {
    this.overlayRef.dispose();
  }
}
