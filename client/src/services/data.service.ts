import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/';

@Injectable()
export class DataService {
    public accessToken$: BehaviorSubject<any> = new BehaviorSubject<any>(null);
    public user$: BehaviorSubject<any> = new BehaviorSubject<any>(null);

    constructor() { }
}
