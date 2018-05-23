import { Component, OnInit, OnDestroy  } from '@angular/core';
import { AppComponent } from '../../app.component';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-bo-user',
  templateUrl: './bo-user.component.html',
  styleUrls: ['./bo-user.component.css']
})
export class BoUserComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];

  public user = {
    name: '',
    surname: '',
    isAdmin: false,
    isVerify: false,
    documents: {
      passport: {
        files: [],
        status: 0
      },
      drivingLicense: {
        files: [],
        status: 0 // 0 - новый 1 - отклонен 2 -  принят
      },
      selfie: {
        files: [],
        status: 0 // 0 - новый 1 - отклонен 2 -  принят
      },
      controlSelfie: {
        files: [],
        status: 0 // 0 - новый 1 - отклонен 2 -  принят
      },
      additional: {
        userComment: '',
        files: [],
        status: 0
      },
      controlInfo: {
        text: '',
        place: ''
      },
      status: 'new',
    }
  };

  public statuses = {
    'new': 'Новая',
    'edit': 'На доработке',
    'send': 'На рассмотрении',
    'accept': 'Финально принята',
    'decline': 'Финально отклонена'
  };

  constructor(
    private appComponent: AppComponent,
    private router: Router,
  ) { }

  ngOnInit() {
    const userSub = this.appComponent.dataService.user$.subscribe(
      user => {
        if (user) {
          if (user.isAdmin) {
            return this.router.navigate(['/backoffice/admin']);
          }
          this.user = user;
        }
      }
    );
    this.subscriptions.push(userSub);
  }

  ngOnDestroy() {
    this.subscriptions
      .forEach(s => s.unsubscribe());
  }

  public updloadFile(event, field) {
    const fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      this.appComponent.api('upload', 'user/photo', fileList[0], field, this.appComponent.token).subscribe(
        res => {
          if (res) {
            this.user.documents = res.data.documents;
          }
        }
      );
    }
  }

  public send() {
    if (!this.user.name || !this.user.surname) {
      return this.appComponent.notify.warn('Предупреждение', 'Заполните личную информацию');
    }

    this.user.documents.status = 'send';
    this.appComponent.api('update', 'user', '', this.appComponent.token, this.user).subscribe(
      res => {
        if (res) {
          this.appComponent.notify.success('Уведомление', 'Заявка успешно отправлена');
        }
      }
    );
  }

  public logOut() {
    this.appComponent.logOut();
  }

  public getClass(block) {
    if (block === 'info') {
      if (!this.user.name || !this.user.surname) {
        return 'red';
      } else {
        return 'green';
      }
    }

    const props = {
      main: [
        'passport',
        'drivingLicense',
        'selfie'
      ],
      control: [
        'controlSelfie'
      ]
    };

    let resultStatus = 0;

    for (const prop of props[block]) {
      resultStatus = this.user.documents[prop].status;

      if (resultStatus === 1) {
        return 'red';
      }
    }

    if (resultStatus === 2) {
      return 'green';
    }

    return 'white';
  }

  public getColorNav(flag) {
    if (flag) {
      return 'green';
    } else {
      return '#FABB87';
    }
  }
}
