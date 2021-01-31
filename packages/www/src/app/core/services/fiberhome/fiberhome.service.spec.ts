import { TestBed, inject } from '@angular/core/testing';

import { FiberhomeService } from './fiberhome.service';

describe('FiberhomeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FiberhomeService]
    });
  });

  it('should be created', inject([FiberhomeService], (service: FiberhomeService) => {
    expect(service).toBeTruthy();
  }));
});
