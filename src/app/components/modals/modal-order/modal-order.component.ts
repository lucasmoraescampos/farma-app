import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Subject } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-modal-order',
  templateUrl: './modal-order.component.html',
  styleUrls: ['./modal-order.component.scss'],
})
export class ModalOrderComponent implements OnInit {

  @Input() order: any;

  public comissao: number = 0;

  constructor(
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {

    this.order.items.forEach((item: any) => {
      this.comissao += item.comissao * item.qtde;
    });

  }

  public dismiss() {
    this.modalCtrl.dismiss();
  }

  public print() {
    window.print();
  }

}
