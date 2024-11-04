import { Injectable } from '@angular/core';
import { Observable, from, throwError } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class FileService {
  private readonly MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
  private readonly MAX_DIMENSION = 2048;

  dataUrlToFile(dataUrl: string, filename: string): Observable<File> {
    return from(fetch(dataUrl)).pipe(
      switchMap((response) => from(response.blob())),
      switchMap((blob) => {
        const file = new File([blob], filename, { type: blob.type });
        return this.validateFile(file);
      })
    );
  }

  private validateFile(file: File): Observable<File> {
    // Vérification du type
    if (!file.type.startsWith('image/')) {
      return throwError(() => new Error('Le fichier doit être une image'));
    }

    // Vérification de la taille
    if (file.size > this.MAX_FILE_SIZE) {
      return throwError(() => new Error('Le fichier ne doit pas dépasser 5MB'));
    }

    return new Observable((observer) => {
      const img = new Image();

      img.onload = () => {
        URL.revokeObjectURL(img.src); // Nettoyage

        if (img.width > this.MAX_DIMENSION || img.height > this.MAX_DIMENSION) {
          observer.error(
            new Error(
              `L'image ne doit pas dépasser ${this.MAX_DIMENSION}x${this.MAX_DIMENSION} pixels`
            )
          );
          return;
        }

        observer.next(file);
        observer.complete();
      };

      img.onerror = () => {
        URL.revokeObjectURL(img.src); // Nettoyage
        observer.error(new Error("Impossible de lire l'image"));
      };

      img.src = URL.createObjectURL(file);
    });
  }
}
