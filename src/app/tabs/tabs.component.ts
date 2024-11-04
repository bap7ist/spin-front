import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {
  IonTabs,
  IonTabBar,
  IonTabButton,
  IonIcon,
  IonAvatar,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { homeOutline, heartOutline } from 'ionicons/icons';
import { map } from 'rxjs/operators';
import { UserStore } from '../core/stores/user.store';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    IonTabs,
    IonTabBar,
    IonTabButton,
    IonIcon,
    IonAvatar,
  ],
})
export class TabsComponent {
  userPhotoUrl$ = this.userStore.user$.pipe(
    map(user => user?.avatar || 'https://ionicframework.com/docs/img/demos/avatar.svg')
  );

  constructor(private userStore: UserStore) {
    addIcons({ homeOutline, heartOutline });
  }
}
