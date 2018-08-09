import { TestBed, inject } from '@angular/core/testing';

import { ChamadoService } from './chamado.service';

describe('ChamadoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ChamadoService]
    });
  });

  it('should be created', inject([ChamadoService], (service: ChamadoService) => {
    expect(service).toBeTruthy();
  }));
});
