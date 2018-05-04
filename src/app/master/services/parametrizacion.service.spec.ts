import { TestBed, inject } from '@angular/core/testing';

import { ParametrizacionService } from './parametrizacion.service';

describe('ParametrizacionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ParametrizacionService]
    });
  });

  it('should be created', inject([ParametrizacionService], (service: ParametrizacionService) => {
    expect(service).toBeTruthy();
  }));
});
