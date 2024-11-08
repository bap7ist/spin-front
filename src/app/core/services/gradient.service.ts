import { Injectable } from '@angular/core';
import { ModalController } from '@ionic/angular/standalone';
import { from, Observable, map, throwError } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';
import { UserService } from './user.service';
import { UserStore } from '../stores/user.store';
import { gradients } from 'src/app/components/gradient-picker/gradients';
import { GradientPickerComponent } from 'src/app/components/gradient-picker/gradient-picker.component';

export interface GradientOption {
  id: string;
  name: string;
  value: string;
}

@Injectable({
  providedIn: 'root',
})
export class GradientService {
  gradient$ = this.userStore.user$.pipe(
    map((user) => {
      if (!user?.gradient) return this.gradients[0].value;
      const gradient = this.gradients.find((g) => g.id === user.gradient?.id);
      return gradient ? gradient.value : this.gradients[0].value;
    })
  );

  private gradients: GradientOption[] = gradients;

  constructor(
    private modalCtrl: ModalController,
    private userService: UserService,
    private userStore: UserStore
  ) {}

  openGradientPicker(): Observable<GradientOption | undefined> {
    return from(this.createModal()).pipe(
      take(1),
      switchMap((modal) => {
        modal.present();
        return from(modal.onDidDismiss<GradientOption>());
      }),
      map((result) => result.data),
      switchMap((gradient) => {
        if (gradient) {
          console.log(gradient);

          return this.userService.updateGradient$(gradient).pipe(
            map((user) => {
              this.userStore.setUser(user);
              return gradient;
            })
          );
        }
        return throwError(() => new Error('No gradient selected'));
      })
    );
  }

  private createModal() {
    return this.modalCtrl.create({
      component: GradientPickerComponent,
      cssClass: 'gradient-picker-modal',
    });
  }

  getGradients(): GradientOption[] {
    return this.gradients;
  }
}
