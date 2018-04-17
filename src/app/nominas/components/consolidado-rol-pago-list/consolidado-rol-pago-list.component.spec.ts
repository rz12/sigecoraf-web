import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsolidadoRolPagoListComponent } from './consolidado-rol-pago-list.component';

describe('ConsolidadoRolPagoListComponent', () => {
  let component: ConsolidadoRolPagoListComponent;
  let fixture: ComponentFixture<ConsolidadoRolPagoListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsolidadoRolPagoListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsolidadoRolPagoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
