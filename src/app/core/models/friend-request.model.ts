import { User } from "./user.model";

export class FriendRequest {
  id: string;
  senderId: string;
  receiverId: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export class FriendRequestProfile {
  request: FriendRequest;
  profile: Partial<User>;
}
