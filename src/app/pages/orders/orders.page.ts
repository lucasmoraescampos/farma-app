import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
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
    private apiSrv: ApiService
  ) { }

  ngOnInit() {
    this.initOrders();
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  private initOrders() {
    this.apiSrv.getOrders()
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(res => this.orders = res.data);
  }

}
