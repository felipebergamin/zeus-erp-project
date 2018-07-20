import { TestBed, inject } from '@angular/core/testing';

import { PontoAcessoService } from './ponto-acesso.service';

describe('PontoAcessoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PontoAcessoService]
    });
  });

  it('should be created', inject([PontoAcessoService], (service: PontoAcessoService) => {
    expect(service).toBeTruthy();
  }));
});
