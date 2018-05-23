import { Component, OnInit, OnDestroy  } from '@angular/core';
import { AppComponent } from '../app.component';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-backoffice',
  templateUrl: './backoffice.component.html'
})
export class BackofficeComponent implements OnInit, OnDestroy  {
  private subscriptions: Subscription[] = [];

  constructor(
    private appComponent: AppComponent,
    private router: Router,
  ) { }

  ngOnInit() {
    const existToken = localStorage.getItem('token');
    if (existToken) {
      this.appComponent.token = existToken;
      this.appComponent.getMyUser();
    } else {
      return this.router.navigate(['/login']);
    }

    const userSub = this.appComponent.dataService.user$.subscribe(
      user => {
        if (user) {
          if (this.router.url === '/backoffice') {
            if (user.isAdmin) {
              return this.router.navigate(['/backoffice/admin']);
            } else {
              return this.router.navigate(['/backoffice/user']);
            }
          }
        }
      }
    );
    this.subscriptions.push(userSub);
  }

  ngOnDestroy() {
    this.subscriptions
      .forEach(s => s.unsubscribe());
  }

}
