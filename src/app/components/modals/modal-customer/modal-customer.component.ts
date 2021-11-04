import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Capacitor } from '@capacitor/core';
import { Network } from '@capacitor/network';
import { ModalController } from '@ionic/angular';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { UtilsHelper } from 'src/app/helpers/utils.helper';
import { AlertService } from 'src/app/services/alert.service';
import { ApiService } from 'src/app/services/api.service';
import { SQLiteService } from 'src/app/services/sqlite.service';

@Component({
  selector: 'app-modal-customer',
  templateUrl: './modal-customer.component.html',
  styleUrls: ['./modal-customer.component.scss'],
})
export class ModalCustomerComponent implements OnInit, OnDestroy {

  public formGroup: FormGroup;

  private unsubscribe = new Subject();

  constructor(
    private apiSrv: ApiService,
    private formBuilder: FormBuilder,
    private modalCtrl: ModalController,
    private alertSrv: AlertService,
    private sqliteSrv: SQLiteService
  ) { }

  ngOnInit() {

    this.formGroup = this.formBuilder.group({
      razao_social: ['', Validators.required],
      cnpj:         ['', Validators.required],
      cel:          ['', Validators.required],
      email:        ['', Validators.required],
      grupo:        ['', Validators.required],
      fantasia:     [''],
      ie:           [''],
      tel:          [''],
      cep:          [''],
      end:          [''],
      bairro:       [''],
      cidade:       [''],
      estado:       [''],
      ref1:         [''],
      refnum1:      [''],
      ref2:         [''],
      refnum2:      [''],
      ref3:         [''],
      refnum3:      ['']
    });

  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  public dismiss() {
    this.modalCtrl.dismiss();
  }

  public save() {

    if (this.formGroup.valid) {

      const data = this.formGroup.value;

      if (!UtilsHelper.validateEmail(data.email)) {
        
        return this.alertSrv.toast({
          color: 'danger',
          message: 'Email Inválido!'
        });

      }

      if (!UtilsHelper.validateDocumentNumber(data.cnpj)) {
        
        return this.alertSrv.toast({
          color: 'danger',
          message: 'CNPJ Inválido!'
        });

      }

      if (data.ddd) {
        data.ddd = data.tel.slice(1, 3);
      }

      if (data.tel) {
        data.tel = data.tel.slice(5);
      }

      Network.getStatus()
        .then(status => {

          if (status.connected) {

            this.apiSrv.createCustomer(data)
              .pipe(takeUntil(this.unsubscribe))
              .subscribe(res => {

                if (res.success) {

                  this.alertSrv.toast({
                    color: 'success',
                    message: res.message
                  });

                  this.modalCtrl.dismiss(res.data);

                }

                else {

                  this.alertSrv.toast({
                    color: 'danger',
                    message: res.message
                  });

                }

              });

          }

          else if (Capacitor.isNativePlatform()) {

            this.sqliteSrv.createCustomer(data)
              .then(customer => {

                this.alertSrv.toast({
                  color: 'success',
                  message: 'Cliente cadastrado com sucesso!'
                });

                this.modalCtrl.dismiss(customer);

              }).catch(err => {

                this.alertSrv.toast({
                  color: 'danger',
                  message: err.message
                });

              });

          }

        });
        
    }

  }
}
