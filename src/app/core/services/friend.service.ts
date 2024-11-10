import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  FriendRequest,
  FriendRequestProfile,
} from '../models/friend-request.model';
import { User } from '../models/user.model';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root',
})
export class FriendService {
  private apiUrl = '/friends'; // Remplacez par l'URL de votre API

  constructor(private http: HttpService) {}

  // Envoyer une demande d'ami
  sendFriendRequest$(receiverId: string): Observable<FriendRequest> {
    return this.http.post<FriendRequest>(`${this.apiUrl}/request`, {
      receiverId,
    });
  }

  // Accepter une demande d'ami
  acceptFriendRequest$(requestId: string): Observable<FriendRequest> {
    return this.http.patch<FriendRequest>(
      `${this.apiUrl}/request/${requestId}/accept`,
      {}
    );
  }

  // Refuser une demande d'ami
  rejectFriendRequest$(requestId: string): Observable<FriendRequest> {
    return this.http.patch<FriendRequest>(
      `${this.apiUrl}/request/${requestId}/reject`,
      {}
    );
  }

  // Obtenir la liste des demandes d'amis
  getFriendRequestsProfile$(): Observable<FriendRequestProfile[]> {
    return this.http.get<FriendRequestProfile[]>(
      `${this.apiUrl}/requests/profiles`
    );
  }

  // Obtenir la liste des amis d'un utilisateur
  getFriends$(userId: string): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/${userId}/friends`);
  }
}
