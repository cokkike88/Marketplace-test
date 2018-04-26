import {Component, OnInit} from '@angular/core';
import {Router, Params, ActivatedRoute } from '@angular/router';
import { Product } from '../../models/product';
import { GLOBAL } from  '../../services/global';
import { ProductService } from '../../services/product.service';
import { ShoppingCartService } from '../../services/shoppingcart.service';

@Component({
    selector: 'product',
    templateUrl: './products.component.html',
    providers: [ProductService, ShoppingCartService]
})
export class ProductsComponent implements OnInit {
    public title: string;
    public lstProducts: Product[];
    public status: string;
    public isSeller: string;

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _productService: ProductService,
        private _shoppingcartService: ShoppingCartService
    ){
        this.title = 'Productos';
        this.isSeller = localStorage.getItem('isseller');
    }

    ngOnInit(){
        console.log('product.component cargador!!');
        this.getAll();
    }

    getAll(){
        this._productService.getAll().subscribe(
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

    onAddShoppingCart(pProductId){
        this._shoppingcartService.save(pProductId, true).subscribe(
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
    
    onUpdateShoppingCart(pProductId){        
        this._shoppingcartService.save(pProductId, false).subscribe(
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