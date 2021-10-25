import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalProductComponent } from './modal-product.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { QuantityModule } from '../../common/quantity/quantity.module';
import { MoneyModule } from 'src/app/pipes/money/money.module';
import { LoaderModule } from '../../common/loader/loader.module';
@NgModule({
  declarations: [ModalProductComponent],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    QuantityModule,
    MoneyModule,
    LoaderModule
  ]
})
export class ModalProductModule { }
