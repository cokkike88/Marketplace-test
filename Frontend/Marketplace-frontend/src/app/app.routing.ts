import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { ProductComponent } from './components/product/product.component';
import { ProductsComponent } from './components/products/products.component';
import { LoginComponent } from './components/login/login.component';

const appRoutes: Routes = [
    {path: '', component: HomeComponent},
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path: 'home', component: HomeComponent },
    {path: 'product', component: ProductComponent },
    {path: 'products', component: ProductsComponent },
    {path: 'login', component: LoginComponent }
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);