import { TestBed, inject } from '@angular/core/testing';

import { CatalogoResolveService } from './catalogo-resolve.service';

describe('CatalogoResolveService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CatalogoResolveService]
    });
  });

  it('should be created', inject([CatalogoResolveService], (service: CatalogoResolveService) => {
    expect(service).toBeTruthy();
  }));
});
