import { Component, OnDestroy, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ModalCustomerOrderComponent } from 'src/app/components/modals/modal-customer-order/modal-customer-order.component';
import { ModalOrderComponent } from 'src/app/components/modals/modal-order/modal-order.component';
import { HttpResult } from 'src/app/models/http-result';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.page.html',
  styleUrls: ['./orders.page.scss'],
})
export class OrdersPage implements OnInit, OnDestroy {

  public orders: any[] = [];

  public page: number = 1;

  public total: number;

  public noloader: boolean;

  public search: string;

  public searchItems: any[];

  public isSearch: boolean;

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

  public sum(a: string, b: string) {
    return Number(a) + Number(b);
  }

  public cancelSearch() {
    this.isSearch = false;
    this.search = '';
    this.searchItems = null;
  }

  public searchChanged() {

    if (this.search.length < 3) return;

    this.apiSrv.getOrders({ search: this.search })
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(res => this.searchItems = res.data);
      
  }

  public detail(id: number) {

    this.apiSrv.getOrderById(id)
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(async (res) => {

        const modal = await this.modalCtrl.create({
          component: ModalOrderComponent,
          componentProps: {
            order: res.data
          }
        });

        return await modal.present();

      });

  }

  public async newOrder() {

    const modal = await this.modalCtrl.create({
      component: ModalCustomerOrderComponent
    });

    return await modal.present();

  }

  public loadOrders(event: any) {
    
    this.page++;

    this.noloader = true;

    this.apiSrv.getOrders({ page: this.page })
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(res => {

        this.noloader = false;

        this.orders = this.orders.concat(res.data.orders);

        this.total = res.data.total;

        event.target.complete();

        if (this.orders.length == this.total) {
          event.target.disabled = true;
        }

      });

  }

  private initOrders() {
    this.apiSrv.getOrders({ page: this.page })
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(res => {
        this.orders = this.orders.concat(res.data.orders);
        this.total = res.data.total;
      });
  }

}
