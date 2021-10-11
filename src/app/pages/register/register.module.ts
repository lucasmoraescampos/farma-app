import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RegisterPageRoutingModule } from './register-routing.module';
import { RegisterPage } from './register.page';
import { ModalsModule } from 'src/app/components/modals/modals.module';
import { NgxLoadingModule } from 'ngx-loading';
import { BrMaskerModule } from 'br-mask';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegisterPageRoutingModule,
    ReactiveFormsModule,
    ModalsModule,
    NgxLoadingModule,
    BrMaskerModule
  ],
  declarations: [RegisterPage]
})
export class RegisterPageModule {}
