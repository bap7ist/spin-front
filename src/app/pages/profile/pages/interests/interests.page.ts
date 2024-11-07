import { Component, DestroyRef, OnInit, HostListener } from '@angular/core';
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
  IonButtons,
  IonSpinner, IonFooter } from '@ionic/angular/standalone';
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
  walk, checkmark } from 'ionicons/icons';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { UserService } from 'src/app/core/services/user.service';
import { InterestsService } from 'src/app/core/services/interests.service';
import { Interest } from 'src/app/core/models/interest.model';
import { catchError, finalize, switchMap, tap } from 'rxjs';
import { UserStore } from 'src/app/core/stores/user.store';
import { ToastService } from 'src/app/core/services/toast.service';
import { SubmitButtonComponent } from "../../../../components/submit-button/submit-button.component";

@Component({
  selector: 'app-interests',
  templateUrl: './interests.page.html',
  styleUrls: ['./interests.page.scss'],
  standalone: true,
  imports: [IonFooter,
    IonSpinner,
    IonButtons,
    CommonModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButton,
    IonIcon,
    IonChip,
    IonLabel, SubmitButtonComponent],
})
export class InterestsPage implements OnInit {
  allInterests: Interest[] = [];
  selectedInterests: Interest[] = [];
  categories: string[] = [];

  public isSaving = false;
  isButtonVisible = true;

  constructor(
    private readonly destroyRef: DestroyRef,
    private readonly userService: UserService,
    private readonly userStore: UserStore,
    private readonly router: Router,
    private readonly interestsService: InterestsService,
    private readonly toastService: ToastService
  ) {
    addIcons({chevronBackOutline,checkmark,football,basketball,tennisball,film,musicalNotes,restaurant,pizza,wine,airplane,walk,});
  }

  public ngOnInit(): void {
    this.loadAllInterests();
    this._loadUserInterests();
  }

  private loadAllInterests(): void {
    this.interestsService
      .fetchAllInterests$()
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        tap((interests) => {
          this.allInterests = interests;
          this.categories = [...new Set(interests.map(interest => interest.category))];
        })
      )
      .subscribe();
  }

  private _loadUserInterests(): void {
    this.selectedInterests = this.userStore.getUser()?.interests ?? [];
  }

  public isSelected(interestName: string): boolean {
    return this.selectedInterests.some(
      (interest) => interest.name === interestName
    );
  }

  public toggleInterest(interestName: string): void {
    const interest = this.allInterests.find((i) => i.name === interestName);
    if (!interest) return;

    const index = this.selectedInterests.findIndex(
      (i) => i.name === interestName
    );
    if (index === -1) {
      this.selectedInterests.push(interest);
    } else {
      this.selectedInterests.splice(index, 1);
    }
  }

  public saveInterests(): void {
    this.isSaving = true;
    this.userService
      .updateInterests(this.selectedInterests)
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        catchError(() => this.toastService.error('Une erreur est survenue')),
        switchMap(() => this.toastService.success('Intérêts enregistrés')),
        finalize(() => this.isSaving = false)
      )
      .subscribe();
  }

  public goBack(): void {
    this.router.navigate(['/tabs/profile']);
  }

  public getInterestsByCategory(category: string): Interest[] {
    return this.allInterests.filter(interest => interest.category === category);
  }
}
