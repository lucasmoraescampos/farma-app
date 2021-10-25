import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonSlides, ModalController } from '@ionic/angular';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Product } from 'src/app/models/product';
import { AlertService } from 'src/app/services/alert.service';
import { ApiService } from 'src/app/services/api.service';
import { CartService } from 'src/app/services/cart.service';
import { ModalProductComponent } from '../modal-product/modal-product.component';

@Component({
  selector: 'app-modal-customer',
  templateUrl: './modal-customer.component.html',
  styleUrls: ['./modal-customer.component.scss'],
})
export class ModalCustomerComponent implements OnInit, OnDestroy {

  @ViewChild(IonSlides) slides: IonSlides;

  @Input() customer: any;

  public user: any;

  public segment: number = 0;

  public paymentOptions: any;

  public cart: any;

  public formGroup: FormGroup;

  private unsubscribe = new Subject();

  constructor(
    private modalCtrl: ModalController,
    private apiSrv: ApiService,
    private formBuilder: FormBuilder,
    private cartSrv: CartService,
    private alertSrv: AlertService
  ) { }

  ngOnInit() {

    this.user = this.apiSrv.getCurrentUser();

    this.formGroup = this.formBuilder.group({
      id_cliente:     [this.customer.id_cliente],
      id_prazo:       ['', Validators.required],
      id_tabela:      ['', Validators.required],
      freight:        ['', Validators.required],
      scheduling:     ['', Validators.required],
      palletizing:    ['', Validators.required],
      comment:        [''],
      promotion:      [''],
      authorization:  [''],
      authorized_at:  [''],
      purchase_order: ['']
    });

    this.cartSrv.clear();

    this.cartSrv.currentUser.pipe(takeUntil(this.unsubscribe))
      .subscribe(cart => this.cart = cart);

    this.initPaymentOptions();

  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  ionViewDidEnter() {
    this.slides.update();
  }

  public get formControl() {
    return this.formGroup.controls;
  }

  public dismiss() {
    this.modalCtrl.dismiss();
  }

  public segmentChanged() {
    this.slides.slideTo(this.segment);
  }

  public slideChanged(ev: any) {
    this.segment = ev.target.swiper.activeIndex;
  }

  public tableChanged(ev: any) {
    this.cartSrv.setIdTabela(ev.detail.value);
  }

  public async addProduct() {

    const modal = await this.modalCtrl.create({
      component: ModalProductComponent,
      cssClass: 'modal-product',
      componentProps: {
        table_id: this.formControl.id_tabela.value,
        labs: this.paymentOptions.labs
      }
    });

    return await modal.present();

  }

  public async changeProduct(product: any) {

    const modal = await this.modalCtrl.create({
      component: ModalProductComponent,
      cssClass: 'modal-product',
      componentProps: {
        product_id: product.id,
        lab_id: product.lab_id,
        table_id: this.formControl.id_tabela.value,
        labs: this.paymentOptions.labs,
        discount: product.discount,
        buttonText: 'Atualizar'
      }
    });

    return await modal.present();
    
  }

  public deleteProduct(product: any) {

    this.alertSrv.show({
      icon: 'warning',
      title: product.name,
      message: 'Tem certeza que deseja excluir?',
      confirmButtonText: 'Excluir',
      onConfirm: () => {
        this.cartSrv.deleteProduct(product.id);
      }
    });

  }

  public save() {

    if (this.cart?.products?.length == 0) {

      this.alertSrv.toast({
        icon: 'error',
        message: 'Adicione produtos ao pedido!'
      });

      return;

    }

    if (this.formGroup.valid) {

      const data: any = this.formGroup.value;

      data.products = [];

      this.cart.products.forEach((product: Product) => {
        data.products.push({
          id: product.id,
          qty: product.packaging_type == 'UN' ? product.qty / product.upc : product.qty,
          discount: product.discount
        });
      });

      this.apiSrv.order(data)
        .pipe(takeUntil(this.unsubscribe))
        .subscribe(res => {

          this.alertSrv.toast({
            icon: 'success',
            message: res.message
          });

          this.modalCtrl.dismiss();

        });

    }

  }

  private initPaymentOptions() {
    this.apiSrv.getPaymentOptions()
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(res => {
        this.paymentOptions = res.data;
      });
  }

}
