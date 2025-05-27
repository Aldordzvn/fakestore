import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  imports: [],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent {
  websiteImg = 'img/staticws.svg';
  toggle: boolean = true;
  toggleStates: { [key: string]: boolean } = {
    card1: false,
    card2: false,
    card3: false
  }

  toggleAccordion(card: string) {
    if (this.toggleStates.hasOwnProperty(card)) {
      this.toggleStates[card] = !this.toggleStates[card];
    }
  }
}
