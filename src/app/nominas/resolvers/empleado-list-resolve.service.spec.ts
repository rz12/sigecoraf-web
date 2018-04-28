import { TestBed, inject } from '@angular/core/testing';

import { EmpleadoListResolveService } from './empleado-list-resolve.service';

describe('EmpleadoListResolveService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EmpleadoListResolveService]
    });
  });

  it('should be created', inject([EmpleadoListResolveService], (service: EmpleadoListResolveService) => {
    expect(service).toBeTruthy();
  }));
});
