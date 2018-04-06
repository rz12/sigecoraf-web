import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RolPagoDetailComponent } from './rol-pago-detail.component';

describe('RolPagoDetailComponent', () => {
  let component: RolPagoDetailComponent;
  let fixture: ComponentFixture<RolPagoDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RolPagoDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RolPagoDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
