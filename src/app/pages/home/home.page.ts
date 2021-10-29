import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {

  public dashboard: any;

  private unsubscribe = new Subject();

  constructor(
    private apiSrv: ApiService
  ) { }

  ngOnInit() {
    this.initDashboard();
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  private async initDashboard() {
    this.apiSrv.dashboard()
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(res => this.dashboard = res.data);
  }

}