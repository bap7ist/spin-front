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
            children: [
              {
                path: '',
                loadComponent: () =>
                  import('../pages/chat/chats.page').then((m) => m.ChatsPage),
              },
              {
                path: ':id',
                loadComponent: () =>
                  import('../pages/chat/components/chat/chat.component').then(
                    (m) => m.ChatComponent
                  ),
              },
            ],
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
          {
            path: 'friend-requests',
            loadComponent: () =>
              import(
                '../pages/profile/pages/friend-requests/friend-requests.page'
              ).then((m) => m.FriendRequestsPage),
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
