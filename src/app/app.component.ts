import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router, RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { SharedServiceService } from './shared-service.service';
import { LocalStorageService } from './local-storage.service';
import { count } from 'console';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'fakestore';
  shoppingCart = "img/shopping.svg";
  searchIcon = "img/search.svg";
  github = 'img/github.svg';
  linkedin = 'img/linkedin.svg';
  burgerImg = 'img/burger.svg';
  leftArrowImg = 'img/left_arrow.svg';
  countItems: number | null = null;
  cartGlobal: any[] = [];
  countZero: boolean = false;
  toggleMenu: boolean = false;

  constructor(private sharedService: SharedServiceService, private localStorage: LocalStorageService, private router: Router) {
  }

  ngOnInit() {
    this.cartGlobal = this.localStorage.loadFromLocalStorage();
    this.countItems = Number(this.cartGlobal.length);
    this.sharedService.count.subscribe(count => {
      this.countItems = count;
      if(this.countItems >= 1){
        this.countZero = false;
      }else{
        this.countZero = true;
      }
    });
  }

  recargarComponente() {
    // const urlActual = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(["catalogo"]);
    });
  }

  toggleMenuHamburger() {
    this.toggleMenu = !this.toggleMenu;
  }
}
