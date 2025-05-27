import { Component } from '@angular/core';
import { LocalStorageService } from '../local-storage.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { SharedServiceService } from '../shared-service.service';
import { resolve } from 'path';

@Component({
  selector: 'app-cart',
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {
  cartItems: any[] = [];
  filterItems: any[] = [];
  deleteItemImg = 'img/close_cart.svg';
  successImg = 'img/success.svg';
  emptyImg = 'img/noProducts.svg';
  subtotal: number | undefined = undefined;
  total: number | undefined = undefined;
  toggleModal: boolean = false;
  toggleEmptyObjects: boolean = true;
  toggleCartView: boolean = false;

  constructor(private localStorage: LocalStorageService, private router: Router, private sharedService: SharedServiceService) { }

  ngOnInit() {
    this.cartItems = this.localStorage.loadFromLocalStorage();
    this.subtotal = this.subtotalFunction();
    this.filterItems = this.filterProducts();
    this.total = this.totalFunction();
    this.toggleViews();
    console.log('Shared Service:', this.sharedService);
  };

  toggleViews() {
    if (!this.cartItems.length) {
      this.toggleCartView = true;
      this.toggleEmptyObjects = false;
    } else {
      this.toggleCartView = false;
      this.toggleEmptyObjects = true;
    }
  }

  subtotalFunction(): number {
    let subtotal = 0;
    for (let item of this.cartItems) {
      subtotal += item.price;
    }
    return subtotal;
  }

  totalFunction() {
    let subtotal = this.subtotalFunction();
    let resultado = subtotal + 50 + 29;
    return resultado;
  }

  showModal() {
    this.toggleModal = true;
    console.log(this.toggleModal);
  }

  closeModal(){
    this.deleteLocalStorage().then(() => {this.toggleModal = false; this.actualizarDatos()});
  }

  filterProducts() {
    const grouped: { [key: string]: any } = {};

    this.cartItems.forEach(item => {
      if (grouped[item.id]) {
        grouped[item.id].quantity += 1;
      } else {
        grouped[item.id] = { ...item, quantity: 1 };
      }
    });
    return Object.values(grouped);
  }

  removeSingleProduct(productId: number) {
    const cart = JSON.parse(localStorage.getItem('cart') || ('[]'));
    const indexARemover = cart.findIndex((item: any) => item.id === productId);
    if (indexARemover !== -1) {
      cart.splice(indexARemover, 1);
      localStorage.setItem('cart', JSON.stringify(cart));
      this.actualizarDatos();
    }
  }

  deleteAllProduct(idProduct: string) {
    const cart = JSON.parse(localStorage.getItem('cart') || ('[]'));
    const indexRemove = cart.findIndex((item: any) => item.id === idProduct);
    if (indexRemove !== -1) {
      cart.splice(indexRemove);
      this.localStorage.saveToLocalStorage(cart);
      this.actualizarDatos();
    }
    this.toggleViews();
  }

  deleteLocalStorage(): Promise<void> {
    return new Promise((resolve) => {
      this.localStorage.deleteLocalStorage();
      resolve();
    });
  }

  incrementarProducto(item: any) {
    this.cartItems.push(item);
    this.localStorage.saveToLocalStorage(this.cartItems);
    this.actualizarDatos();
  }

  actualizarDatos() {
    this.cartItems = this.localStorage.loadFromLocalStorage();
    this.subtotal = this.subtotalFunction();
    this.filterItems = this.filterProducts();
    this.total = this.totalFunction();
    this.sharedService.actualizarNumero(this.cartItems.length);
    this.toggleViews();
  }

  // recargarComponente() {
  //   const urlActual = this.router.url;
  //   this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
  //     this.router.navigate([urlActual]);
  //   });
  // }
}
