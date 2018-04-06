import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RolesPagoComponent } from './roles-pago.component';

describe('RolesPagoComponent', () => {
  let component: RolesPagoComponent;
  let fixture: ComponentFixture<RolesPagoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RolesPagoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RolesPagoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
