import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallesRolPagoComponent } from './detalles-rol-pago.component';

describe('DetallesRolPagoComponent', () => {
  let component: DetallesRolPagoComponent;
  let fixture: ComponentFixture<DetallesRolPagoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetallesRolPagoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetallesRolPagoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
