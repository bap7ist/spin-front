import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonList,
  IonCardTitle,
  IonCardContent,
  IonAvatar,
  IonLabel,
  IonCard,
  IonItem,
  IonToolbar,
  IonCardHeader,
} from '@ionic/angular/standalone';
import { UserService } from 'src/app/core/services/user.service';
import { User } from 'src/app/core/models/user.model';
import { FriendService } from 'src/app/core/services/friend.service';

@Component({
  selector: 'app-swipe',
  templateUrl: './swipe.page.html',
  styleUrls: ['./swipe.page.scss'],
  standalone: true,
  imports: [
    IonCardHeader,
    IonContent,
    IonHeader,
    IonAvatar,
    IonLabel,
    IonItem,
    IonTitle,
    IonList,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonToolbar,
    CommonModule,
    FormsModule,
  ],
})
export class SwipePage implements OnInit {
  public users: User[] = [];

  constructor(
    private userService: UserService,
    private friendService: FriendService
  ) {}

  ngOnInit() {
    this.userService.getUsers$().subscribe((users) => {
      this.users = users;
    });
  }

  friendRequest(id: string) {
    this.friendService.sendFriendRequest(id).subscribe((friendRequest) => {
      console.log(friendRequest);
    });
  }
}
