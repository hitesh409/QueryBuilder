import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { OverlayModule } from '@angular/cdk/overlay';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { LoginComponent } from './components/login/login.component';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule, MatIconButton } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { HttpClientModule } from '@angular/common/http';
import { SharedComponent } from './shared/shared/shared.component';
import { MatIconModule } from '@angular/material/icon';
import { LogoutComponent } from './components/logout/logout.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UploadDatabaseComponent } from './components/upload-database/upload-database.component';
import { GetstartedComponent } from './screens/getstarted/getstarted.component';
import { DisplayComponent } from './screens/display/display.component';
import { TableScreenComponent } from './screens/table-screen/table-screen.component';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CoditionScreenComponent } from './screens/codition-screen/codition-screen.component';
import { OrderByScreenComponent } from './screens/order-by-screen/order-by-screen.component';
import { GroupByScreenComponent } from './screens/group-by-screen/group-by-screen.component';
import { HavingClauseScreenComponent } from './screens/having-clause-screen/having-clause-screen.component';
import { CombineTablesScreenComponent } from './screens/combine-tables-screen/combine-tables-screen.component';
import { DisplayColumnsScreenComponent } from './screens/display-columns-screen/display-columns-screen.component';
import { QueryOverlayComponent } from './overlays/query-overlay/query-overlay.component';
import { MatTableModule } from '@angular/material/table';
import { SigninComponent } from './components/signin/signin.component';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SharedComponent,
    LogoutComponent,
    UploadDatabaseComponent,
    GetstartedComponent,
    DisplayComponent,
    TableScreenComponent,
    CoditionScreenComponent,
    OrderByScreenComponent,
    GroupByScreenComponent,
    HavingClauseScreenComponent,
    CombineTablesScreenComponent,
    DisplayColumnsScreenComponent,
    QueryOverlayComponent,
    SigninComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatIconButton,
    MatIconModule,
    MatTooltipModule,
    ScrollingModule,
    BrowserAnimationsModule,
    MatSelectModule,
    MatCheckboxModule,
    OverlayModule,
    MatTableModule,
    ToastModule,
    ButtonModule,
    RippleModule,
  ],
  providers: [provideAnimationsAsync(),MessageService],
  bootstrap: [AppComponent],
})
export class AppModule {}
