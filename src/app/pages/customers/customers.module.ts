import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CustomersPageRoutingModule } from './customers-routing.module';
import { CustomersPage } from './customers.page';
import { LoaderModule } from 'src/app/components/common/loader/loader.module';
import { FilterModule } from 'src/app/pipes/filter/filter.module';
import { ModalInvoiceModule } from 'src/app/components/modals/modal-invoice/modal-invoice.module';
import { ModalCustomerOrderModule } from 'src/app/components/modals/modal-customer-order/modal-customer-order.module';
import { ModalCustomerModule } from 'src/app/components/modals/modal-customer/modal-customer.module';
import { CustomScrollModule } from 'src/app/directives/custom-scroll/custom-scroll.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CustomersPageRoutingModule,
    LoaderModule,
    FilterModule,
    ModalCustomerOrderModule,
    ModalInvoiceModule,
    ModalCustomerModule,
    CustomScrollModule
  ],
  declarations: [CustomersPage]
})
export class CustomersPageModule {}
