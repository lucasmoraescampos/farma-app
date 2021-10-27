import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { OrdersPageRoutingModule } from './orders-routing.module';
import { OrdersPage } from './orders.page';
import { LoaderModule } from 'src/app/components/common/loader/loader.module';
import { MoneyModule } from 'src/app/pipes/money/money.module';
import { ModalOrderModule } from 'src/app/components/modals/modal-order/modal-order.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OrdersPageRoutingModule,
    LoaderModule,
    MoneyModule,
    ModalOrderModule
  ],
  declarations: [OrdersPage]
})
export class OrdersPageModule {}
