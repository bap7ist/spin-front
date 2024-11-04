import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, mergeMap, throwError } from 'rxjs';
import { ToastService } from '../services/toast.service';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const toastService = inject(ToastService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      let errorMessage = 'Une erreur est survenue';

      if (error.error instanceof ErrorEvent) {
        errorMessage = error.error.message;
      } else {
        switch (error.status) {
          case 401:
            errorMessage =
              error.error.message || 'Email ou mot de passe incorrect';
            break;
          case 400:
            errorMessage = error.error.message || 'Données invalides';
            break;
          case 409:
            errorMessage = 'Cet email est déjà utilisé';
            break;
          case 500:
            errorMessage = 'Erreur serveur';
            break;
          default:
            errorMessage = 'Une erreur est survenue';
        }
      }

      return toastService
        .error(errorMessage)
        .pipe(mergeMap(() => throwError(() => errorMessage)));
    })
  );
};
