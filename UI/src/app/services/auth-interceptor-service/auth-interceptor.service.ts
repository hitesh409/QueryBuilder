import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Authinterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token');
      if(token){
        const authReq = req.clone({
          headers: req.headers.set('Authorization', `Bearer ${token}`),
        });
        return next.handle(authReq);
      }
      return next.handle(req);
  }
  constructor() { }
}
