import { TestBed, inject } from '@angular/core/testing';

import { CargoListResolveService } from './cargo-list-resolve.service';

describe('CargoListResolveService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CargoListResolveService]
    });
  });

  it('should be created', inject([CargoListResolveService], (service: CargoListResolveService) => {
    expect(service).toBeTruthy();
  }));
});
