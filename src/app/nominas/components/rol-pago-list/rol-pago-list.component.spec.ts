import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RolPagoListComponent } from './rol-pago-list.component';

describe('RolPagoListComponent', () => {
  let component: RolPagoListComponent;
  let fixture: ComponentFixture<RolPagoListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RolPagoListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RolPagoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
