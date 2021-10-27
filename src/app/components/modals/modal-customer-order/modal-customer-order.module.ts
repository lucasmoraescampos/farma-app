import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { MoneyModule } from 'src/app/pipes/money/money.module';
import { LoaderModule } from '../../common/loader/loader.module';
import { ModalProductModule } from '../modal-product/modal-product.module';
import { ModalCustomerOrderComponent } from './modal-customer-order.component';

@NgModule({
  declarations: [ModalCustomerOrderComponent],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
    ModalProductModule,
    LoaderModule,
    MoneyModule
  ]
})
export class ModalCustomerOrderModule { }
