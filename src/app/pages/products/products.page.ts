import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ApiService } from 'src/app/services/api.service';

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
    private apiSrv: ApiService
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
    this.apiSrv.getProducts({ id_lab: lab.id_lab })
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(res => {
        this.labSelected = lab;
        this.products = res.data;
      });
  }

  public initLabs() {
    this.apiSrv.getLabs()
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(res => this.labs = res.data);
  }

}
