import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleRolPagoDetailComponent } from './detalle-rol-pago-detail.component';

describe('DetalleRolPagoDetailComponent', () => {
  let component: DetalleRolPagoDetailComponent;
  let fixture: ComponentFixture<DetalleRolPagoDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalleRolPagoDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleRolPagoDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
