import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Capacitor } from '@capacitor/core';
import { NavController } from '@ionic/angular';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AlertService } from 'src/app/services/alert.service';
import { ApiService } from 'src/app/services/api.service';
import { SplashScreen } from '@capacitor/splash-screen';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit, OnDestroy {

  public loading: boolean;

  public eye: boolean;

  public formGroup: FormGroup;

  private unsubscribe = new Subject();

  constructor(
    private apiSrv: ApiService,
    private formBuilder: FormBuilder,
    private alertSrv: AlertService,
    private navCtrl: NavController
  ) { }

  ngOnInit() {

    this.formGroup = this.formBuilder.group({
      user:     ['', Validators.required],
      password: ['', Validators.required]
    });

    if (Capacitor.isNativePlatform()) {
      SplashScreen.hide();
    }

  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  public toggleEye() {
    this.eye = !this.eye;
  }

  public login() {

    if (this.loading) return;

    if (this.formGroup.valid) {

      this.loading = true;

      this.apiSrv.login(this.formGroup.value)
        .pipe(takeUntil(this.unsubscribe))
        .subscribe(
          res => {
            this.loading = false;
            if (res.success) {
              this.navCtrl.navigateRoot(['/']);
            }
            else {
              this.alertSrv.toast({
                color: 'danger',
                message: res.message
              });
            }
          },
          err => this.loading = false
        );

    }

    else {

      this.alertSrv.toast({
        color: 'danger',
        message: 'Preencha todos os campos'
      });

    }
    
  }

}
