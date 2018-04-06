import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CargoDetailComponent } from './cargo-detail.component';

describe('CargoDetailComponent', () => {
  let component: CargoDetailComponent;
  let fixture: ComponentFixture<CargoDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CargoDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CargoDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
