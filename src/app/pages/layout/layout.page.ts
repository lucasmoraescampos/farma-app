import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.page.html',
  styleUrls: ['./layout.page.scss'],
})
export class LayoutPage implements OnInit, OnDestroy {

  public loading: boolean;

  public user: any;

  public appPages = [
    { title: 'Início',    url: '/home',       icon: 'home-outline' },
    { title: 'Clientes',  url: '/customers',  icon: 'people-outline' },
    { title: 'Produtos',  url: '/products',   icon: 'cube-outline' },
    { title: 'Promoção',  url: '/promotion',  icon: 'ticket-outline' },
    { title: 'Agenda',    url: '/schedule',   icon: 'calendar-outline' },
    { title: 'Pedidos',   url: '/order',      icon: 'receipt-outline' }
  ];
  
  private unsubscribe = new Subject();

  constructor(
    private apiSrv: ApiService,
    private navCtrl: NavController
  ) { }

  ngOnInit() {

    this.user = JSON.parse(localStorage.getItem('current_user'));

  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  public logout() {
    this.loading = true;
    this.apiSrv.logout()
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(res => {
        this.loading = false;
        if (res.success) {
          this.navCtrl.navigateRoot('/login');
        }
      });
  }

}
