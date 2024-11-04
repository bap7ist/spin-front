export interface User {
  id: string;           // Obligatoire - identifiant unique
  email: string;        // Obligatoire - email de connexion
  firstName?: string;
  lastName?: string;
  address?: string;
  phone?: string;
  birthDate?: Date;     // Changé en Date
  avatar?: string;
  createdAt: Date;      // Ajouté - timestamp de création
  updatedAt: Date;      // Ajouté - timestamp de mise à jour
}
