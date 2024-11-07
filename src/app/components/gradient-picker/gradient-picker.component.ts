import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ModalController,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
  IonContent,
  IonIcon,
  IonSpinner,
} from '@ionic/angular/standalone';
import { GradientOption } from 'src/app/core/services/gradient.service';
import { GradientService } from 'src/app/core/services/gradient.service';

@Component({
  selector: 'app-gradient-picker',
  standalone: true,
  imports: [
    CommonModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonButton,
    IonIcon,
    IonContent,
    IonSpinner,
  ],
  template: `
    <ion-content>
      <!-- Modern header -->
      <div class="modern-header">
        <h2>Choisir un thème</h2>
        <ion-button fill="clear" (click)="dismiss()" class="close-button">
          <ion-icon name="close-outline"></ion-icon>
        </ion-button>
      </div>

      <div class="gradient-grid">
        @for (gradient of gradients; track gradient.id) {
        <div
          class="gradient-option"
          [style.background]="gradient.value"
          (click)="selectGradient(gradient)"
          [class.loading]="loading"
        ></div>
        }
      </div>

      <!-- Bouton Annuler en bas -->
      <div class="cancel-button-container">
        <ion-button
          (click)="dismiss()"
          fill="solid"
          color="light"
          class="cancel-button"
          [disabled]="loading"
        >
          @if (loading) {
          <ion-spinner name="dots"></ion-spinner>
          } @else { Annuler }
        </ion-button>
      </div>
    </ion-content>
  `,
  styles: [
    `
      .modern-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 20px 16px;
        background: var(--ion-background-color);
        position: sticky;
        top: 0;
        z-index: 10;

        h2 {
          margin: 0;
          font-size: 1.3rem;
          font-weight: 600;
        }

        .close-button {
          font-size: 1.5rem;
          --padding-start: 8px;
          --padding-end: 8px;
          height: 36px;
          margin: 0;
        }
      }

      .gradient-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 16px;
        padding: 16px;
        padding-bottom: 80px;
      }

      .gradient-option {
        height: 120px;
        border-radius: 16px;
        cursor: pointer;
        transition: transform 0.2s, box-shadow 0.2s;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);

        &:hover {
          transform: scale(1.02);
          box-shadow: 0 6px 16px rgba(0, 0, 0, 0.12);
        }

        &:active {
          transform: scale(0.98);
        }
      }

      .cancel-button-container {
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        padding: 16px;
        background: linear-gradient(
          to top,
          var(--ion-background-color) 80%,
          transparent
        );
        display: flex;
        justify-content: center;
        z-index: 10;

        .cancel-button {
          --border-radius: 12px;
          font-weight: 500;
          text-transform: none;
          width: 200px;
          --background: var(--ion-background-color);
          --color: var(--ion-text-color);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
        }
      }
    `,
  ],
})
export class GradientPickerComponent {
  gradients = this.gradientService.getGradients();
  loading = false;

  constructor(
    private modalCtrl: ModalController,
    private gradientService: GradientService
  ) {}

  selectGradient(gradient: GradientOption) {
    this.loading = true;
    this.modalCtrl.dismiss(gradient);
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }
}
