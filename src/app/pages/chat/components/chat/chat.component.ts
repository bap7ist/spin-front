import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonInput,
  IonButtons,
  IonIcon,
  IonFooter,
  IonButton,
  IonAvatar,
  IonLabel,
  IonTextarea,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  chevronBackOutline,
  send,
  sendOutline,
  thumbsUpSharp,
} from 'ionicons/icons';
import { EMPTY, of, switchMap, tap, forkJoin, iif } from 'rxjs';
import { Message, SendMessage } from 'src/app/core/models/message.model';
import { User } from 'src/app/core/models/user.model';
import { ChatService } from 'src/app/core/services/chat.service';
import { UserService } from 'src/app/core/services/user.service';
import { UserStore } from 'src/app/core/stores/user.store';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
  standalone: true,
  imports: [
    IonLabel,
    IonAvatar,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonIcon,
    IonContent,
    IonList,
    IonItem,
    IonInput,
    IonButtons,
    IonFooter,
    IonButton,
    ReactiveFormsModule,
    IonTextarea,
    DatePipe,
  ],
})
export class ChatComponent implements OnInit {
  public chatForm: FormGroup;
  public messages: Message[] = [];

  public friend: User | null = null;

  public currentUser: User | null = null;

  public roomId: string;

  public constructor(
    private router: Router,
    private chatService: ChatService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private userService: UserService,
    private userStore: UserStore
  ) {
    addIcons({ chevronBackOutline, sendOutline, send, thumbsUpSharp });
  }

  ngOnInit() {
    this._initForm();
    this.currentUser = this.userStore.getUser();
    this.route.paramMap
      .pipe(
        switchMap((params) => {
          this.roomId = params.get('roomId') || '';
          if (this.roomId !== '') {
            const messages$ = this.chatService.getMessagesByRoomId$(
              this.roomId
            );
            const friend = this.userStore.getFriend();
            if (friend) {
              this.friend = friend;
            }
            // Condition pour appeler getUserById$
            const shouldFetchUser = this.friend === null;
            const user$ = iif(
              () => shouldFetchUser,
              this.userService.getUserById$(this._getFriendId()),
              of(null)
            );

            return forkJoin({ messages: messages$, user: user$ }).pipe(
              tap(({ messages, user }) => {
                this.messages = messages;
                if (user) {
                  this.friend = user; // Assurez-vous d'avoir une propriété `user` dans votre composant
                }
              })
            );
          } else {
            console.error('Room ID is null');
            return EMPTY;
          }
        })
      )
      .subscribe();

    this.chatService.getNewMessage$().subscribe((message) => {
      this.messages.push(message);
    });
  }

  private _getFriendId(): string {
    const currentUserId = this.currentUser?.id;
    const [firstId, secondId] = this.roomId.split('-');

    return firstId === currentUserId ? secondId : firstId;
  }

  private _initForm() {
    this.chatForm = this.fb.group({
      message: [''],
    });
  }

  public sendThumbsUp() {
    this._sendMessage('👍');
  }

  private _sendMessage(message: string) {
    const senderId = this.userStore.getUser()?.id;
    const receiverId = this.friend?.id;
    if (!senderId || !receiverId) return;
    const sendMessage: SendMessage = {
      id: '',
      senderId: senderId,
      receiverId: receiverId,
      content: message,
    };
    this.chatService.sendMessage(sendMessage);
    console.log('Message envoyé:', sendMessage);
  }

  public onSubmit() {
    const message = this.chatForm.get('message')?.value;
    if (!message) return;
    this._sendMessage(message);
    this.chatForm.reset();
  }

  public goBack(): void {
    this.router.navigate(['/tabs/feed/chat']);
  }
}
