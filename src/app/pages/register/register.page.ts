import { Component, DestroyRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { finalize, catchError, EMPTY, mergeMap } from 'rxjs';
import {
  IonContent,
  IonInput,
  IonButton,
  IonIcon,
  IonSpinner,
  IonHeader,
  IonToolbar,
  IonTitle,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { arrowBack } from 'ionicons/icons';
import { AuthService } from 'src/app/core/services/auth.service';
import { ToastService } from 'src/app/core/services/toast.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonContent,
    IonInput,
    IonButton,
    IonIcon,
    IonSpinner,
    IonHeader,
    IonToolbar,
    IonTitle,
  ],
})
export class RegisterPage {
  private readonly destroyRef = inject(DestroyRef);
  registerForm: FormGroup;
  isLoading = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private toastService: ToastService
  ) {
    addIcons({ arrowBack });
    this.initForm();
  }

  private initForm(): void {
    this.registerForm = this.formBuilder.group(
      {
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required],
      },
      {
        validators: this.passwordMatchValidator,
      }
    );
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      this.isLoading = true;

      this.authService
        .register(this.registerForm.value)
        .pipe(
          mergeMap(() => this.toastService.success('Inscription réussie !')),
          catchError(() => EMPTY),
          finalize(() => (this.isLoading = false)),
          takeUntilDestroyed(this.destroyRef)
        )
        .subscribe(() => {
          this.router.navigate(['/tabs/feed']);
        });
    }
  }

  goBack(): void {
    this.router.navigate(['/login']);
  }

  private passwordMatchValidator(
    group: FormGroup
  ): { [key: string]: any } | null {
    const password = group.get('password');
    const confirmPassword = group.get('confirmPassword');

    if (
      password &&
      confirmPassword &&
      password.value !== confirmPassword.value
    ) {
      return { passwordMismatch: true };
    }
    return null;
  }
}
