import { AbstractControl, ValidationErrors, ValidatorFn, AsyncValidatorFn } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ClienteService } from '../core/services/cliente/cliente.service';

export function CpfCnpjAlreadyExists(clienteService: ClienteService): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    const cpfCnpj = control.value;

    return clienteService.cpfCnpjAlreadyExists(cpfCnpj)
      .pipe(map(res => res ? { alreadyExists: true } : null));
  };
}
