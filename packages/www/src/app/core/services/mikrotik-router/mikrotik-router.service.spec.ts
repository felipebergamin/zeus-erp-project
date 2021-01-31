import { TestBed, inject } from '@angular/core/testing';

import { MikrotikRouterService } from './mikrotik-router.service';

describe('MikrotikRouterService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MikrotikRouterService]
    });
  });

  it('should be created', inject([MikrotikRouterService], (service: MikrotikRouterService) => {
    expect(service).toBeTruthy();
  }));
});
