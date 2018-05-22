import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable()
export class ApiService {

    constructor(
        private http: HttpClient
    ) { }

    public create(path: string, data: object, token: string = '', ): Observable<any> {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `${token}`
        });

        return this.http.post(`${environment.apiPath}${environment.apiVer}/${path}`, data, { headers });
    }

    public get(path: string, id: string, token, query: any): Observable<any> {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `${token}`
        });

        return this.http.get(`${environment.apiPath}${environment.apiVer}/${path}${id}`, { headers, params: query });
    }

    public update(path: string, id: string, token: string, data: object): Observable<any> {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `${token}`
        });

        return this.http.put(`${environment.apiPath}${environment.apiVer}/${path}${id}`, data, { headers });
    }
}
