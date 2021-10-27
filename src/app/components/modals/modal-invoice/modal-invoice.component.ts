import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal-invoice',
  templateUrl: './modal-invoice.component.html',
  styleUrls: ['./modal-invoice.component.scss'],
})
export class ModalInvoiceComponent implements OnInit {

  @Input() customer: any;

  constructor(
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {
    this.customer.valor = this.customer.valor.replace(',', '.');
    this.customer.juros = this.customer.juros.replace(',', '.');
  }

  public dismiss() {
    this.modalCtrl.dismiss();
  }

}
