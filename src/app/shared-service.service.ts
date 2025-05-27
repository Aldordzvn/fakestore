import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class SharedServiceService {
  productsCount: BehaviorSubject<number>;
  count!: Observable<number>;
  constructor(private router: Router, private localStorage: LocalStorageService) {
    const items = this.localStorage.loadFromLocalStorage().length;
    this.productsCount = new BehaviorSubject<number>(items);
    this.count = this.productsCount.asObservable();
  }

  actualizarNumero(numero: number) {
    this.productsCount.next(numero);
  }

}
