import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-submit-button',
  standalone: true,
  imports: [CommonModule, IonicModule],
  template: `
    <ion-button
      [expand]="expand"
      [type]="type"
      [disabled]="disabled"
      [class]="buttonClass"
    >
      @if (isLoading) {
      <ion-spinner [name]="spinnerName"></ion-spinner>
      } @else {
      <ng-content></ng-content>
      }
    </ion-button>
  `,
  styles: [
    `
      ion-spinner {
        width: 20px;
        height: 20px;
      }
    `,
  ],
})
export class SubmitButtonComponent {
  @Input() isLoading = false;
  @Input() disabled = false;
  @Input() expand: 'block' | 'full' = 'block';
  @Input() type: 'submit' | 'button' = 'submit';
  @Input() buttonClass = '';
  @Input() spinnerName: string = '';
}
