import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { NotificationsService } from 'angular2-notifications';
import { DataService } from '../services/data.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  public token = '';
  private user;

  public notyOptions = {
    timeOut: 5000,
    lastOnBottom: true,
    clickToClose: true,
    maxLength: 0,
    maxStack: 7,
    showProgressBar: true,
    pauseOnHover: true,
    preventDuplicates: false,
    preventLastDuplicates: 'visible',
    rtl: false,
    animate: 'scale',
    position: ['right', 'top']
  };

  constructor (
    public apiService: ApiService,
    public notify: NotificationsService,
    public dataService: DataService,
    public router: Router,
  ) {
    dataService.accessToken$.subscribe(
      accessToken => {
        if (accessToken) {
          this.token = accessToken;
          this.getMyUser();
        }
      }
    );

    // const existToken = localStorage.getItem('token');
    // if (existToken) {
    //   dataService.accessToken$.next(existToken);
    // } else {
    //   this.router.navigate(['/login']);
    // }
  }

  public api(...args): Observable<any> {
    return new Observable<any>(observer => {
      this.apiService[args[0]](...args.slice(1)).subscribe(
        res => {
          if (res.result) {
            observer.next(res);
          } else {
            this.notify.error('Ошибка', res.message);
          }
        },
        err => {
          if (err.status === 401) {
            return this.logOut();
          }

          this.notify.error('Ошибка', 'Ошибка соединения с сервером');
        },
      );
    });
  }

  public logOut() {
    localStorage.clear();
    this.dataService.user$.next(null);
    return this.router.navigate(['/']);
  }

  public getMyUser() {
    this.api('get', 'user', '', this.token).subscribe(
      res => {
        this.dataService.user$.next(res.data);
      }
    );
  }
}
