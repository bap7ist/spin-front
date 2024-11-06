import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet, iosTransitionAnimation } from '@ionic/angular/standalone';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent {
  constructor() {}

  protected iosTransitionAnimation = iosTransitionAnimation;
}
