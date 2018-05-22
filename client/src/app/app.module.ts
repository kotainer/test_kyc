import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from '../services/api.service';
import { DataService } from '../services/data.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';

import {
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
} from '@angular/material';

import {MatInputModule} from '@angular/material/input';
import { FormsModule } from '@angular/forms';

import { SimpleNotificationsModule } from 'angular2-notifications';
import { MAT_DATE_LOCALE } from '@angular/material';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { BackofficeAdminComponent } from './backoffice-admin/backoffice-admin.component';
import { BackofficeUserComponent } from './backoffice-user/backoffice-user.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    BackofficeAdminComponent,
    BackofficeUserComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SimpleNotificationsModule.forRoot(),
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatInputModule,
    FormsModule,
  ],
  providers: [
    ApiService,
    DataService,
    AppComponent,
    {provide: MAT_DATE_LOCALE, useValue: 'ru-RU'},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
