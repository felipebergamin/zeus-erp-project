import { TestBed, inject } from '@angular/core/testing';

import { RetornoService } from './retorno.service';

describe('RetornoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RetornoService]
    });
  });

  it('should be created', inject([RetornoService], (service: RetornoService) => {
    expect(service).toBeTruthy();
  }));
});
