import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { IonSlides, ModalController } from '@ionic/angular';
import { ModalProductComponent } from '../modal-product/modal-product.component';

@Component({
  selector: 'app-modal-customer',
  templateUrl: './modal-customer.component.html',
  styleUrls: ['./modal-customer.component.scss'],
})
export class ModalCustomerComponent implements OnInit {

  @ViewChild(IonSlides) slide: IonSlides;

  @Input() customer: any;

  public segment: number = 0;

  constructor(
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {}

  public dismiss() {
    this.modalCtrl.dismiss();
  }

  public segmentChanged() {
    this.slide.slideTo(this.segment);
  }

  public slideChanged(ev: any) {
    this.segment = ev.target.swiper.activeIndex;
  }

  public async addProduct() {

    const modal = await this.modalCtrl.create({
      component: ModalProductComponent,
      cssClass: 'modal-product',
      componentProps: {
      }
    });

    return await modal.present();

  }

}
