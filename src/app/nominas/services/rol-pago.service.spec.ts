import { TestBed, inject } from '@angular/core/testing';

import { RolPagoService } from './rol-pago.service';

describe('RolPagoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RolPagoService]
    });
  });

  it('should be created', inject([RolPagoService], (service: RolPagoService) => {
    expect(service).toBeTruthy();
  }));
});
