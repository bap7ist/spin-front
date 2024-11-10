import { animate, style, transition, trigger } from '@angular/animations';

export const slideInFromTop = trigger('slideInFromTop', [
  transition(':enter', [
    style({ transform: 'translateY(-100%)' }),
    animate('0.3s ease-in-out'),
  ]),
]);
