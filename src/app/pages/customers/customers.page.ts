import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { IonSlides } from '@ionic/angular';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.page.html',
  styleUrls: ['./customers.page.scss'],
})
export class CustomersPage implements OnInit, OnDestroy {

  @ViewChild(IonSlides) slides: IonSlides;

  public segment: number = 0;

  public customers: any[];

  public expired: any[];

  private unsubscribe = new Subject();

  constructor(
    private apiSrv: ApiService
  ) { }

  ngOnInit() {
    this.initCustomers();
    this.initExpired();
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  public segmentChanged() {
    this.slides.slideTo(this.segment);
  }

  public slideChanged(ev: any) {
    this.segment = ev.target.swiper.activeIndex;
  }

  private initCustomers() {
    this.apiSrv.getCustomers()
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(res => this.customers = res.data);
  }

  private initExpired() {
    this.apiSrv.getExpiredCustomers()
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(res => this.expired = res.data);
  }

}
