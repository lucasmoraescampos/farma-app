import { Component, OnDestroy, OnInit } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { SQLiteObject } from '@ionic-native/sqlite/ngx';
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
    { title: 'Promoção', url: '/promotion', icon: 'ticket-outline' },
    { title: 'Agenda', url: '/schedule', icon: 'calendar-outline' },
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
      this.databaseSync();
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

  public databaseSync() {
    this.sqliteSrv.getDB()
      .then(db => {
        this.syncProducts(db);
        this.syncCustomers(db);
      });
  }

  private syncCustomers(db: SQLiteObject) {

    this.apiSrv.getCustomers()
      .toPromise()
      .then(res => {

        const customers = res.data;

        customers.forEach(async (customer: any) => {

          const result = await db.executeSql('SELECT * FROM cliente WHERE id_cliente = ?', [customer.id_cliente]);

          if (result.rows.length == 0) {

            const sql = `INSERT INTO cliente (id_cliente, razao_social, fantasia, email, cep, end, bairro, cidade, tel, cnpj, ie, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, datetime('now'))`;

            const data = [customer.id_cliente, customer.razao_social, customer.fantasia, customer.email, customer.cep, customer.end, customer.bairro, customer.cidade, customer.tel, customer.cnpj, customer.ie];

            db.executeSql(sql, data);

          }

          else {

            if (result.rows.item(0).updated_at < customer.updated_at) {

              const sql = `UPDATE cliente SET id_cliente = ?, razao_social = ?, fantasia = ?, email = ?, cep = ?, end = ?, bairro = ?, cidade = ?, tel = ?, cnpj = ?, ie = ?, updated_at = datetime('now') WHERE id_cliente = '${customer.id_cliente}'`;

              const data = [customer.id_cliente, customer.razao_social, customer.fantasia, customer.email, customer.cep, customer.end, customer.bairro, customer.cidade, customer.tel, customer.cnpj, customer.ie];

              db.executeSql(sql, data);

            }

          }

        });

      });

  }

  private syncProducts(db: SQLiteObject) {

    this.apiSrv.getProducts()
      .toPromise()
      .then(res => {

        const products = res.data;

        products.forEach(async (product: any) => {

          const result = await db.executeSql('SELECT * FROM produto WHERE id_produto = ?', [product.id_produto]);

          if (result.rows.length == 0) {

            const sql = `INSERT INTO produto (id_produto, id_lab, nome, upc, ipi, estoque, status, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, datetime('now'))`;

            const data = [product.id_produto, product.id_lab, product.nome, product.upc, product.ipi, product.estoque, product.status];

            db.executeSql(sql, data);

          }

          else {

            if (result.rows.item(0).updated_at < product.updated_at) {

              const sql = `UPDATE cliente SET id_produto = ?, id_lab = ?, nome = ?, upc = ?, ipi = ?, estoque = ?, status = ?, updated_at = datetime('now') WHERE id_produto = '${product.id_produto}'`;

              const data = [product.id_produto, product.id_lab, product.nome, product.upc, product.ipi, product.estoque, product.status];

              db.executeSql(sql, data);

            }

          }

        });

      });

  }

}
