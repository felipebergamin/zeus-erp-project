import { TestBed, inject } from '@angular/core/testing';

import { InstalacaoService } from './instalacao.service';

describe('InstalacaoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InstalacaoService]
    });
  });

  it('should be created', inject([InstalacaoService], (service: InstalacaoService) => {
    expect(service).toBeTruthy();
  }));
});
