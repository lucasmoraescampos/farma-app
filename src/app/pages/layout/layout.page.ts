import { Component, OnDestroy, OnInit } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { Network } from '@capacitor/network';
import { NavController } from '@ionic/angular';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AlertService } from 'src/app/services/alert.service';
import { ApiService } from 'src/app/services/api.service';
import { SQLiteService } from 'src/app/services/sqlite.service';
import { SplashScreen } from '@capacitor/splash-screen';

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

  private syncCount: number = 0;

  private readonly syncSize: number = 9;

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

          this.syncOrders();

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
      header: 'Sair',
      message: 'Tem certeza que deseja sair?',
      onConfirm: () => {
        this.apiSrv.logout()
          .toPromise()
          .then(res => {
            localStorage.clear();
            this.navCtrl.navigateRoot('/login');
          }).catch(err => {
            localStorage.clear();
            this.navCtrl.navigateRoot('/login');
          });
      }
    });
  }

  private syncDashboard() {
    this.apiSrv.dashboard()
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(res => {
        this.syncCount++;
        this.sqliteSrv.setDashboard(res.data);
        if (this.syncCount == this.syncSize) {
          this.navCtrl.navigateRoot('/home');
          SplashScreen.hide();
        }
      });
  }

  private syncOrders() {

    this.sqliteSrv.getUnsyncOrders()
      .then(orders => {

        if (orders.length > 0) {

          this.apiSrv.syncOrder({ pedidos: orders })
            .pipe(takeUntil(this.unsubscribe))
            .subscribe(res => {

              this.apiSrv.getOrders()
                .pipe(takeUntil(this.unsubscribe))
                .subscribe(res => {

                  this.syncCount++;

                  this.sqliteSrv.setOrders(res.data);

                  if (this.syncCount == this.syncSize) {
                    this.navCtrl.navigateRoot('/home');
                    SplashScreen.hide();
                  }

                });
                
            });

        }

        else {

          this.apiSrv.getOrders()
            .pipe(takeUntil(this.unsubscribe))
            .subscribe(res => {

              this.syncCount++;

              this.sqliteSrv.setOrders(res.data);

              if (this.syncCount == this.syncSize) {
                this.navCtrl.navigateRoot('/home');
                SplashScreen.hide();
              }

            });

        }

      });
      
  }

  private syncLabs() {
    this.apiSrv.getLabs()
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(res => {
        this.syncCount++;
        this.sqliteSrv.setLabs(res.data);
        if (this.syncCount == this.syncSize) {
          this.navCtrl.navigateRoot('/home');
          SplashScreen.hide();
        }
      });
  }

  private syncProducts() {
    this.apiSrv.getProducts()
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(res => {
        this.syncCount++;
        this.sqliteSrv.setProducts(res.data);
        if (this.syncCount == this.syncSize) {
          this.navCtrl.navigateRoot('/home');
          SplashScreen.hide();
        }
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

                  this.syncCount++;

                  this.sqliteSrv.setCustomers(res.data);

                  if (this.syncCount == this.syncSize) {
                    this.navCtrl.navigateRoot('/home');
                    SplashScreen.hide();
                  }

                });
                
            });

        }

        else {

          this.apiSrv.getCustomers()
            .pipe(takeUntil(this.unsubscribe))
            .subscribe(res => {

              this.syncCount++;

              this.sqliteSrv.setCustomers(res.data);

              if (this.syncCount == this.syncSize) {
                this.navCtrl.navigateRoot('/home');
                SplashScreen.hide();
              }

            });

        }

      });
      
  }

  private syncExpiredCustomers() {
    this.apiSrv.getExpiredCustomers()
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(res => {
        this.syncCount++;
        this.sqliteSrv.setExpiredCustomers(res.data);
        if (this.syncCount == this.syncSize) {
          this.navCtrl.navigateRoot('/home');
          SplashScreen.hide();
        }
      });
  }

  private syncPaymentOptions() {
    this.apiSrv.getPaymentOptions()
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(res => {
        this.syncCount++;
        this.sqliteSrv.setPaymentOptions(res.data);
        if (this.syncCount == this.syncSize) {
          this.navCtrl.navigateRoot('/home');
          SplashScreen.hide();
        }
      });
  }

  private syncTablesProducts() {
    this.apiSrv.getProductTables()
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(res => {
        this.syncCount++;
        this.sqliteSrv.setTablesProducts(res.data);
        if (this.syncCount == this.syncSize) {
          this.navCtrl.navigateRoot('/home');
          SplashScreen.hide();
        }
      });
  }

  private syncPositiveCustomers() {
    this.apiSrv.getPositiveCustomers()
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(res => {
        this.syncCount++;
        this.sqliteSrv.setPositiveCustomers(res.data);
        if (this.syncCount == this.syncSize) {
          this.navCtrl.navigateRoot('/home');
          SplashScreen.hide();
        }
      });
  }

}
