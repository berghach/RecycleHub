import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms'; // Import ReactiveFormsModule

import { AppComponent } from './app.component';
import { RegisterComponent } from './auth/register/register.component'; // Import your RegisterComponent
import { RouterOutlet } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    RouterOutlet,
  ],
  providers: [],
  exports: [ RegisterComponent ],
  bootstrap: [AppComponent]
})
export class AppModule { }