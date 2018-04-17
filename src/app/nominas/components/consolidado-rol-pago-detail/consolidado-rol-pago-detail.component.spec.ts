import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsolidadoRolPagoDetailComponent } from './consolidado-rol-pago-detail.component';

describe('ConsolidadoRolPagoDetailComponent', () => {
  let component: ConsolidadoRolPagoDetailComponent;
  let fixture: ComponentFixture<ConsolidadoRolPagoDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsolidadoRolPagoDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsolidadoRolPagoDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
