import { Component, OnDestroy, OnInit } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { Network } from '@capacitor/network';
import { ActionSheetController, ModalController } from '@ionic/angular';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ModalCustomerOrderComponent } from 'src/app/components/modals/modal-customer-order/modal-customer-order.component';
import { ModalCustomerComponent } from 'src/app/components/modals/modal-customer/modal-customer.component';
import { ModalInvoiceComponent } from 'src/app/components/modals/modal-invoice/modal-invoice.component';
import { ApiService } from 'src/app/services/api.service';
import { SQLiteService } from 'src/app/services/sqlite.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.page.html',
  styleUrls: ['./customers.page.scss'],
})
export class CustomersPage implements OnInit, OnDestroy {

  public customerSearch: string;

  public expiredSearch: string;

  public customers: any[] = [];

  public expired: any[];

  public page: number = 1;

  public total: number;

  public noloader: boolean;

  public segment: number = 0;

  public isSearch: boolean;

  public searchItems: any[];

  private unsubscribe = new Subject();

  constructor(
    private apiSrv: ApiService,
    private modalCtrl: ModalController,
    private actionSheetCtrl: ActionSheetController,
    private sqliteSrv: SQLiteService
  ) { }

  ngOnInit() {
    this.initCustomers();
    this.initExpired();
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  public cancelSearch() {
    this.isSearch = false;
    this.customerSearch = '';
    this.searchItems = null;
  }

  public searchChanged() {

    if (this.customerSearch.length < 3) {

      this.searchItems = null;

      return;

    }

    Network.getStatus()
      .then(status => {

        if (status.connected) {

          this.apiSrv.getCustomers({ search: this.customerSearch })
            .pipe(takeUntil(this.unsubscribe))
            .subscribe(res => {
              this.searchItems = res.data;
            });

        }

        else if (Capacitor.isNativePlatform()) {

          this.sqliteSrv.searchCustomers(this.customerSearch)
            .then(customers => this.searchItems = customers);

        }

      });
      
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

  public loadCustomers(event: any) {

    this.page++;

    Network.getStatus()
      .then(status => {

        if (status.connected) {

          this.noloader = true;

          this.apiSrv.getCustomers({ page: this.page })
            .pipe(takeUntil(this.unsubscribe))
            .subscribe(res => {

              this.noloader = false;

              this.customers = this.customers.concat(res.data.customers);

              this.total = res.data.total;

              event.target.complete();

              if (this.customers.length == this.total) {
                event.target.disabled = true;
              }

            });

        }

        else if (Capacitor.isNativePlatform()) {

          this.sqliteSrv.getCustomers(this.page)
            .then(res => {
              
              this.customers = this.customers.concat(res.customers);

              this.total = res.total;

              event.target.complete();

              if (this.customers.length == this.total) {
                event.target.disabled = true;
              }

            });

        }

      });

  }

  private initCustomers() {

    Network.getStatus()
      .then(status => {

        if (status.connected) {

          this.apiSrv.getCustomers({ page: this.page })
            .pipe(takeUntil(this.unsubscribe))
            .subscribe(res => {
              this.customers = this.customers.concat(res.data.customers);
              this.total = res.data.total;
            });

        }

        else if (Capacitor.isNativePlatform()) {

          this.sqliteSrv.getCustomers(this.page)
            .then(res => {
              this.customers = this.customers.concat(res.customers);
              this.total = res.total;
            });

        }

      });

  }

  private initExpired() {

    Network.getStatus()
      .then(status => {

        if (status.connected) {

          this.apiSrv.getExpiredCustomers()
            .pipe(takeUntil(this.unsubscribe))
            .subscribe(res => this.expired = res.data);

        }

        else if (Capacitor.isNativePlatform()) {

          this.sqliteSrv.getExpiredCustomers()
            .then(expired => this.expired = expired);

        }

      });

  }

}
