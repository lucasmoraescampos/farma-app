import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HomePageRoutingModule } from './home-routing.module';
import { HomePage } from './home.page';
import { BrMaskerModule } from 'br-mask';
import { NgxLoadingModule } from 'ngx-loading';
import { MoneyModule } from 'src/app/pipes/money/money.module';
import { ModalCustomerModule } from 'src/app/components/modals/modal-customer/modal-customer.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    BrMaskerModule,
    NgxLoadingModule,
    MoneyModule,
    ReactiveFormsModule,
    ModalCustomerModule
  ],
  declarations: [HomePage]
})
export class HomePageModule {}
