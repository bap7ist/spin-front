import { Component, DestroyRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonIcon,
  IonChip,
  IonLabel,
  ToastController,
  IonButtons,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  chevronBackOutline,
  football,
  basketball,
  tennisball,
  film,
  musicalNotes,
  restaurant,
  pizza,
  wine,
  airplane,
  walk,
} from 'ionicons/icons';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { UserService } from 'src/app/core/services/user.service';

interface Interest {
  id: string;
  name: string;
  icon?: string;
  category: 'sports' | 'culture' | 'music' | 'food' | 'travel' | 'other';
}

@Component({
  selector: 'app-interests',
  templateUrl: './interests.page.html',
  styleUrls: ['./interests.page.scss'],
  standalone: true,
  imports: [
    IonButtons,
    CommonModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButton,
    IonIcon,
    IonChip,
    IonLabel,
  ],
})
export class InterestsPage {
  availableInterests: Interest[] = [
    { id: '1', name: 'Football', icon: 'football', category: 'sports' },
    { id: '2', name: 'Basketball', icon: 'basketball', category: 'sports' },
    { id: '3', name: 'Tennis', icon: 'tennisball', category: 'sports' },
    { id: '4', name: 'Cinéma', icon: 'film', category: 'culture' },
    { id: '5', name: 'Théâtre', icon: 'theater-masks', category: 'culture' },
    { id: '6', name: 'Musées', icon: 'museum', category: 'culture' },
    { id: '7', name: 'Rock', icon: 'musical-notes', category: 'music' },
    { id: '8', name: 'Jazz', icon: 'guitar', category: 'music' },
    { id: '9', name: 'Classique', icon: 'piano', category: 'music' },
    { id: '10', name: 'Cuisine', icon: 'restaurant', category: 'food' },
    { id: '11', name: 'Pâtisserie', icon: 'pizza', category: 'food' },
    { id: '12', name: 'Vin', icon: 'wine', category: 'food' },
    { id: '13', name: 'Voyage', icon: 'airplane', category: 'travel' },
    { id: '14', name: 'Randonnée', icon: 'walk', category: 'travel' },
    { id: '15', name: 'Camping', icon: 'tent', category: 'travel' },
  ];

  selectedInterests: Set<string> = new Set();
  categories = ['sports', 'culture', 'music', 'food', 'travel'];

  constructor(
    private readonly destroyRef: DestroyRef,
    private readonly userService: UserService,
    private readonly toastController: ToastController,
    private readonly router: Router
  ) {
    addIcons({
      chevronBackOutline,
      football,
      basketball,
      tennisball,
      film,
      musicalNotes,
      restaurant,
      pizza,
      wine,
      airplane,
      walk,
    });
    this.loadUserInterests();
  }

  private loadUserInterests(): void {
    this.userService
      .getCurrentUser()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((user) => {
        if (user?.interests) {
          this.selectedInterests = new Set(user.interests);
        }
      });
  }

  toggleInterest(interestId: string): void {
    if (this.selectedInterests.has(interestId)) {
      this.selectedInterests.delete(interestId);
    } else {
      this.selectedInterests.add(interestId);
    }
  }

  isSelected(interestId: string): boolean {
    return this.selectedInterests.has(interestId);
  }

  getInterestsByCategory(category: string): Interest[] {
    return this.availableInterests.filter(
      (interest) => interest.category === category
    );
  }

  saveInterests(): void {
    this.userService
      .updateInterests(Array.from(this.selectedInterests))
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          this.showToast("Centres d'intérêt mis à jour", 'success');
          this.router.navigate(['/tabs/profile']);
        },
        error: () => {
          this.showToast('Erreur lors de la mise à jour', 'danger');
        },
      });
  }

  private async showToast(
    message: string,
    color: 'success' | 'danger'
  ): Promise<void> {
    const toast = await this.toastController.create({
      message,
      duration: 3000,
      color,
      position: 'bottom',
    });
    await toast.present();
  }

  goBack(): void {
    this.router.navigate(['/tabs/profile']);
  }
}
