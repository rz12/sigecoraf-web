import { TestBed, inject } from '@angular/core/testing';

import { ContratoDetailResolveService } from './contrato-detail-resolve.service';

describe('ContratoDetailResolveService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ContratoDetailResolveService]
    });
  });

  it('should be created', inject([ContratoDetailResolveService], (service: ContratoDetailResolveService) => {
    expect(service).toBeTruthy();
  }));
});
