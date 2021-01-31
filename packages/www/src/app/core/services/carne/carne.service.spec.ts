import { TestBed, inject } from '@angular/core/testing';

import { CarneService } from './carne.service';

describe('CarneService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CarneService]
    });
  });

  it('should be created', inject([CarneService], (service: CarneService) => {
    expect(service).toBeTruthy();
  }));
});
