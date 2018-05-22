import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppComponent } from '../app.component';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];

  public loginInfo = {
    login: '',
    password: ''
  };

  constructor(
    private appComponent: AppComponent,
    private router: Router,
  ) { }

  ngOnInit() {
    const existToken = localStorage.getItem('clientToken');
    if (existToken) {
      this.appComponent.token = existToken;
      return this.router.navigate(['/backoffice/']);
    }
  }

  ngOnDestroy() {
    this.subscriptions
      .forEach(s => s.unsubscribe());
  }

  public login() {
    this.appComponent.api('create', 'auth/login', this.loginInfo).subscribe(
      res => {
        if (res) {
          localStorage.setItem('clientToken', res.data.token);
          this.appComponent.dataService.user$.next(res.data.user);
          this.appComponent.dataService.accessToken$.next(res.data.token);
          return this.router.navigate(['/backoffice/profile']);
        }
      }
    );
  }

}
