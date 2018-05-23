import { Component, OnInit, OnDestroy  } from '@angular/core';
import { AppComponent } from '../../app.component';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-bo-admin',
  templateUrl: './bo-admin.component.html'
})
export class BoAdminComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];

  constructor(
    private appComponent: AppComponent,
    private router: Router,
  ) { }

  ngOnInit() {
    const userSub = this.appComponent.dataService.user$.subscribe(
      user => {
        if (user) {
          if (!user.isAdmin) {
            return this.router.navigate(['/backoffice/user']);
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

  public logOut() {
    this.appComponent.logOut();
  }

}
