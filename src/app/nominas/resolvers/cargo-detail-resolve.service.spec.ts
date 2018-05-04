import { TestBed, inject } from '@angular/core/testing';

import { CargoDetailResolveService } from './cargo-detail-resolve.service';

describe('CargoDetailResolveService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CargoDetailResolveService]
    });
  });

  it('should be created', inject([CargoDetailResolveService], (service: CargoDetailResolveService) => {
    expect(service).toBeTruthy();
  }));
});
