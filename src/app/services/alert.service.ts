import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import Swal, { SweetAlertIcon, SweetAlertPosition } from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(
    private toastCtrl: ToastController
  ) { }

  public show(options: AlertOptions) {
    Swal.fire({
      icon: options.icon,
      title: options.title,
      text: options.message,
      showCancelButton: options.showCancelButton !== undefined ? options.showCancelButton : true,
      confirmButtonText: options.confirmButtonText ? options.confirmButtonText : 'Confirmar',
      cancelButtonText: options.cancelButtonText ? options.cancelButtonText : 'Cancelar',
      heightAuto: false,
      allowOutsideClick: false,
    }).then(result => {
      if (result.value) {
        if (options.onConfirm) {
          options.onConfirm();
        }
      }
      else {
        if (options.onCancel) {
          options.onCancel();
        }
      }
    });
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
  title?: string;
  message?: string;
  confirmButtonText?: string;
  cancelButtonText?: string;
  showCancelButton?: boolean;
  onConfirm?: Function;
  onCancel?: Function;
  duration?: number;
  icon?: SweetAlertIcon;
}

interface ToastOptions {
  color: 'primary' | 'success' | 'danger' | 'dark' | 'warning';
  message: string;
  duration?: number;
  position?: 'top' | 'bottom';
}