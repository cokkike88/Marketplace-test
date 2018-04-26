import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { GLOBAL } from './global';

@Injectable()
export class ShoppingCartService{
    public url: string;

    constructor(private _http: HttpClient){
        this.url = GLOBAL.url;
    }

    save(pProductId, add): Observable<any>{

        let params; 
        
        if (add){
            params = {
                productId: pProductId,
                userId: localStorage.getItem('userid'),
                quantity: 1,
                add: true
            };
        }
        else{
            params = {
                productId: pProductId,
                userId: localStorage.getItem('userid'),
                quantity: 1                
            }
        }
        
        
        let headers = new HttpHeaders().set('Content-Type','application/json');

        console.log('URL: ' + this.url+'shoppingcart');
        console.log('PARAMS: ' + JSON.stringify(params));
        return this._http.post(this.url+'shoppingcart', params, {headers: headers});                
    }

    getAll(): Observable<any>{
        let userid = localStorage.getItem('userid');
        return this._http.get(this.url + 'shoppingcart/' + userid);
    }

}