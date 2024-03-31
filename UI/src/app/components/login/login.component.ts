import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginModel } from '../../models/user-model';
import { AuthService } from '../../services/auth-service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginModel : LoginModel = {email:'',password:''};
  errorMessage: string = '';
  constructor(private router:Router,private authService:AuthService) {}

  onSubmit(){
    this.authService.loginUser(this.loginModel).subscribe(
      (token: string) => {
        console.log('Login successful!', token);
        localStorage.setItem('token', token);
        this.router.navigate(['/shared']); 
      },
      (error) => {
        console.error('Login error:', error);
        this.errorMessage = error.message || 'Login failed!';
      }
    );
  }
}
