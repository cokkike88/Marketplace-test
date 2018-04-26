import {Component, OnInit} from '@angular/core';
import {Router, Params, ActivatedRoute } from '@angular/router';
import { Product } from '../../models/product';
import { GLOBAL } from  '../../services/global';
import { ProductService } from '../../services/product.service';

@Component({
    selector: 'product',
    templateUrl: './product.component.html',
    providers: [ProductService]
})

export class ProductComponent implements OnInit {
    public title: string;
    public product: Product;
    public status: string;

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _productService: ProductService
    ){
        this.title = 'Producto';
        this.product = new Product(0, '', 0, 0);
    }

    ngOnInit(){
        console.log('product.component cargador!!');
        
    }

    onSave(){
        this._productService.save(this.product).subscribe(
            response => {                
                //console.log("RESPONSE: " + JSON.stringify(response));
                if(response.code != 200){
                                                            
                    this.status = 'error';
                }
                else{
                    this.product = new Product(0, '', 0, 0);                                      
                    this.status = 'success'; 
                }
                
            },
            error => {
                console.log(<any>error);
            }
        );
    }
}
