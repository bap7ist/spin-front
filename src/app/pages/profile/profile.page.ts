import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonAvatar,
  IonButton,
  IonIcon,
  IonSkeletonText,
  ActionSheetController,
  IonItem,
  IonLabel,
  IonSpinner,
  IonRefresher,
  IonRefresherContent,
} from '@ionic/angular/standalone';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Observable, from, throwError } from 'rxjs';
import { switchMap, tap, catchError, finalize, take } from 'rxjs/operators';
import { addIcons } from 'ionicons';
import {
  logOutOutline,
  createOutline,
  camera,
  image,
  trash,
  closeCircle,
  personOutline,
  heartOutline,
  settingsOutline,
  shieldOutline,
  happyOutline,
} from 'ionicons/icons';
import { FileService } from 'src/app/core/services/file.service';
import { UserService } from 'src/app/core/services/user.service';
import { UserStore } from 'src/app/core/stores/user.store';
import { AuthService } from 'src/app/core/services/auth.service';
import { RouterLink } from '@angular/router';
import { ToastService } from 'src/app/core/services/toast.service';
import { GradientService } from 'src/app/core/services/gradient.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: true,
  imports: [
    IonRefresherContent,
    IonRefresher,
    IonSpinner,
    IonLabel,
    IonItem,
    CommonModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonAvatar,
    IonButton,
    IonIcon,
    IonSkeletonText,
    RouterLink,
  ],
})
export class ProfilePage {
  user$ = this.userStore.user$;

  public isLoading = false;

  gradient$ = this.gradientService.gradient$;

  constructor(
    private actionSheetCtrl: ActionSheetController,
    private fileService: FileService,
    private userService: UserService,
    private userStore: UserStore,
    private authService: AuthService,
    private toastService: ToastService,
    private gradientService: GradientService
  ) {
    addIcons({
      camera,
      personOutline,
      heartOutline,
      happyOutline,
      shieldOutline,
      logOutOutline,
      settingsOutline,
      createOutline,
      image,
      trash,
      closeCircle,
    });
  }

  onChangeAvatar(): void {
    from(this.createActionSheet())
      .pipe(
        take(1),
        switchMap((actionSheet) => from(actionSheet.present())),
        catchError((error) => {
          console.error('Error presenting action sheet:', error);
          throw error;
        })
      )
      .subscribe();
  }

  private createActionSheet() {
    return this.actionSheetCtrl.create({
      header: 'Modifier la photo de profil',
      buttons: [
        {
          text: 'Prendre une photo',
          icon: 'camera',
          handler: () => this.takePicture(CameraSource.Camera),
        },
        {
          text: 'Choisir depuis la galerie',
          icon: 'image',
          handler: () => this.takePicture(CameraSource.Photos),
        },
        {
          text: 'Supprimer la photo',
          icon: 'trash',
          role: 'destructive',
          handler: () => this.removeAvatar(),
        },
        {
          text: 'Annuler',
          role: 'cancel',
        },
      ],
    });
  }

  private takePicture(source: CameraSource): void {
    this.isLoading = true;
    from(
      Camera.getPhoto({
        quality: 90,
        allowEditing: true,
        resultType: CameraResultType.DataUrl,
        source,
        correctOrientation: true,
      })
    )
      .pipe(
        take(1),
        switchMap((image) => {
          console.log('image', image);
          if (!image.dataUrl) {
            return throwError(() => 'Aucune image sélectionnée');
          }
          return this.fileService.dataUrlToFile(image.dataUrl, 'avatar.jpg');
        }),
        switchMap((file) => this.userService.updateAvatar(file)),
        tap((user) => this.userStore.setUser(user)),
        catchError((error) => {
          return this.toastService.error(error);
        }),
        finalize(() => (this.isLoading = false))
      )
      .subscribe();
  }

  private removeAvatar(): void {
    this.userService
      .removeAvatar()
      .pipe(
        take(1),
        tap((user) => this.userStore.setUser(user)),
        catchError((error) => {
          console.error("Erreur lors de la suppression de l'avatar:", error);
          throw error;
        })
      )
      .subscribe();
  }

  onEditProfile(): void {
    console.log('Edit profile clicked');
    // TODO: Implémenter la navigation vers la page d'édition du profil
  }

  onLogout(): void {
    this.authService.logout();
  }

  onChangeGradient(): void {
    console.log('clickyyyy');

    this.gradientService.openGradientPicker().subscribe();
  }
}
