import { TestBed, inject } from '@angular/core/testing';

import { ProblemaChamadoService } from './problema-chamado.service';

describe('ProblemaChamadoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProblemaChamadoService]
    });
  });

  it('should be created', inject([ProblemaChamadoService], (service: ProblemaChamadoService) => {
    expect(service).toBeTruthy();
  }));
});
