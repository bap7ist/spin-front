import { Routes } from '@angular/router';
import { TabsComponent } from './tabs.component';
import { UserResolver } from '../core/resolvers/user.resolver';

export const routes: Routes = [
  {
    path: '',
    component: TabsComponent,
    resolve: {
      user: UserResolver,
    },
    children: [
      {
        path: 'feed',
        loadComponent: () => import('../pages/feed/feed.page').then(m => m.FeedPage)
      },
      {
        path: 'swipe',
        loadComponent: () => import('../pages/swipe/swipe.page').then(m => m.SwipePage)
      },
      {
        path: 'profile',
        loadComponent: () => import('../pages/profile/profile.page').then(m => m.ProfilePage)
      },
      {
        path: '',
        redirectTo: '/tabs/feed',
        pathMatch: 'full'
      }
    ]
  }
]; 