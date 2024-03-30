import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { MatIconModule } from '@angular/material/icon'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { SharedComponent } from './shared/shared.component';

@NgModule({
  declarations: [
    AppComponent,
    SharedComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatIconModule
  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
