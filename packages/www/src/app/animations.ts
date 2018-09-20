import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

export const swapComponentsWithFade = trigger('flyInOut', [
  state('in', style({ opacity: 1 })),
  state('out', style({ opacity: 0, display: 'none' })),
  transition('in => out', [
    animate('100ms ease-out', style({ opacity: 0 })),
  ]),
  transition('out => in', [
    animate('100ms 100ms ease-in', style({ opacity: 1 })),
  ]),
]);
