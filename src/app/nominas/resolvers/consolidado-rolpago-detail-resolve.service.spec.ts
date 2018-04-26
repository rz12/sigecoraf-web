import { TestBed, inject } from '@angular/core/testing';

import { ConsolidadoRolpagoDetailResolveService } from './consolidado-rolpago-detail-resolve.service';

describe('ConsolidadoRolpagoDetailResolveService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ConsolidadoRolpagoDetailResolveService]
    });
  });

  it('should be created', inject([ConsolidadoRolpagoDetailResolveService], (service: ConsolidadoRolpagoDetailResolveService) => {
    expect(service).toBeTruthy();
  }));
});
