import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';
import { HttpService } from './http.service';
import { Conversation } from '../models/chat.model';
import { Message, SendMessage } from '../models/message.model';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  constructor(private socket: Socket, private http: HttpService) {}

  private apiUrl = '/messages';

  sendMessage(message: SendMessage): void {
    this.socket.emit('sendMessage', message);
  }

  getNewMessage$(): Observable<Message> {
    return this.socket.fromEvent<Message>('newMessage');
  }

  getConversations$(): Observable<Conversation[]> {
    return this.http.get<Conversation[]>(`${this.apiUrl}/conversations`);
  }

  getMessagesByRoomId$(roomId: string): Observable<Message[]> {
    return this.http.get<Message[]>(`${this.apiUrl}/room/${roomId}`);
  }
}
