import { Component, OnDestroy, OnInit } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { Network } from '@capacitor/network';
import { NavController } from '@ionic/angular';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AlertService } from 'src/app/services/alert.service';
import { ApiService } from 'src/app/services/api.service';
import { SQLiteService } from 'src/app/services/sqlite.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.page.html',
  styleUrls: ['./layout.page.scss'],
})
export class LayoutPage implements OnInit, OnDestroy {

  public appPages = [
    { title: 'Início', url: '/home', icon: 'home-outline' },
    { title: 'Clientes', url: '/customers', icon: 'people-outline' },
    { title: 'Produtos', url: '/products', icon: 'cube-outline' },
    // { title: 'Promoção', url: '/promotion', icon: 'ticket-outline' },
    // { title: 'Agenda', url: '/schedule', icon: 'calendar-outline' },
    { title: 'Pedidos', url: '/orders', icon: 'receipt-outline' }
  ];

  public user: any;

  private unsubscribe = new Subject();

  constructor(
    private apiSrv: ApiService,
    private navCtrl: NavController,
    private alertSrv: AlertService,
    private sqliteSrv: SQLiteService
  ) { }

  ngOnInit() {

    this.user = JSON.parse(localStorage.getItem('current_user'));

    if (Capacitor.isNativePlatform()) {

      Network.getStatus()
        .then(status => {

          if (status.connected) {

            this.syncDashboard();

            this.syncPositiveCustomers();

            this.syncCustomers();

            this.syncExpiredCustomers();

            this.syncLabs();

            this.syncProducts();

            this.syncOrders();

            this.syncTablesProducts();

            this.syncPaymentOptions();

          }

        });

      Network.addListener('networkStatusChange', status => {

        if (status.connected) {
        
          this.syncCustomers();

        }
        
      });

    }

  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  public logout() {
    this.alertSrv.show({
      icon: 'warning',
      message: 'Tem certeza que deseja sair?',
      onConfirm: () => {
        this.apiSrv.logout()
          .pipe(takeUntil(this.unsubscribe))
          .subscribe(res => {
            if (res.success) {
              this.navCtrl.navigateRoot('/login');
            }
          });
      }
    });
  }

  private syncDashboard() {
    this.apiSrv.dashboard()
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(res => {
        this.sqliteSrv.setCustomers(res.data);
      });
  }

  private syncOrders() {
    this.apiSrv.getOrders()
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(res => {
        this.sqliteSrv.setOrders(res.data);
      });
  }

  private syncLabs() {
    this.apiSrv.getLabs()
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(res => {
        this.sqliteSrv.setLabs(res.data);
      });
  }

  private syncProducts() {
    this.apiSrv.getProducts()
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(res => {
        this.sqliteSrv.setProducts(res.data);
      });
  }

  private syncCustomers() {

    this.sqliteSrv.getUnsyncCustomers()
      .then(customers => {

        if (customers.length > 0) {

          this.apiSrv.syncCustomer({ clientes: customers })
            .pipe(takeUntil(this.unsubscribe))
            .subscribe(res => {

              this.apiSrv.getCustomers()
                .pipe(takeUntil(this.unsubscribe))
                .subscribe(res => {

                  this.sqliteSrv.setCustomers(res.data);

                });
                
            });

        }

        else {

          this.apiSrv.getCustomers()
            .pipe(takeUntil(this.unsubscribe))
            .subscribe(res => {

              this.sqliteSrv.setCustomers(res.data);

            });

        }

      });
      
  }

  private syncExpiredCustomers() {
    this.apiSrv.getExpiredCustomers()
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(res => {
        this.sqliteSrv.setExpiredCustomers(res.data);
      });
  }

  private syncPaymentOptions() {
    this.apiSrv.getPaymentOptions()
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(res => {
        this.sqliteSrv.setPaymentOptions(res.data);
      });
  }

  private syncTablesProducts() {
    this.apiSrv.getProductTables()
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(res => {
        this.sqliteSrv.setTablesProducts(res.data);
      });
  }

  private syncPositiveCustomers() {
    this.apiSrv.getPositiveCustomers()
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(res => {
        this.sqliteSrv.setPositiveCustomers(res.data);
      });
  }

}
