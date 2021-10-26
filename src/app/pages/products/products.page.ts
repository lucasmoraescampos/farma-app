import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { IonSlides } from '@ionic/angular';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
})
export class ProductsPage implements OnInit, OnDestroy {

  @ViewChild(IonSlides) slide: IonSlides;

  public labs: any[];

  public products: any[];

  public labSelected: any;

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
    this.slide.slidePrev();
  }
  
  public selectLab(lab: any) {

    if (this.labSelected?.id_lab == lab.id_lab) {
      this.slide.slideNext();
    }

    else {

      this.labSelected = lab;

      this.apiSrv.getProducts({ id_lab: lab.id_lab })
        .pipe(takeUntil(this.unsubscribe))
        .subscribe(res => {
          this.products = res.data;
          this.slide.slideNext();
        });

    }

  }

  public initLabs() {
    this.apiSrv.getLabs()
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(res => this.labs = res.data);
  }

}
