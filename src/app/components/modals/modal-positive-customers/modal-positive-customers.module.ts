import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalPositiveCustomersComponent } from './modal-positive-customers.component';
import { IonicModule } from '@ionic/angular';
import { LoaderModule } from '../../common/loader/loader.module';

@NgModule({
  declarations: [ModalPositiveCustomersComponent],
  imports: [
    CommonModule,
    IonicModule,
    LoaderModule
  ]
})
export class ModalPositiveCustomersModule { }
