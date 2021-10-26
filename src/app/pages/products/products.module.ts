import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ProductsPageRoutingModule } from './products-routing.module';
import { ProductsPage } from './products.page';
import { LoaderModule } from 'src/app/components/common/loader/loader.module';
import { MoneyModule } from 'src/app/pipes/money/money.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProductsPageRoutingModule,
    LoaderModule,
    MoneyModule
  ],
  declarations: [ProductsPage]
})
export class ProductsPageModule {}
