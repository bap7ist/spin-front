import { Component, DestroyRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonBackButton,
  IonButtons,
  IonList,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonSpinner,
  ToastController, IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  chevronBackOutline,
  personOutline,
  mailOutline,
  callOutline,
  locationOutline,
  calendarOutline,
} from 'ionicons/icons';
import { Observable, finalize, tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { UserService } from 'src/app/core/services/user.service';
import { User } from 'src/app/core/models/user.model';

interface PersonalInfoForm {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  birthDate: string;
  address: string;
}

@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.page.html',
  styleUrls: ['./personal-info.page.scss'],
  standalone: true,
  imports: [IonIcon, 
    CommonModule,
    ReactiveFormsModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonBackButton,
    IonButtons,
    IonList,
    IonItem,
    IonLabel,
    IonInput,
    IonButton,
    IonIcon,
    IonSpinner,
  ],
})
export class PersonalInfoPage {
  form: FormGroup;
  isLoading = false;
  user$: Observable<User>; // Remplacer 'any' par votre interface User

  constructor(
    private readonly destroyRef: DestroyRef,
    private readonly fb: FormBuilder,
    private readonly userService: UserService,
    private readonly toastController: ToastController,
    private readonly router: Router
  ) {
    addIcons({
      chevronBackOutline,
      personOutline,
      mailOutline,
      callOutline,
      locationOutline,
      calendarOutline,
    });

    this.initForm();
    this.loadUserData();
  }

  private initForm(): void {
    this.form = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: [''],
      birthDate: [''],
      address: [''],
    });
  }

  private loadUserData(): void {
    this.user$ = this.userService.getCurrentUser().pipe(
      tap((user) => {
        if (user) {
          this.form.patchValue({
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            phoneNumber: user.phoneNumber,
            birthDate: user.birthDate,
            address: user.address,
          });
        }
      }),
      takeUntilDestroyed(this.destroyRef)
    );
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.isLoading = true;
      const formData: PersonalInfoForm = this.form.value;
      this.userService
        .updateProfile({
          ...formData,
          birthDate: formData.birthDate
            ? new Date(formData.birthDate)
            : undefined,
        })
        .pipe(
          takeUntilDestroyed(this.destroyRef),
          finalize(() => (this.isLoading = false)),
          tap({
            next: () => {
              this.showToast(
                'Informations mises à jour avec succès',
                'success'
              );
              this.router.navigate(['/profile']);
            },
            error: (error) => {
              console.error('Erreur lors de la mise à jour:', error);
              this.showToast('Erreur lors de la mise à jour', 'danger');
            },
          })
        )
        .subscribe();
    }
  }

  private async showToast(
    message: string,
    color: 'success' | 'danger'
  ): Promise<void> {
    const toast = await this.toastController.create({
      message,
      duration: 3000,
      color,
      position: 'bottom',
    });
    await toast.present();
  }

  goBack() {
    this.router.navigate(['/tabs/profile']);
  }
}
