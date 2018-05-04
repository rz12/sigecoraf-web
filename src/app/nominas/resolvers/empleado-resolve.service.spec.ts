import { TestBed, inject } from '@angular/core/testing';

import { EmpleadoResolveService } from './empleado-resolve.service';

describe('EmpleadoResolveService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EmpleadoResolveService]
    });
  });

  it('should be created', inject([EmpleadoResolveService], (service: EmpleadoResolveService) => {
    expect(service).toBeTruthy();
  }));
});
