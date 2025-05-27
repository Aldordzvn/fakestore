import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CatalogoComponent } from './catalogo/catalogo.component';
import { ProductoComponent } from './producto/producto.component';
import { CartComponent } from './cart/cart.component';
import { AboutComponent } from './about/about.component';

export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'catalogo', component: CatalogoComponent},
    {path: 'producto', component: ProductoComponent},
    {path: 'cart', component: CartComponent},
    {path: 'about', component: AboutComponent},
];
