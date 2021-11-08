import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { LayoutPageRoutingModule } from './layout-routing.module';
import { LayoutPage } from './layout.page';
import { LoaderModule } from 'src/app/components/common/loader/loader.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LayoutPageRoutingModule,
    LoaderModule
  ],
  declarations: [LayoutPage]
})
export class LayoutPageModule {}
