import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalCustomerComponent } from './modal-customer.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalProductModule } from '../modal-product/modal-product.module';
import { LoaderModule } from '../../common/loader/loader.module';
import { MoneyModule } from 'src/app/pipes/money/money.module';

@NgModule({
  declarations: [ModalCustomerComponent],
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
export class ModalCustomerModule { }
