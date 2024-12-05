import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginModel } from '../../models/user-model';
import { AuthService } from '../../services/auth-service/auth.service';
import { MessageService } from 'primeng/api';
import { getErrorMessage } from '../../Utility/validation';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginModel : LoginModel = {email:'',password:''};
  errorMessage: string = '';
  constructor(private router:Router,private authService:AuthService,private messageService:MessageService) {}

  getError(control: any, fieldName: string): string | null {
    return getErrorMessage(control, fieldName);
  }

  onSubmit(){
    this.authService.loginUser(this.loginModel).subscribe(
      (response: any) => {
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', response.user.username);
        localStorage.setItem('email',response.user.email)
        this.messageService.add({
          severity: 'success',
          summary: 'Login Successfully',
          detail: 'You have successfully logged in!',
          closable: false
        });
        setTimeout(() => {
          this.router.navigate(['/app']); 
        }, 3000);
      },
      (error) => {
        console.error('Login error:', error);
        this.errorMessage = error.error || 'Login failed!';
        this.messageService.add({
          severity: 'error',
          summary: 'Login Error',
          detail: this.errorMessage,
          closable: false
        });
      }
    );
  }
}
