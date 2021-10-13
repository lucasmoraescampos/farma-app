import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonSlides, ModalController } from '@ionic/angular';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ModalCustomerComponent } from 'src/app/components/modals/modal-customer/modal-customer.component';
import { ModalTicketsComponent } from 'src/app/components/modals/modal-tickets/modal-tickets.component';
import { AlertService } from 'src/app/services/alert.service';
import { ApiService } from 'src/app/services/api.service';
import { environment } from 'src/environments/environment';

declare const MercadoPago: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {

  @ViewChild(IonSlides) slides: IonSlides;

  public loading: boolean;

  public customers: any[] = [
    {
      corporate_name: 'A&F DISTRIBUIDORA DE MATER. HOSPIT. LTDA',
      fanatasy_name:  'NUTRAPHARMA',
      email:          'nutrapharma1@gmail.com',
      cep:            '94950-180',
      address:        'RUA ITABERABA',
      district:       'VILA BOM PRINCIPIO',
      city:           'CACHOEIRINHA',
      phone:          '(0051) 99744-8501',
      cnpj:           '24.603.632/0001-08',
      ie:             '1770214639',
      salesman:       'FREDERICO GARCIA'
    },
    {
      corporate_name: 'DISTRIBUIDORA JS FERREIRA LTDA - ME',
      fanatasy_name:  'SAUDE PETROPOLIS',
      email:          'faturamento@saudepetropolis.com.br',
      cep:            '25710-082',
      address:        'RUA BERNARDO PROENÇA',
      district:       'ITAMARATI',
      city:           'PETRÓPOLIS',
      phone:          '(0024) 2280-2174',
      cnpj:           '11.178.615/0001-29',
      ie:             '78878398',
      salesman:       'FREDERICO GARCIA'
    }
  ];

  private unsubscribe = new Subject();

  constructor(
    private modalCtrl: ModalController
  ) { }

  ngOnInit() { }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  public async selectCustomer(customer: any) {

    const modal = await this.modalCtrl.create({
      component: ModalCustomerComponent,
      componentProps: {
        customer: customer
      }
    });

    return await modal.present();

  }

}
