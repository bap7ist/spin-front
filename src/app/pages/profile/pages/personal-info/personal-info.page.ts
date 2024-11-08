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
  ToastController,
  IonIcon,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  chevronBackOutline,
  personOutline,
  mailOutline,
  callOutline,
  locationOutline,
  calendarOutline, lockClosedOutline } from 'ionicons/icons';
import { Observable, catchError, finalize, switchMap, tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { UserService } from 'src/app/core/services/user.service';
import { User } from 'src/app/core/models/user.model';
import { ToastService } from 'src/app/core/services/toast.service';
import { SubmitButtonComponent } from '../../../../components/submit-button/submit-button.component';
import { UserStore } from 'src/app/core/stores/user.store';

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
  imports: [
    IonIcon,
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
    SubmitButtonComponent,
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
    private readonly router: Router,
    private readonly toastService: ToastService,
    private userStore: UserStore
  ) {
    addIcons({chevronBackOutline,personOutline,mailOutline,lockClosedOutline,callOutline,calendarOutline,locationOutline,});

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
          const formattedBirthDate = user.birthDate
            ? new Date(user.birthDate).toISOString().split('T')[0]
            : '';
          this.form.patchValue({
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            phoneNumber: user.phoneNumber,
            birthDate: formattedBirthDate,
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
          catchError(() => this.toastService.error('Une erreur est survenue')),
          switchMap((user) => {
            if (user) this.userStore.setUser(user);
            return this.toastService.success(
              'Informations mises à jour avec succès'
            );
          })
        )
        .subscribe();
    }
  }

  goBack() {
    this.router.navigate(['/tabs/profile']);
  }
}
