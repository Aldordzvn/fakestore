import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  loadFromLocalStorage(): any[] {
    const cart = localStorage.getItem('cart');
    return cart ? JSON.parse(cart) : [];
  };

  saveToLocalStorage(array:any[]) {
    localStorage.setItem('cart', JSON.stringify(array));
  }

  deleteLocalStorage(){
    localStorage.removeItem('cart');
  }
}
