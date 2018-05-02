import { TestBed, inject } from '@angular/core/testing';

import { ConsolidadoRolPagoListResolveService } from './consolidado-rol-pago-list-resolve.service';

describe('ConsolidadoRolPagoListResolveService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ConsolidadoRolPagoListResolveService]
    });
  });

  it('should be created', inject([ConsolidadoRolPagoListResolveService], (service: ConsolidadoRolPagoListResolveService) => {
    expect(service).toBeTruthy();
  }));
});
