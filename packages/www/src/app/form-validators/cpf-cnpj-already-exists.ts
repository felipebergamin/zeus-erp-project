import { AbstractControl, ValidationErrors, ValidatorFn, AsyncValidatorFn } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ClienteService } from '../core/services/cliente/cliente.service';
let timeout;

export function CpfCnpjAlreadyExists(clienteService: ClienteService): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    if (timeout) {
      console.log('limpando timeout');
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => console.log('timeout'), 2000);
    console.log('async validator');
    const cpfCnpj = control.value;

    return clienteService.cpfCnpjAlreadyExists(cpfCnpj)
      .pipe(
        map(res => {
          console.log(res);
          return res ? { alreadyExists: true } : null;
        })
      );
  };
}
