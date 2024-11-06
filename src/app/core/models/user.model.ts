export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  avatar?: string;
  phoneNumber?: string;
  birthDate?: Date;
  address?: string;
  interests?: string[];
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

// Interface pour les intérêts
export interface Interest {
  id: string;
  name: string;
  icon?: string;
  category: InterestCategory;
}

// Type pour les catégories d'intérêts
export type InterestCategory = 'sports' | 'culture' | 'music' | 'food' | 'travel' | 'other';
