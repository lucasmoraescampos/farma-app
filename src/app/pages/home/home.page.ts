import { Component, OnDestroy, OnInit } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { ModalController } from '@ionic/angular';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ModalPositiveCustomersComponent } from 'src/app/components/modals/modal-positive-customers/modal-positive-customers.component';
import { ApiService } from 'src/app/services/api.service';
import { SQLiteService } from 'src/app/services/sqlite.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {

  public dashboard: any;

  private unsubscribe = new Subject();

  constructor(
    private apiSrv: ApiService,
    private modalCtrl: ModalController,
    private sqliteSrv: SQLiteService
  ) { }

  ngOnInit() {
    this.initDashboard();
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  public async customers() {

    const modal = await this.modalCtrl.create({
      component: ModalPositiveCustomersComponent
    });

    return await modal.present();

  }

  private initDashboard() {

    if (Capacitor.isNativePlatform()) {

      this.sqliteSrv.getDashboard()
        .then(dashboard => {
          this.dashboard = dashboard;
        });

    }

    else {

      this.apiSrv.dashboard()
        .pipe(takeUntil(this.unsubscribe))
        .subscribe(res => this.dashboard = res.data);

    }

  }

}