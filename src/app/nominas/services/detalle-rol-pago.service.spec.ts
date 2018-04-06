import { TestBed, inject } from '@angular/core/testing';

import { DetalleRolPagoService } from './detalle-rol-pago.service';

describe('DetalleRolPagoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DetalleRolPagoService]
    });
  });

  it('should be created', inject([DetalleRolPagoService], (service: DetalleRolPagoService) => {
    expect(service).toBeTruthy();
  }));
});
