import { Routes } from '@angular/router';
import { UserResolver } from '../core/resolvers/user.resolver';
import { TabsComponent } from './tabs.component';

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
        children: [
          {
            path: '',
            loadComponent: () =>
              import('../pages/feed/feed.page').then((m) => m.FeedPage),
          },
          {
            path: 'chat',
            loadComponent: () =>
              import('../pages/chat/chat.page').then((m) => m.ChatPage),
          },
        ],
      },
      {
        path: 'swipe',
        loadComponent: () =>
          import('../pages/swipe/swipe.page').then((m) => m.SwipePage),
      },
      {
        path: 'profile',
        children: [
          {
            path: '',
            loadComponent: () =>
              import('../pages/profile/profile.page').then(
                (m) => m.ProfilePage
              ),
          },
          {
            path: 'personal-info',
            loadComponent: () =>
              import(
                '../pages/profile/pages/personal-info/personal-info.page'
              ).then((m) => m.PersonalInfoPage),
          },
          {
            path: 'interests',
            loadComponent: () =>
              import('../pages/profile/pages/interests/interests.page').then(
                (m) => m.InterestsPage
              ),
          },
        ],
      },
      {
        path: '',
        redirectTo: '/tabs/feed',
        pathMatch: 'full',
      },
    ],
  },
];
