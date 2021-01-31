import { TestBed, inject } from '@angular/core/testing';

import { BoletoService } from './boleto.service';

describe('BoletoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BoletoService]
    });
  });

  it('should be created', inject([BoletoService], (service: BoletoService) => {
    expect(service).toBeTruthy();
  }));
});
