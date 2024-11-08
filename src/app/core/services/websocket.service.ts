import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { environment } from 'src/environments/environment';
import { TokenService } from './token.service';
import { Observable } from 'rxjs';
import { Message } from '../models/message.model';

@Injectable({
  providedIn: 'root',
})
export class WebSocketService extends Socket {
  constructor(private tokenService: TokenService) {
    super({
      url: environment.apiUrl,
      options: {
        transports: ['websocket'],
        auth: {
          token: tokenService.getToken(),
        },
      },
    });
  }

  sendMessage(message: Message): void {
    this.emit('message', message);
  }

  getMessages$(): Observable<Message[]> {
    return this.fromEvent<Message[]>('message');
  }

  markAsRead(messageId: string): void {
    this.emit('markAsRead', messageId);
  }
}
