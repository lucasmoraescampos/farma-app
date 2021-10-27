import { Component, OnDestroy, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ModalOrderComponent } from 'src/app/components/modals/modal-order/modal-order.component';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.page.html',
  styleUrls: ['./orders.page.scss'],
})
export class OrdersPage implements OnInit, OnDestroy {

  public orders: any[];

  private unsubscribe = new Subject();

  constructor(
    private apiSrv: ApiService,
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {
    this.initOrders();
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  public async detail(order: any) {

    const modal = await this.modalCtrl.create({
      component: ModalOrderComponent,
      componentProps: {
        order: order
      }
    });

    return await modal.present();

  }

  private initOrders() {
    this.apiSrv.getOrders()
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(res => this.orders = res.data);
  }

}
