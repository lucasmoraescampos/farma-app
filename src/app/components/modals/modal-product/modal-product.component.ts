import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { ModalController } from '@ionic/angular';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ArrayHelper } from 'src/app/helpers/array.helper';
import { AlertService } from 'src/app/services/alert.service';
import { ApiService } from 'src/app/services/api.service';
import { CartService } from 'src/app/services/cart.service';
import { SQLiteService } from 'src/app/services/sqlite.service';

@Component({
  selector: 'app-modal-product',
  templateUrl: './modal-product.component.html',
  styleUrls: ['./modal-product.component.scss'],
})
export class ModalProductComponent implements OnInit, OnDestroy {

  @Input() table_id: any;

  @Input() labs: any;

  @Input() lab_id: number;

  @Input() product_id: number;

  @Input() discount: number = 0;

  @Input() buttonText: string = 'Adicionar';

  public segment: 'CX' | 'UN' = 'CX';

  public products: any[];

  public qty: number = 1;

  public total: number;

  public prices: any;

  private unsubscribe = new Subject();

  constructor(
    private modalCtrl: ModalController,
    private apiSrv: ApiService,
    private cartSrv: CartService,
    private alertSrv: AlertService,
    private sqliteSrv: SQLiteService
  ) { }

  ngOnInit() {

    if (this.lab_id) {
      this.labChanged();
    }

    if (this.product_id) {
      this.productChanged();
    }
    
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  public dismiss() {
    this.modalCtrl.dismiss();
  }

  public labChanged() {

    this.total = 0;

    this.qty = 1;

    if (Capacitor.isNativePlatform()) {

      this.sqliteSrv.getProducts(this.lab_id)
        .then(products => this.products = products);

    }

    else {

      this.apiSrv.getProducts({ id_lab: this.lab_id })
        .pipe(takeUntil(this.unsubscribe))
        .subscribe(res => this.products = res.data);

    }

  }

  public productChanged() {

    if (Capacitor.isNativePlatform()) {

      this.sqliteSrv.getTableProduct(this.table_id, this.product_id)
        .then(prices => {
          this.prices = prices;
          this.total = this.prices.valor - ((this.prices.valor * this.discount) / 100);
          this.qty = 1;
        });

    }

    else {

      this.apiSrv.getProductPrices({ id_produto: this.product_id, id_tabela: this.table_id })
        .pipe(takeUntil(this.unsubscribe))
        .subscribe(res => {
          this.prices = res.data
          this.total = this.prices.valor - ((this.prices.valor * this.discount) / 100);
          this.qty = 1;
        });

    }

  }

  public discountChanged() {
    this.total = this.prices.valor * this.qty;
    this.total -= (this.total * this.discount) / 100;
  }

  public changeQty(ev: any) {

    this.qty = ev.qty;

    this.total = this.prices.valor * this.qty;

    this.total -= (this.total * this.discount) / 100;

  }

  public save() {

    if (this.segment == 'UN' && this.qty % this.prices.upc > 0) {

      this.alertSrv.toast({
        color: 'danger',
        message: `A quantidade por unidade deve ser múltipla de ${this.prices.upc}`
      });

      return;

    }

    const index = ArrayHelper.getIndexByKey(this.products, 'id_produto', this.product_id);

    this.cartSrv.addProduct({
      id_produto: this.products[index].id_produto,
      id_lab:     this.lab_id,
      nome:       this.products[index].nome,
      qtde:       this.qty,
      tipo:       this.segment,
      upc:        this.prices.upc,
      valor:      this.prices.valor,
      ipi:        this.products[index].ipi,
      desconto:   this.discount,
      total:      this.total,
      cod:        this.products[index].cod,
      comissao:   0
    });

    this.modalCtrl.dismiss();

  }

}
