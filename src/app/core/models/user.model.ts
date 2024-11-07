import { GradientOption } from "../services/gradient.service";
import { Interest } from "./interest.model";

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  avatar?: string;
  phoneNumber?: string;
  birthDate?: Date;
  address?: string;
  interests?: Interest[];
  gradient?: GradientOption;
  createdAt: Date;
  updatedAt: Date;
}

// Optionnel : Interface pour les mises à jour
export interface UserUpdate {
  firstName?: string;
  lastName?: string;
  email?: string;
  phoneNumber?: string;
  birthDate?: Date;
  address?: string;
  interests?: string[];
}
