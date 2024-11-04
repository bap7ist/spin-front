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
} from '@ionic/angular/standalone';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Observable, from } from 'rxjs';
import { switchMap, tap, catchError } from 'rxjs/operators';
import { addIcons } from 'ionicons';
import {
  logOutOutline,
  createOutline,
  camera,
  image,
  trash,
  closeCircle,
} from 'ionicons/icons';
import { FileService } from 'src/app/core/services/file.service';
import { UserService } from 'src/app/core/services/user.service';
import { UserStore } from 'src/app/core/stores/user.store';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonAvatar,
    IonButton,
    IonIcon,
    IonSkeletonText,
  ],
})
export class ProfilePage {
  user$ = this.userStore.user$;

  constructor(
    private actionSheetCtrl: ActionSheetController,
    private fileService: FileService,
    private userService: UserService,
    private userStore: UserStore,
    private authService: AuthService
  ) {
    addIcons({
      logOutOutline,
      createOutline,
      camera,
      image,
      trash,
      closeCircle,
    });
  }

  onChangeAvatar(): void {
    from(this.createActionSheet())
      .pipe(
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
        switchMap((image) => {
          if (!image.dataUrl) {
            throw new Error('Aucune image sélectionnée');
          }
          return this.fileService.dataUrlToFile(image.dataUrl, 'avatar.jpg');
        }),
        switchMap((file) => this.userService.updateAvatar(file)),
        tap((user) => this.userStore.setUser(user)),
        catchError((error) => {
          // TODO: Ajouter un service de notification pour afficher l'erreur
          console.error("Erreur lors de la mise à jour de l'avatar:", error);
          throw error;
        })
      )
      .subscribe();
  }

  private removeAvatar(): void {
    this.userService
      .removeAvatar()
      .pipe(
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
}
