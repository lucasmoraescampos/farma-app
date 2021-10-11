import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalTicketsComponent } from './modal-tickets/modal-tickets.component';
import { IonicModule } from '@ionic/angular';
import { MoneyModule } from 'src/app/pipes/money/money.module';

@NgModule({
  declarations: [
    ModalTicketsComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    MoneyModule
  ]
})
export class ModalsModule { }
