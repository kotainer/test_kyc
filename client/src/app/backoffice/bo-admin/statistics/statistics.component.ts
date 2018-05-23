import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../../../app.component';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {
  private subscriptions: Subscription[] = [];
  public stats = {
    new: 0,
    send: 0,
    edit: 0,
    accepted: 0,
    declined: 0,
    all: 0
  };

  constructor(
    private appComponent: AppComponent,
    private router: Router,
  ) { }

  ngOnInit() {
    this.getStat();
  }

  public getStat() {
    this.appComponent.api('get', 'admin/users', '/stats', this.appComponent.token, {}).subscribe(
      res => {
        if (res) {
          this.stats = res.data;
        }
      }
    );
  }

  public checkSummNumber(n1, n2) {
    if (n1 + n2 === 0) {
      return 1;
    }

    return n1 + n2;
  }

}
