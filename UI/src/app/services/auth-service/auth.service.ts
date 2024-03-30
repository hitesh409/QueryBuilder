import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginModel, RegisterModel } from '../../models/user.model';
import { Observable, map } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private url = 'https://localhost:7127/api/Users/';

  constructor(private http: HttpClient) {}

  registerUser(registerModel: RegisterModel): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post(this.url + 'register', registerModel, { headers });
  }

  loginUser(loginModel: LoginModel): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post(this.url + 'login', loginModel, { headers }).pipe(
      map((response) => {
        localStorage.setItem('token', response.toString());
        return response;
      })
    );
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    if (!token) {
      return false;
    }

    try {
      const decoded: any = jwtDecode(token);
      const expiration = decoded.exp;

      return Date.now() / 1000 < expiration;
    } catch (error) {
      console.error('Error decoding token:', error);
      return false;
    }
  }

  logout(): void {
    localStorage.removeItem('token');
  }
}
