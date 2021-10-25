import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuantityComponent } from './quantity.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [QuantityComponent],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule
  ],
  exports: [QuantityComponent]
})
export class QuantityModule { }
