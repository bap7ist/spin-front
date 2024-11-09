import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonButtons,
  IonIcon,
  IonCol,
  IonList,
  IonLabel,
  IonRefresher,
  IonRefresherContent,
  IonCardContent,
  IonGrid,
  IonCard,
  IonItem,
  IonAvatar,
  IonText,
  IonRow,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { chevronBackOutline } from 'ionicons/icons';
import { catchError, EMPTY, finalize, take } from 'rxjs';
import { FriendRequestProfile } from 'src/app/core/models/friend-request.model';
import { User } from 'src/app/core/models/user.model';
import { FriendService } from 'src/app/core/services/friend.service';

@Component({
  selector: 'app-friend-requests',
  templateUrl: './friend-requests.page.html',
  styleUrls: ['./friend-requests.page.scss'],
  standalone: true,
  imports: [
    IonRow,
    IonText,
    IonButtons,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonList,
    IonCard,
    IonCardContent,
    IonLabel,
    IonItem,
    IonGrid,
    IonCol,
    IonAvatar,
    IonContent,
    IonButton,
    IonRefresher,
    IonRefresherContent,
    IonIcon,
  ],
})
export class FriendRequestsPage implements OnInit {
  public friendRequests: FriendRequestProfile[] = [];

  constructor(private router: Router, private friendService: FriendService) {
    addIcons({ chevronBackOutline });
  }

  ngOnInit() {
    this.friendService
      .getFriendRequestsProfile$()
      .pipe(take(1))
      .subscribe((data) => {
        this.friendRequests = data;
      });
  }

  refresh(event: any) {
    this.friendService
      .getFriendRequestsProfile$()
      .pipe(
        take(1),
        catchError(() => {
          return EMPTY;
        }),
        finalize(() => {
          event.target.complete();
        })
      )
      .subscribe((data) => {
        this.friendRequests = data;
      });
  }

  goBack() {
    this.router.navigate(['/tabs/profile']);
  }

  acceptRequest(id: string) {
    this.friendRequests.splice(
      this.friendRequests.findIndex((request) => request.request.id === id),
      1
    );
    this.friendService.acceptFriendRequest(id).subscribe();
  }

  rejectRequest(id: string) {
    this.friendRequests.splice(
      this.friendRequests.findIndex((request) => request.request.id === id),
      1
    );
    this.friendService.rejectFriendRequest(id).subscribe();
  }
}
