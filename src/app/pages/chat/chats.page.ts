import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonSearchbar,
  IonContent,
  IonButton,
  IonItemOptions,
  IonIcon,
  IonList,
  IonItem,
  IonLabel,
  IonAvatar,
  IonItemSliding,
  IonItemOption,
  IonButtons,
  IonModal,
  IonText,
} from '@ionic/angular/standalone';
import { Router, RouterModule } from '@angular/router';
import { addIcons } from 'ionicons';
import { chevronBackOutline, trashOutline, addOutline } from 'ionicons/icons';
import { ChatService } from 'src/app/core/services/chat.service';
import { catchError, EMPTY, tap } from 'rxjs';
import { Conversation } from 'src/app/core/models/chat.model';
import { FriendService } from 'src/app/core/services/friend.service';
import { UserStore } from 'src/app/core/stores/user.store';
import { User } from 'src/app/core/models/user.model';

@Component({
  selector: 'app-chat',
  standalone: true,
  templateUrl: './chats.page.html',
  styleUrls: ['./chats.page.scss'],
  imports: [
    IonText,
    IonModal,
    CommonModule,
    IonHeader,
    IonToolbar,
    IonButtons,
    IonTitle,
    IonContent,
    IonItemOptions,
    IonSearchbar,
    RouterModule,
    IonButton,
    IonIcon,
    IonList,
    IonItem,
    IonLabel,
    IonItemSliding,
    IonItemOption,
    IonAvatar,
  ],
})
export class ChatsPage implements OnInit {
  filteredConversations: Conversation[] = [];
  searchTerm: string = '';
  public friends: User[] = [];

  public isModalOpen = false;

  public constructor(
    private router: Router,
    private chatService: ChatService,
    private friendService: FriendService,
    private userStore: UserStore
  ) {
    addIcons({ chevronBackOutline, addOutline, trashOutline });
  }

  ngOnInit() {
    this._loadConversations();
    this._loadFriends();
  }

  onFriendSearch(event: any) {
    const query = event.target.value.toLowerCase();
    // Logic to search friends based on the query
  }

  createConversation(friend: User) {
    console.log('friend', friend);
    
    this._saveFriendInfo(friend);
    const roomId = `${this.userStore.getUser()?.id}-${friend.id}`;
    this.router.navigate(['tabs/feed/chat', roomId]);
  }

  createNewMessage() {
    this.router.navigate(['tabs/feed/chat/new']);
  }

  private _loadFriends() {
    const user = this.userStore.getUser();
    if (user?.id) {
      this.friendService
        .getFriends$(user.id)
        .pipe(tap((friends) => (this.friends = friends)))
        .subscribe();
    }
  }

  private _loadConversations() {
    this.chatService
      .getConversations$()
      .pipe(
        tap((conversations) => (this.filteredConversations = conversations)),
        catchError((error) => {
          console.error('Error loading conversations', error);
          return EMPTY;
        })
      )
      .subscribe();
  }

  onSearchInput(event: any) {
    const term = event.target.value.toLowerCase();
    this.filteredConversations = this.filteredConversations.filter(
      (conversation) =>
        conversation.participants[0]?.profile?.lastName
          ?.toLowerCase()
          .includes(term) ||
        conversation.lastMessage?.toLowerCase().includes(term)
    );
  }

  openChat(conversationId: string) {
    const friend = this.friends.find(
      (friend) => friend.id === conversationId.split('-')[1]
    );
    if (friend) {
      this._saveFriendInfo(friend);
    }
    this.router.navigate(['tabs/feed/chat', conversationId]);
  }

  private _saveFriendInfo(friend: User) {
    this.userStore.setFriend(friend);
  }

  deleteConversation(conversationId: string) {
    this.filteredConversations = this.filteredConversations.filter(
      (conversation) => conversation.roomId !== conversationId
    );
    this.filteredConversations = this.filteredConversations.filter(
      (conversation) => conversation.roomId !== conversationId
    );
  }

  public goBack(): void {
    this.router.navigate(['tabs/feed']);
  }
}
