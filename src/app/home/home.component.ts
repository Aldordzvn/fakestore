import { Component } from '@angular/core';
import { ApiServiceService } from '../api-service.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  acerImg = 'img/acer1.svg';
  bpImg = 'img/bp.svg';
  ringImg = 'img/ring.svg';
  shirtImg = 'img/shirt.svg';
  monitorImg = 'img/curveMonitor.svg';
  menC = 'img/menC.svg';
  jewelry = 'img/jewelry.svg';
  electronic = 'img/electronics.svg';
  women = 'img/women.svg';
  items: any[] = [];
  bestRated: any[] = [];

  ngOnInit(){
    this.traerDatos();
  }

  constructor( private apiService:ApiServiceService){}

  traerDatos(){
    this.apiService.getProducts().subscribe((item)=>{
      this.items = item;
      this.mejorValorados();
    });
  }

  mejorValorados(){
    for(let item of this.items){
      if(item.rating.rate >= 4){
        this.bestRated.push(item);
      }
    }
  }

}
