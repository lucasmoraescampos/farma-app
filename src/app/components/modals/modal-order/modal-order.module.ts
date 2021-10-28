import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalOrderComponent } from './modal-order.component';
import { IonicModule } from '@ionic/angular';
import { MoneyModule } from 'src/app/pipes/money/money.module';

@NgModule({
  declarations: [ModalOrderComponent],
  imports: [
    CommonModule,
    IonicModule,
    MoneyModule
  ]
})
export class ModalOrderModule { }
