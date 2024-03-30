import { Component, NgModule, OnInit } from '@angular/core';
import { LoginModel } from '../../models/user.model';
import { AuthService } from '../../services/auth-service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  loginModel : LoginModel = {email:'',password:''};
  errorMessage: string = '';

  constructor(private authService : AuthService, private router: Router) {}

  ngOnInit(): void {}

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
