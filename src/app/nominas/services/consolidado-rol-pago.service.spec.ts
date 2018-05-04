import { TestBed, inject } from '@angular/core/testing';

import { ConsolidadoRolPagoService } from './consolidado-rol-pago.service';

describe('ConsolidadoRolPagoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ConsolidadoRolPagoService]
    });
  });

  it('should be created', inject([ConsolidadoRolPagoService], (service: ConsolidadoRolPagoService) => {
    expect(service).toBeTruthy();
  }));
});
