import { Component, ElementRef, ViewChild, AfterViewInit, ViewChildren, QueryList, ChangeDetectorRef } from '@angular/core';
import { ApiServiceService } from '../api-service.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { resolve } from 'path';
import { url } from 'inspector';

@Component({
  selector: 'app-catalogo',
  imports: [CommonModule, RouterLink],
  templateUrl: './catalogo.component.html',
  styleUrl: './catalogo.component.scss'
})
export class CatalogoComponent {
  arrowImg = 'img/right_arrow.svg';
  arrowSliderImg = 'img/arrow_slider.svg';
  items: any[] = [];
  categories: any[] = ["men's clothing", "jewelery", "electronics", "women's clothing"];
  filteredProducts: any[] = [];
  selectedCategories: string[] = [];
  selectedOrder: string = '';
  filterImg = 'img/filters.svg';
  leftArrowImg = 'img/left_arrow.svg';
  mostrarElementos: boolean = false;
  toggleFilters: boolean = false;
  toggleShowAllProducts: boolean = false;
  toggleFilteredProducts: boolean = true;
  categoriaCheck: string = '';

  constructor(private apiService: ApiServiceService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.traerDatos().then(() => {
      this.checksDefault();
    });
    this.categoriaCheck = this.activatedRoute.snapshot.queryParams['category'];
  }

  // ngAfterViewInit(): void {
  //   setTimeout(() => {
  //     console.log(this.categories);
  //     this.checksDefault();
  //   }, 2000);
  // }

  toggleMostrar() {
    this.mostrarElementos = !this.mostrarElementos;
  }

  toggleFilterMenu() {
    this.toggleFilters = !this.toggleFilters;
  }


  traerDatos(): Promise<void> {
    return new Promise((resolve) => {
      this.apiService.getProducts().subscribe((item) => {
        this.items = item;
        this.filteredProducts = item;
        resolve();
      });
    });
  }

  filterProducts() {
    let result = [...this.items];

    if (this.selectedCategories.length) {
      this.toggleShowAllProducts = true;
      result = result.filter(product => {
        return this.selectedCategories.includes(product.category);
      });
      this.toggleFilteredProducts = false;
    } else {
      this.toggleShowAllProducts = false;
      this.toggleFilteredProducts = true;
    }

    if (this.selectedOrder === 'lower') {
      result.sort((a, b) => a.price - b.price);
    } else if (this.selectedOrder === 'higher') {
      result.sort((a, b) => b.price - a.price);
    } else if (this.selectedOrder === 'all') {
      this.recargarComponente();
    }

    if (this.selectedCategories.length) {
      this.filteredProducts = result;
    } else {
      this.items = result;
    }

    // this.items = result;
  }

  onCategoryChange(event: any) {
    const value = event.target.value;
    if (event.target.checked) {
      this.selectedCategories.push(value);
      console.log(value);
    } else {
      this.selectedCategories = this.selectedCategories.filter(c => c !== value);
    }
    this.filterProducts();
  }

  onOrderChange(event: any) {
    this.selectedOrder = event.target.value;
    this.filterProducts();
  }

  recargarComponente() {
    // const urlActual = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(["catalogo"]);
    });
  }

  checksDefault() {
    if (this.categoriaCheck) {
      if (this.categories.find(c => c === this.categoriaCheck)) {
        this.selectedCategories.push(this.categoriaCheck);
        this.filterProducts();
        console.log("entro al true");
      } else {
        console.log("no jalo pa");
      }
    }
  }
}
