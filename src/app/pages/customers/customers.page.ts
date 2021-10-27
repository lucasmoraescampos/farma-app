import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActionSheetController, IonSlides, ModalController } from '@ionic/angular';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ModalCustomerOrderComponent } from 'src/app/components/modals/modal-customer-order/modal-customer-order.component';
import { ModalCustomerComponent } from 'src/app/components/modals/modal-customer/modal-customer.component';
import { ModalInvoiceComponent } from 'src/app/components/modals/modal-invoice/modal-invoice.component';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.page.html',
  styleUrls: ['./customers.page.scss'],
})
export class CustomersPage implements OnInit, OnDestroy {

  @ViewChild(IonSlides) slides: IonSlides;

  public customerSearch: string;

  public expiredSearch: string;

  public segment: number = 0;

  public customers: any[];

  public expired: any[];

  private unsubscribe = new Subject();

  constructor(
    private apiSrv: ApiService,
    private modalCtrl: ModalController,
    private actionSheetCtrl: ActionSheetController
  ) { }

  ngOnInit() {
    this.initCustomers();
    this.initExpired();
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  public segmentChanged() {
    this.slides.slideTo(this.segment);
  }

  public slideChanged(ev: any) {
    this.segment = ev.target.swiper.activeIndex;
  }

  public async choose(customer: any) {

    const actionSheet = await this.actionSheetCtrl.create({
      header: customer.razao_social,
      buttons: [
        {
          text: 'Detalhes',
          handler: () => {
            this.selectCustomer(customer)
          }
        },
        {
          text: 'Fatura',
          handler: async () => {

            const modal = await this.modalCtrl.create({
              component: ModalInvoiceComponent,
              componentProps: {
                customer: customer
              }
            });
        
            return await modal.present();
            
          }
        }
      ]
    });

    return await actionSheet.present();

  }

  public async selectCustomer(customer: any) {

    const modal = await this.modalCtrl.create({
      component: ModalCustomerOrderComponent,
      componentProps: {
        customer: customer
      }
    });

    return await modal.present();

  }

  public async newCustomer() {

    const modal = await this.modalCtrl.create({
      component: ModalCustomerComponent
    });

    modal.onDidDismiss()
      .then(res => {
        if (res.data) {
          this.customers.unshift(res.data);
        }
      });

    return await modal.present();

  }

  private initCustomers() {
    this.apiSrv.getCustomers()
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(res => this.customers = res.data);
  }

  private initExpired() {
    this.apiSrv.getExpiredCustomers()
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(res => this.expired = res.data);
  }

}
