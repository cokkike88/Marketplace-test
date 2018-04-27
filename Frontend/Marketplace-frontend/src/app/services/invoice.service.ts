import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { GLOBAL } from './global';

@Injectable()
export class InvoiceService{
    public url: string;

    constructor(private _http: HttpClient){
        this.url = GLOBAL.url;
    }

    save(pInvoice): Observable<any>{

        let params = JSON.stringify(pInvoice);
        // let params = pProduct;
        let headers = new HttpHeaders().set('Content-Type','application/json');

        console.log('URL: ' + this.url+'invoice');
        console.log('PARAMS: ' + params);
        return this._http.post(this.url+'invoice', params, {headers: headers});
                

    }

    getAll(): Observable<any>{
        return this._http.get(this.url+'product');
    }

}