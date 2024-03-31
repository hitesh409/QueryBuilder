import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { authGuard } from './guard/auth-guard/auth.guard';
import { loginGuard } from './guard/login-guard/login.guard';
import { SharedComponent } from './shared/shared/shared.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'shared', component: SharedComponent, canActivate: [authGuard]},
  { path: 'login', component: LoginComponent,canActivate:[loginGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
