import { TestBed, inject } from '@angular/core/testing';

import { EstructuraDetalleRolService } from './estructura-detalle-rol.service';

describe('EstructuraDetalleRolService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EstructuraDetalleRolService]
    });
  });

  it('should be created', inject([EstructuraDetalleRolService], (service: EstructuraDetalleRolService) => {
    expect(service).toBeTruthy();
  }));
});
