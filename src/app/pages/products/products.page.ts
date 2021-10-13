import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides } from '@ionic/angular';

@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
})
export class ProductsPage implements OnInit {

  @ViewChild(IonSlides) slide: IonSlides;

  constructor() { }

  ngOnInit() {
  }

  public changeLine() {
    this.slide.slidePrev();
  }

  public selectLine() {
    this.slide.slideNext();
  }

}
