export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  read: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface SendMessage {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
}
