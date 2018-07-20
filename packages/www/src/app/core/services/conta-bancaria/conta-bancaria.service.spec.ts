import { TestBed, inject } from '@angular/core/testing';

import { ContaBancariaService } from './conta-bancaria.service';

describe('ContaBancariaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ContaBancariaService]
    });
  });

  it('should be created', inject([ContaBancariaService], (service: ContaBancariaService) => {
    expect(service).toBeTruthy();
  }));
});
