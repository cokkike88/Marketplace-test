import {Component, OnInit} from '@angular/core';
import {Router, Params, ActivatedRoute } from '@angular/router';
import { ShoppingCart } from '../../models/shoppingcart';
import { GLOBAL } from  '../../services/global';
import { ProductService } from '../../services/product.service';
import { ShoppingCartService } from '../../services/shoppingcart.service';
import { InvoiceService } from '../../services/invoice.service';

@Component({
    selector: 'shoppingcart',
    templateUrl: './shoppingcart.component.html',
    providers: [ProductService, ShoppingCartService, InvoiceService]
})
export class ShoppingCartComponent implements OnInit {
    public title: string;
    public lstProducts: ShoppingCart[];
    public status: string;
    public isSeller: string;
    public total: number;

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _productService: ProductService,
        private _shoppingcartService: ShoppingCartService,
        private _invoiceService: InvoiceService
    ){
        this.title = 'Carrito';
        this.isSeller = localStorage.getItem('isseller');
        this.total = 0;
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
                    
                    response.data.forEach(product => {
                        product.total = product.cost * product.quantity;
                    });

                    this.lstProducts = response.data; 
                    this.setTotal();
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
    
    onSaveInvoice(){
        var invoice = {
            invoiceId: 0,
            userId: localStorage.getItem('userid'),
            total: this.total,
            detaill : this.lstProducts
        }

        this._invoiceService.save(invoice).subscribe(
            response => {                
                //console.log("RESPONSE: " + JSON.stringify(response));
                if(response.code != 200){
                                                            
                    this.status = 'error';
                }
                else{                                                          
                    this.status = 'success'; 
                    this.getAll();
                }
                
            },
            error => {
                console.log(<any>error);
            }
        );
    }

    totalDetail(pProductId){
        let product = this.lstProducts.find(x => x.productId == pProductId);
        console.log(JSON.stringify(product));
        product.total = product.quantity * product.cost;
        this.setTotal();
    }

    setTotal(){
        this.total = 0;
        this.lstProducts.forEach(product => {
            this.total += product.total;
        });
    }
}