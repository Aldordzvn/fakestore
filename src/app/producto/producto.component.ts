import { AfterViewInit, Component, Inject, PLATFORM_ID } from '@angular/core';
import { ApiServiceService } from '../api-service.service';
import { ActivatedRoute, Route, Router, RouterLink, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SharedServiceService } from '../shared-service.service';
import { LocalStorageService } from '../local-storage.service';
import { isPlatformBrowser } from '@angular/common';
import { url } from 'inspector';

@Component({
  selector: 'app-producto',
  imports: [CommonModule, RouterModule],
  templateUrl: './producto.component.html',
  styleUrl: './producto.component.scss'
})
export class ProductoComponent implements AfterViewInit {
  arrowFlujo = 'img/right_arrow.svg';
  cartImg = 'img/carDelivery.svg';
  stockImg = 'img/stockHouse.svg';
  guaranteedImg = 'img/guaranteed.svg';
  producto: any = '';
  id: any = '';
  category: any = '';
  relatedProducts: any[] = [];
  cart: any[] = [];


  constructor(private apiService: ApiServiceService, private route: ActivatedRoute, private sharedService: SharedServiceService, private localStorage: LocalStorageService, @Inject(PLATFORM_ID) private platformId: Object, private router: Router) { }

  ngOnInit() {
    this.id = this.route.snapshot.queryParams['id'];
    this.category = this.route.snapshot.queryParams['category'];
    this.setProducto();
    this.limitProducts();
    this.cart = this.localStorage.loadFromLocalStorage();
    console.log(this.cart.length);
    setTimeout(() => {
      if (this.cart.length) {
        this.sharedService.productsCount.next(Number(this.cart.length));
      }
    })
  }

  ngAfterViewInit(): void {
    this.scrollFragment();
  }

  scrollFragment() {
    this.route.fragment.subscribe(fragment => {
      if (fragment) {
        const seccion = document.getElementById(fragment);
        if (seccion) {
          seccion.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  }

  setProducto() {
    this.apiService.getSingleProduct(this.id).subscribe((item) => {
      this.producto = item;
    });
  }

  addProductCar() {
    if (this.producto) {
      this.cart.push(this.producto);
      console.log('se agrego el producto', this.producto);
      this.localStorage.saveToLocalStorage(this.cart);
      this.sharedService.actualizarNumero(this.cart.length);
      console.log(this.cart);
    } else {
      console.log("No se encontro el producto", this.producto);
    }
  }

  limitProducts() {
    if (!isPlatformBrowser(this.platformId)) return;
    let limit = 4;
    const width = window.innerWidth;

    if (width <= 878) {
      limit = 2;
    }
    else if (width <= 1024) {
      limit = 3;
    }

    this.apiService.getProductsByCategory(this.category).subscribe((item) => {
      this.relatedProducts = item.filter(product => product.id !== Number(this.id)).slice(0, limit);
    });
  }

  recargarProducto(id: number) {
    this.id = id;
    this.setProducto();
    this.limitProducts();
    this.scrollFragment();
  }

}
