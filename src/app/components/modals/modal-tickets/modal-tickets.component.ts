import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal-tickets',
  templateUrl: './modal-tickets.component.html',
  styleUrls: ['./modal-tickets.component.scss'],
})
export class ModalTicketsComponent implements OnInit {

  @Input() tickets: any[];

  @Input() value: any;

  constructor(
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {}

  public dismiss() {
    this.modalCtrl.dismiss(this.value);
  }

  public select(value: any) {
    this.modalCtrl.dismiss(value);
  }

}
