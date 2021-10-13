import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalCustomerComponent } from './modal-customer.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { ModalProductModule } from '../modal-product/modal-product.module';

@NgModule({
  declarations: [ModalCustomerComponent],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ModalProductModule
  ]
})
export class ModalCustomerModule { }
