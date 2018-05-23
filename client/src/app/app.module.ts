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

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';

import { SimpleNotificationsModule } from 'angular2-notifications';
import { MAT_DATE_LOCALE } from '@angular/material';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { BackofficeComponent } from './backoffice/backoffice.component';
import { BoUserComponent } from './backoffice/bo-user/bo-user.component';
import { BoAdminComponent } from './backoffice/bo-admin/bo-admin.component';
import { StatisticsComponent } from './backoffice/bo-admin/statistics/statistics.component';
import { ListComponent } from './backoffice/bo-admin/list/list.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    BackofficeComponent,
    BoUserComponent,
    BoAdminComponent,
    StatisticsComponent,
    ListComponent,
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
    MatExpansionModule,
    MatSidenavModule,
    MatIconModule,
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
