import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ModalInvoiceComponent } from './modal-invoice.component';
import { MoneyModule } from 'src/app/pipes/money/money.module';

@NgModule({
  declarations: [ModalInvoiceComponent],
  imports: [
    CommonModule,
    IonicModule,
    MoneyModule
  ]
})
export class ModalInvoiceModule { }
