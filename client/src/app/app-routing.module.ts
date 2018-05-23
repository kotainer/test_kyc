import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { BackofficeComponent } from './backoffice/backoffice.component';
import { BoUserComponent } from './backoffice/bo-user/bo-user.component';
import { BoAdminComponent } from './backoffice/bo-admin/bo-admin.component';
import { StatisticsComponent } from './backoffice/bo-admin/statistics/statistics.component';
import { ListComponent } from './backoffice/bo-admin/list/list.component';

const routes: Routes = [
  { path: '', component: LoginComponent  },
  { path: 'login', component: LoginComponent  },
  { path: 'backoffice', component: BackofficeComponent , children: [
    { path: 'user', component: BoUserComponent , children: [
      { path: 'login', component: LoginComponent },
    ]},
    { path: 'admin', component: BoAdminComponent, children: [
      { path: '', component: ListComponent },
      { path: 'statistics', component: StatisticsComponent },
      { path: 'list', component: ListComponent },
    ]}
  ]},
  { path: '**', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
