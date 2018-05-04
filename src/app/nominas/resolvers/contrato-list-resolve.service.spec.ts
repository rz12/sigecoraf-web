import { TestBed, inject } from '@angular/core/testing';

import { ContratoListResolveService } from './contrato-list-resolve.service';

describe('ContratoListResolveService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ContratoListResolveService]
    });
  });

  it('should be created', inject([ContratoListResolveService], (service: ContratoListResolveService) => {
    expect(service).toBeTruthy();
  }));
});
