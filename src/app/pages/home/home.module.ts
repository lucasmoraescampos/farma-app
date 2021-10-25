import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HomePageRoutingModule } from './home-routing.module';
import { HomePage } from './home.page';
import { BrMaskerModule } from 'br-mask';
import { MoneyModule } from 'src/app/pipes/money/money.module';
import { ModalCustomerModule } from 'src/app/components/modals/modal-customer/modal-customer.module';
import { LoaderModule } from 'src/app/components/common/loader/loader.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    BrMaskerModule,
    MoneyModule,
    ReactiveFormsModule,
    ModalCustomerModule,
    LoaderModule,
    MoneyModule
  ],
  declarations: [HomePage]
})
export class HomePageModule {}
