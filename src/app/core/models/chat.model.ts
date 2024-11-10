import { User } from './user.model';

export interface Conversation {
  roomId: string;
  participants: Partial<User>[];
  lastMessage: string;
}
