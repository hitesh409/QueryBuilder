import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RegisterModel } from '../../models/user-model';
import { AuthService } from '../../services/auth-service/auth.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { getErrorMessage } from '../../Utility/validation';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css',
})
export class SigninComponent {
  registerModel: RegisterModel = { username: '', password: '', email: '' };
  errorMessage: string = '';

  constructor(
    private router: Router,
    private authService: AuthService,
    private messageService: MessageService
  ) {}

  getError(control: any, fieldName: string): string | null {
    return getErrorMessage(control, fieldName);
  }

  onSubmit() {
    this.authService.registerUser(this.registerModel).subscribe(
      (user: any) => {
        console.log('User created successfully', user);
        this.messageService.add({
          severity: 'success',
          summary: 'Sign Up Successful',
          detail: 'You have successfully created an account!',
          closable: false,
        });
        
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 3000);
      },
      (error) => {
        console.log('Sign up error', error);
        this.errorMessage = error.error || 'sign up failed';
        this.messageService.add({
          severity: 'error',
          summary: 'Sign Up error',
          detail: this.errorMessage,
          closable: false,
        });
      }
    );
  }
}
