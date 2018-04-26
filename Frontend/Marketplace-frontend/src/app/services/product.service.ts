import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { GLOBAL } from './global';

@Injectable()
export class ProductService{
    public url: string;

    constructor(private _http: HttpClient){
        this.url = GLOBAL.url;
    }

    guardar(pProduct): Observable<any>{

        let params = JSON.stringify(pProduct);
        // let params = pProduct;
        let headers = new HttpHeaders().set('Content-Type','application/json');

        console.log('URL: ' + this.url+'product');
        console.log('PARAMS: ' + params);
        return this._http.post(this.url+'product', params, {headers: headers});
                    //.map((res: Response) => res.json());
                

    }
}