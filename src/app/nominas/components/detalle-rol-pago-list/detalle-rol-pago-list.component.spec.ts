import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleRolPagoListComponent } from './detalle-rol-pago-list.component';

describe('DetalleRolPagoListComponent', () => {
  let component: DetalleRolPagoListComponent;
  let fixture: ComponentFixture<DetalleRolPagoListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalleRolPagoListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleRolPagoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
