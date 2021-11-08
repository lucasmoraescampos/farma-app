import { Component, OnInit } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { ModalController } from '@ionic/angular';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ApiService } from 'src/app/services/api.service';
import { SQLiteService } from 'src/app/services/sqlite.service';

@Component({
  selector: 'app-modal-positive-customers',
  templateUrl: './modal-positive-customers.component.html',
  styleUrls: ['./modal-positive-customers.component.scss'],
})
export class ModalPositiveCustomersComponent implements OnInit {

  public customers: any[];

  private unsubscribe$ = new Subject();

  constructor(
    private apiSrv: ApiService,
    private modalCtrl: ModalController,
    private sqliteSrv: SQLiteService
  ) { }

  ngOnInit() {
    this.initCustomers();
  }

  public dismiss() {
    this.modalCtrl.dismiss();
  }

  private initCustomers() {

    if (Capacitor.isNativePlatform()) {

      this.sqliteSrv.getPositiveCustomers()
        .then(customers => this.customers = customers);

    }

    else {

      this.apiSrv.getPositiveCustomers()
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe(res => this.customers = res.data);

    }
    
  }

}
