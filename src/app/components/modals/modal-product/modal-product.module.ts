import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalProductComponent } from './modal-product.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [ModalProductComponent],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule
  ]
})
export class ModalProductModule { }
