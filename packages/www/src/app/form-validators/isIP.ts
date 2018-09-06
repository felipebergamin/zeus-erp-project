import { AbstractControl, ValidationErrors } from '@angular/forms';
import { isIP } from 'validator';

export function isValidIPAddress(control: AbstractControl): ValidationErrors | null {
  if (!control.value) {
    return null;
  }

  if (isIP(control.value, 4) || isIP(control.value, 6)) {
    return null;
  }

  return { invalid: true };
}
