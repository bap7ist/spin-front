import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet, iosTransitionAnimation } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { closeOutline, close } from 'ionicons/icons';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent {
  constructor() {
    addIcons({
      'close': close,
      'close-outline': closeOutline
    });
  }

  protected iosTransitionAnimation = iosTransitionAnimation;
}
