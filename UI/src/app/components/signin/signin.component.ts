import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RegisterModel } from '../../models/user-model';
import { AuthService } from '../../services/auth-service/auth.service';
import { getErrorMessage } from '../../Utility/validation';
import { NotificationService } from '../../services/notification-service/notification.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css',
})
export class SigninComponent {
  registerModel: RegisterModel = { username: '', password: '', email: '' };
  errorMessage: string = '';
  isLoading: boolean = false;
  constructor(
    private router: Router,
    private authService: AuthService,
    private notification: NotificationService
  ) {}

  getError(control: any, fieldName: string): string | null {
    return getErrorMessage(control, fieldName);
  }

  onSubmit() {
    this.isLoading = true;
    this.authService.registerUser(this.registerModel).subscribe(
      (user: any) => {
        console.log('User created successfully', user);

        this.notification.showSuccess(
          'Sign Up Successful',
          'You have successfully created an account!'
        );
        setTimeout(() => {
          this.isLoading = false;
          this.router.navigate(['/login']);
        }, 2000);
      },
      (error) => {
        console.log('Sign up error', error);
        this.errorMessage = error.error || 'sign up failed';
        this.isLoading = false;
        this.notification.showError('Sign Up error', this.errorMessage);
      }
    );
  }
}
