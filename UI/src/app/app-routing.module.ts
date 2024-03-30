import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './services/auth.guard';
import { SharedComponent } from './shared/shared.component';

const routes: Routes = [
  { path: 'shared', component: SharedComponent ,canActivate:[AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
