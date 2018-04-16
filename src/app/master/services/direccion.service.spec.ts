import { TestBed, inject } from '@angular/core/testing';

import { DireccionService } from './direccion.service';

describe('DireccionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DireccionService]
    });
  });

  it('should be created', inject([DireccionService], (service: DireccionService) => {
    expect(service).toBeTruthy();
  }));
});
