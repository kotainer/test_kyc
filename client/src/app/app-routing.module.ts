import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { BackofficeAdminComponent } from './backoffice-admin/backoffice-admin.component';
import { BackofficeUserComponent } from './backoffice-user/backoffice-user.component';


const routes: Routes = [
  { path: '', component: LoginComponent  },
  { path: 'login', component: LoginComponent  },
  { path: 'backoffice', component: BackofficeUserComponent  , children: [
    { path: '', component: LoginComponent  },
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
