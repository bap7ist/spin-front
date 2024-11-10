import { User } from "./user.model";

export interface Conversation {
  roomId: string;
  participants: { id: string; profile: Partial<User> }[];
  lastMessage: string;
}
