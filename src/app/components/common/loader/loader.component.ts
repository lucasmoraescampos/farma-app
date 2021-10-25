import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
})
export class LoaderComponent implements OnInit, OnDestroy {

  public loading: any;

  private unsubscribe = new Subject();

  constructor(
    private loadingSrv: LoadingService
  ) { }

  ngOnInit() {
    this.loadingSrv.status.pipe(takeUntil(this.unsubscribe))
      .subscribe(status => {
        setTimeout(() => this.loading = status);
      });
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

}
