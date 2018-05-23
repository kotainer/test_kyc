import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public loginInfo = {
    login: '',
    password: ''
  };

  constructor(
    private appComponent: AppComponent,
    private router: Router,
  ) { }

  ngOnInit() {
    const existToken = localStorage.getItem('token');
    if (existToken) {
      this.appComponent.dataService.accessToken$.next(existToken);
      return this.router.navigate(['/backoffice']);
    }
  }

  public login() {
    this.appComponent.api('create', 'auth/login', this.loginInfo).subscribe(
      res => {
        if (res) {
          localStorage.setItem('token', res.data.token);
          this.appComponent.dataService.user$.next(res.data.user);
          this.appComponent.dataService.accessToken$.next(res.data.token);
          return this.router.navigate(['/backoffice']);
        }
      }
    );
  }

}
