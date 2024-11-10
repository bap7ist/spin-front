import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable, take } from 'rxjs';
import { HttpService } from './http.service';
import { Conversation } from '../models/chat.model';
import { Message, SendMessage } from '../models/message.model';
import { UserStore } from '../stores/user.store';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  constructor(
    private socket: Socket,
    private http: HttpService,
    private userStore: UserStore
  ) {}

  private apiUrl = '/messages';

  sendMessage(message: SendMessage): void {
    this.socket.emit('sendMessage', message);
    this.http.post<Message>(`${this.apiUrl}`, message).pipe(take(1)).subscribe();
  }

  getNewMessage$(): Observable<Message> {
    return this.socket.fromEvent<Message>('newMessage');
  }

  getConversations$(): Observable<Conversation[]> {
    return this.http.get<Conversation[]>(
      `${this.apiUrl}/conversations/${this.userStore.getUser()?.id}`
    );
  }

  getMessagesByRoomId$(roomId: string): Observable<Message[]> {
    return this.http.get<Message[]>(`${this.apiUrl}/room/${roomId}`);
  }
}
