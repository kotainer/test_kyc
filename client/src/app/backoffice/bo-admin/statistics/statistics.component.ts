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

}
