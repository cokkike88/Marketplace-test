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
        console.log(this._productService.guardar());
    }

    onGuardar(){
        console.log(this.product);        
    }
}
