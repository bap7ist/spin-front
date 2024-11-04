import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular/standalone';
import { from, Observable } from 'rxjs';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

interface ToastOptions {
  message: string;
  type?: ToastType;
  duration?: number;
}

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  constructor(private toastController: ToastController) {}

  success(message: string): Observable<void> {
    return this.show({ message, type: 'success' });
  }

  error(message: string): Observable<void> {
    return this.show({ message, type: 'error' });
  }

  warning(message: string): Observable<void> {
    return this.show({ message, type: 'warning' });
  }

  info(message: string): Observable<void> {
    return this.show({ message, type: 'info' });
  }

  private show(options: ToastOptions): Observable<void> {
    return from(this.presentToast(options));
  }

  private getToastColor(type: ToastType = 'info'): string {
    const colors: Record<ToastType, string> = {
      success: 'success',
      error: 'danger',
      warning: 'warning',
      info: 'primary',
    };
    return colors[type];
  }

  private async presentToast(options: ToastOptions): Promise<void> {
    const toast = await this.toastController.create({
      message: options.message,
      duration: options.duration || 3000,
      position: 'top',
      color: this.getToastColor(options.type),
      cssClass: `toast-${options.type}`,
      buttons: [
        {
          icon: 'close',
          role: 'cancel',
        },
      ],
    });

    await toast.present();
  }
}
