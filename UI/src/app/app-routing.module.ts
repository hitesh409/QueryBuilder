import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedComponent } from './shared/shared.component';
import { LoginComponent } from './components/login/login.component';
import { authGuard } from './services/guard-services/auth-guard/auth.guard';
import { loginGuard } from './services/guard-services/login-guard/login.guard';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'shared', component: SharedComponent, canActivate: [authGuard]},
  { path: 'login', component: LoginComponent,canActivate:[loginGuard]},
  // { path: '**', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
