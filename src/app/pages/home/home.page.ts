import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { IonSlides, ModalController } from '@ionic/angular';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ApiService } from 'src/app/services/api.service';
import { ConnectionStatus, Network } from '@capacitor/network';
import { SQLiteService } from 'src/app/services/sqlite.service';
import { Capacitor } from '@capacitor/core';
import { ModalCustomerOrderComponent } from 'src/app/components/modals/modal-customer-order/modal-customer-order.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {

  @ViewChild(IonSlides) slides: IonSlides;

  public noloader: boolean;

  public dashboard: any;

  public customers: any[];

  public networkStatus: ConnectionStatus;

  private unsubscribe = new Subject();

  constructor(
    private modalCtrl: ModalController,
    private apiSrv: ApiService,
    private sqliteSrv: SQLiteService
  ) { }

  ngOnInit() {

    this.initDashboard();

    Network.addListener('networkStatusChange', status => this.networkStatus = status);

  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  public searchChanged(ev: any) {

    const search = ev.detail.value;

    if (this.networkStatus.connected) {

      if (search.length < 3) {
        this.customers = [];
        return;
      }

      this.noloader = true;

      this.apiSrv.searchCustomers({ search: search })
        .pipe(takeUntil(this.unsubscribe))
        .subscribe(
          res => {
            this.noloader = false;
            this.customers = res.data;
          },
          err => this.noloader = false
        );

    }

    else if (Capacitor.isNativePlatform()) {

      this.sqliteSrv.getDB()
        .then(db => {

          db.executeSql(`SELECT * FROM cliente WHERE razao_social = '${search}' OR cnpj = '${search} ORDER BY razao_social ASC'`)
            .then((res) => {
              this.customers = [];
              for (let i=0; i < res.rows?.length; i++) {
                this.customers.push(res.rows.item(i));
                console.log(res.rows.item(i))
              }
            });

        });

    }

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

  private async initDashboard() {

    const db = await this.sqliteSrv.getDB();

    this.networkStatus = await Network.getStatus();

    if (this.networkStatus.connected) {

      this.apiSrv.dashboard()
        .pipe(takeUntil(this.unsubscribe))
        .subscribe(res => {

          this.dashboard = res.data;

          if (Capacitor.isNativePlatform()) {

            const statement = `
              UPDATE dashboard
                SET billed = ?, 
                  goal = ?,
                  total_customers = ?,
                  total_positive_customers = ?
              WHERE id = 1
            `;

            const params = [
              this.dashboard.billed,
              this.dashboard.goal,
              this.dashboard.total_customers,
              this.dashboard.total_positive_customers
            ];

            db.executeSql(statement, params);

          }

        });

    }

    else if (Capacitor.isNativePlatform()) {

      this.sqliteSrv.getDB()
        .then(db => {

          db.executeSql(`SELECT * FROM dashboard WHERE id = ?`, [1])
            .then((res) => {
              this.dashboard = res.rows.item(0);
            });

        });

    }

  }

}