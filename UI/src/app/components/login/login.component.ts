import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginModel } from '../../models/user-model';
import { AuthService } from '../../services/auth-service/auth.service';
import { getErrorMessage } from '../../Utility/validation';
import { NotificationService } from '../../services/notification-service/notification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginModel: LoginModel = { email: '', password: '' };
  errorMessage: string = '';
  constructor(
    private router: Router,
    private authService: AuthService,
    private notification: NotificationService
  ) {}

  getError(control: any, fieldName: string): string | null {
    return getErrorMessage(control, fieldName);
  }

  onSubmit() {
    this.authService.loginUser(this.loginModel).subscribe(
      (response: any) => {
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', response.user.username);
        localStorage.setItem('email', response.user.email);

        this.notification.showSuccess(
          'Login Successfully',
          'You have successfully logged in!'
        );
        setTimeout(() => {
          this.router.navigate(['/app']);
        }, 3000);
      },
      (error) => {
        console.error('Login error:', error);
        this.errorMessage = error.error || 'Login failed!';
        this.notification.showError('Login Error', this.errorMessage);
      }
    );
  }
}
