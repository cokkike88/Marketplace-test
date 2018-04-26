import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { GLOBAL } from './global';

@Injectable()
export class UserService{
    public url: string;

    constructor(private _http: HttpClient){
        this.url = GLOBAL.url;
    }

    login(pUser): Observable<any>{
        let params = JSON.stringify(pUser);
        let headers = new HttpHeaders().set('Content-Type','application/json');
        
        return this._http.post(this.url+'login', params, {headers: headers});

    }

}