import { Component, OnInit, OnDestroy  } from '@angular/core';
import { AppComponent } from '../../../app.component';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];
  private skip = 0;
  private limit = 1;
  private count = 0;

  public list = [];

  constructor(
    private appComponent: AppComponent,
    private router: Router,
  ) { }

  ngOnInit() {
    this.getList(this.skip, this.limit);
  }

  ngOnDestroy() {
    this.subscriptions
      .forEach(s => s.unsubscribe());
  }

  public getList(skip, limit, update = false) {
    this.appComponent.api('get', 'admin/users', '/requests', this.appComponent.token, {skip, limit}).subscribe(
      res => {
        if (res) {
          if (update) {
            this.list = [];
          }

          this.list.push(...res.data.list);
          this.count = res.data.count;
        }
      }
    );
  }

  public saveChanges(item) {
    this.appComponent.api('update', 'admin/users/requests/', item._id, this.appComponent.token, item).subscribe(
      res => {
        if (res) {
          this.appComponent.notify.success('Уведомление', 'Данные успешно обновлены');
          // this.getList(this.skip, this.limit, true);
        }
      }
    );
  }

  public finally(user, status) {
    user.documents.status = status;

    if (status === 'accept') {
      user.isVerify = true;
    }

    this.saveChanges(user);
    this.getList(0, this.skip, true);
  }

  public checkCount() {
    if (this.skip < this.count) {
      return true;
    }

    return false;
  }

  public getMore() {
    this.skip += this.limit;
    this.getList(this.skip, this.limit);
  }

}
