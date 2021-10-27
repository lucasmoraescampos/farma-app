import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HomePageRoutingModule } from './home-routing.module';
import { HomePage } from './home.page';
import { BrMaskerModule } from 'br-mask';
import { MoneyModule } from 'src/app/pipes/money/money.module';
import { LoaderModule } from 'src/app/components/common/loader/loader.module';
import { ModalCustomerOrderModule } from 'src/app/components/modals/modal-customer-order/modal-customer-order.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    BrMaskerModule,
    MoneyModule,
    ReactiveFormsModule,
    ModalCustomerOrderModule,
    LoaderModule,
    MoneyModule
  ],
  declarations: [HomePage]
})
export class HomePageModule {}
