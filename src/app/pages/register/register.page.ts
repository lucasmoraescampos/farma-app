import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController, NavController } from '@ionic/angular';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ModalTicketsComponent } from 'src/app/components/modals/modal-tickets/modal-tickets.component';
import { AlertService } from 'src/app/services/alert.service';
import { ApiService } from 'src/app/services/api.service';
import { UtilsHelper } from 'src/app/helpers/utils.helper';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit, OnDestroy {

  public loading: boolean;

  public tickets: any[];

  public ticketSelected: any;

  public passwordConfirm: string;

  public formGroup: FormGroup;

  private unsubscribe = new Subject();

  constructor(
    private apiSrv: ApiService,
    private formBuilder: FormBuilder,
    private modalCtrl: ModalController,
    private alertSrv: AlertService,
    private navCtrl: NavController
  ) { }

  ngOnInit() {

    this.formGroup = this.formBuilder.group({
      ticket_id:  ['', Validators.required],
      name:       ['', Validators.required],
      cpf:        ['', Validators.required],
      phone:      ['', Validators.required],
      email:      ['', Validators.required],
      password:   ['', Validators.required]
    });

    this.initTickest();

  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  public async selectTicket() {

    const modal = await this.modalCtrl.create({
      component: ModalTicketsComponent,
      cssClass: 'modal-tickets',
      componentProps: {
        tickets: this.tickets
      }
    });

    modal.onDidDismiss()
      .then(res => {
        if (res.data) {
          this.ticketSelected = res.data;
          this.formGroup.patchValue({ ticket_id: res.data.id });
        }
      });

    return await modal.present();

  }

  public save() {

    if (this.formGroup.valid) {
      
      if (!UtilsHelper.validateDocumentNumber(this.formGroup.value.cpf)) {

        this.alertSrv.toast({
          icon: 'error',
          message: 'CPF inválido'
        });

      }

      else if (!UtilsHelper.validateEmail(this.formGroup.value.email)) {

        this.alertSrv.toast({
          icon: 'error',
          message: 'Email inválido'
        });

      }

      else if (this.formGroup.value.password != this.passwordConfirm) {

        this.alertSrv.toast({
          icon: 'error',
          message: 'Senhas não são iguais'
        });

      }

      else {

        this.loading = true;

        const data: any = this.formGroup.value;

        data.cpf = data.cpf.replace(/[^0-9]/g, '');

        data.phone = data.phone.replace(/[^0-9]/g, '');

        this.apiSrv.register(data)
          .pipe(takeUntil(this.unsubscribe))
          .subscribe(res => {

            this.loading = false;

            if (res.success) {

              this.navCtrl.navigateRoot(['/']);

            }

            else {

              this.alertSrv.show({
                icon: 'error',
                message: res.message
              });

            }

          });

      }

    }

    else {

      this.alertSrv.toast({
        icon: 'error',
        message: 'Preencha todos os campos'
      });

    }

  }

  private initTickest() {
    this.loading = true;
    this.apiSrv.getTickets()
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(res => {
        this.loading = false;
        this.tickets = res.data;
      });
  }

}
