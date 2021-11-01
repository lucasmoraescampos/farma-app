import { Component, OnDestroy, OnInit } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { Network } from '@capacitor/network';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ApiService } from 'src/app/services/api.service';
import { SQLiteService } from 'src/app/services/sqlite.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
})
export class ProductsPage implements OnInit, OnDestroy {

  public labs: any[];

  public products: any[];

  public labSelected: any;

  public search: string;

  private unsubscribe = new Subject();

  constructor(
    private apiSrv: ApiService,
    private sqliteSrv: SQLiteService
  ) { }

  ngOnInit() {
    this.initLabs();
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  public changeLab() {
    this.labSelected = null;
  }

  public selectLab(lab: any) {
    
    Network.getStatus()
      .then(status => {

        if (status.connected) {

          this.apiSrv.getProducts({ id_lab: lab.id_lab })
            .pipe(takeUntil(this.unsubscribe))
            .subscribe(res => {

              this.labSelected = lab;

              this.products = res.data;

              if (Capacitor.isNativePlatform()) {
                this.sqliteSrv.setProducts(res.data, lab.id_lab);
              }

            });

        }

        else {

          this.sqliteSrv.getProducts(lab.id_lab)
            .then(labs => {
              this.labs = labs;
            });

        }

      });
      
  }

  public initLabs() {

    Network.getStatus()
      .then(status => {

        if (status.connected) {

          this.apiSrv.getLabs()
            .pipe(takeUntil(this.unsubscribe))
            .subscribe(res => {

              this.labs = res.data;

              if (Capacitor.isNativePlatform()) {
                this.sqliteSrv.setLabs(res.data);
              }
            
            });

        }

        else {

          this.sqliteSrv.getLabs()
            .then(labs => {
              this.labs = labs;
            });

        }

      });

  }

}
