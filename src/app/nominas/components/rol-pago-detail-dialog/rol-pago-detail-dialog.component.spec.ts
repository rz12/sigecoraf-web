import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RolPagoDetailDialogComponent } from './rol-pago-detail-dialog.component';

describe('RolPagoDetailDialogComponent', () => {
  let component: RolPagoDetailDialogComponent;
  let fixture: ComponentFixture<RolPagoDetailDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RolPagoDetailDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RolPagoDetailDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
