import { TestBed, inject } from '@angular/core/testing';

import { IpPoolService } from './ip-pool.service';

describe('IpPoolService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IpPoolService]
    });
  });

  it('should be created', inject([IpPoolService], (service: IpPoolService) => {
    expect(service).toBeTruthy();
  }));
});
