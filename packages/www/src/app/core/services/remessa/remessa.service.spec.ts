import { TestBed, inject } from '@angular/core/testing';

import { RemessaService } from './remessa.service';

describe('RemessaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RemessaService]
    });
  });

  it('should be created', inject([RemessaService], (service: RemessaService) => {
    expect(service).toBeTruthy();
  }));
});
