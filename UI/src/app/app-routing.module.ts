import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { authGuard } from './guard/auth-guard/auth.guard';
import { loginGuard } from './guard/login-guard/login.guard';
import { SharedComponent } from './shared/shared/shared.component';
import { GetstartedComponent } from './screens/getstarted/getstarted.component';
import { TableScreenComponent } from './screens/table-screen/table-screen.component';
import { CoditionScreenComponent } from './screens/codition-screen/codition-screen.component';
import { DisplayComponent } from './screens/display/display.component';
import { OrderByScreenComponent } from './screens/order-by-screen/order-by-screen.component';
import { GroupByScreenComponent } from './screens/group-by-screen/group-by-screen.component';
import { HavingClauseScreenComponent } from './screens/having-clause-screen/having-clause-screen.component';
import { CombineTablesScreenComponent } from './screens/combine-tables-screen/combine-tables-screen.component';
import { DisplayColumnsScreenComponent } from './screens/display-columns-screen/display-columns-screen.component';
import { appStartGuard } from './guard/app-start-guard/app-start.guard';
import { SigninComponent } from './components/signin/signin.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  // { path: 'shared', component: SharedComponent, canActivate: [authGuard] },
  { path: 'login', component: LoginComponent, canActivate: [loginGuard] },
  { path: 'signin', component: SigninComponent },
  {
    path: 'app',
    canActivate: [appStartGuard],
    children: [
      {
        path: '',
        component: SharedComponent,
        canActivate: [authGuard],
        children: [
          { path: '', redirectTo: 'get-started', pathMatch: 'full' },
          { path: 'get-started', component: GetstartedComponent },
          { path: 'display', component: DisplayComponent },
          { path: 'table-selection', component: TableScreenComponent },
          { path: 'condition-selection', component: CoditionScreenComponent },
          { path: 'order-by', component: OrderByScreenComponent },
          { path: 'group-by', component: GroupByScreenComponent },
          { path: 'having-clause', component: HavingClauseScreenComponent },
          { path: 'combine-tables', component: CombineTablesScreenComponent },
          { path: 'display-columns', component: DisplayColumnsScreenComponent },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
