import { AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';

export function valueIn(options: any[]): ValidatorFn {

  return (control: AbstractControl): ValidationErrors | null => {
    return options.some((val) => val === control.value) ?
      null :
      { invalid: true };
  };
}
