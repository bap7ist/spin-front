import { Component, DestroyRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { catchError, EMPTY, finalize, mergeMap } from 'rxjs';
import { 
  IonContent,
  IonInput,
  IonButton,
  IonSpinner,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonBackButton,
  IonButtons
} from '@ionic/angular/standalone';
import { AuthService } from 'src/app/core/services/auth.service';
import { ToastService } from 'src/app/core/services/toast.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    IonContent,
    IonInput,
    IonButton,
    IonSpinner,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonBackButton,
    IonButtons
  ]
})
export class LoginPage {
  private readonly destroyRef = inject(DestroyRef);
  loginForm: FormGroup;
  isLoading = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private toastService: ToastService
  ) {
    this.initForm();
  }

  private initForm(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.isLoading = true;
      
      this.authService.login(this.loginForm.value).pipe(
        mergeMap(() => this.toastService.success('Connexion réussie !')),
        catchError(() => EMPTY),
        finalize(() => this.isLoading = false),
        takeUntilDestroyed(this.destroyRef)
      ).subscribe(() => {
        this.router.navigate(['/tabs/feed']);
      });
    }
  }
}
