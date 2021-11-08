import { Injectable } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(
    private toastCtrl: ToastController,
    private alertCtrl: AlertController
  ) { }

  public async show(options: AlertOptions) {

    const alert = await this.alertCtrl.create({
      header: options.header,
      message: options.message,
      buttons: [
        {
          text: options.cancelButtonText ? options.cancelButtonText : 'Cancelar',
          role: 'cancel',
          handler: () => {
            options.onCancel();
          }
        }, {
          text: options.confirmButtonText ? options.confirmButtonText : 'Confirmar',
          handler: () => {
            options.onConfirm();
          }
        }
      ]
    });

    return await alert.present();

  }

  public async toast(options: ToastOptions) {

    const toast = await this.toastCtrl.create({
      color: options.color,
      message: options.message,
      duration: options.duration ? options.duration : 4500,
      position: options.position ? options.position : 'top'
    });

    return await toast.present();

  }

}

interface AlertOptions {
  header: string;
  message: string;
  confirmButtonText?: string;
  cancelButtonText?: string;
  onConfirm?: Function;
  onCancel?: Function;
}

interface ToastOptions {
  color: 'primary' | 'success' | 'danger' | 'dark' | 'warning';
  message: string;
  duration?: number;
  position?: 'top' | 'bottom';
}