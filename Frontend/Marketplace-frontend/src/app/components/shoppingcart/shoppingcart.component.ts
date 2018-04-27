import {Component, OnInit} from '@angular/core';
import {Router, Params, ActivatedRoute } from '@angular/router';
import { ShoppingCart } from '../../models/shoppingcart';
import { GLOBAL } from  '../../services/global';
import { ProductService } from '../../services/product.service';
import { ShoppingCartService } from '../../services/shoppingcart.service';

@Component({
    selector: 'shoppingcart',
    templateUrl: './shoppingcart.component.html',
    providers: [ProductService, ShoppingCartService]
})
export class ShoppingCartComponent implements OnInit {
    public title: string;
    public lstProducts: ShoppingCart[];
    public status: string;
    public isSeller: string;

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _productService: ProductService,
        private _shoppingcartService: ShoppingCartService
    ){
        this.title = 'Carrito';
        this.isSeller = localStorage.getItem('isseller');
    }

    ngOnInit(){
        console.log('product.component cargador!!');
        this.getAll();
    }

    getAll(){
        this._shoppingcartService.getAll().subscribe(
            response => {                
                //console.log("RESPONSE: " + JSON.stringify(response));
                if(response.code != 200){
                                                            
                    this.status = 'error';
                    console.log("Error");
                }
                else{
                    this.lstProducts = response.data;                                      
                }
                
            },
            error => {
                console.log(<any>error);
            }
        );
    }

    onDeleteShoppingCart(pProductId){
        this._shoppingcartService.delete(pProductId).subscribe(
            response => {                
                //console.log("RESPONSE: " + JSON.stringify(response));
                if(response.code != 200){
                                                            
                    this.status = 'error';
                }
                else{                                                          
                    this.getAll();
                }
                
            },
            error => {
                console.log(<any>error);
            }
        );
    }  
    
    onUpdateShoppingCart(pProductId){        

        let product = this.lstProducts.find(x => x.productId == pProductId);

        this._shoppingcartService.save(pProductId, product.quantity, false).subscribe(
            response => {                
                //console.log("RESPONSE: " + JSON.stringify(response));
                if(response.code != 200){
                                                            
                    this.status = 'error';
                }
                else{                                                          
                    this.status = 'success'; 
                }
                
            },
            error => {
                console.log(<any>error);
            }
        );
    } 
}