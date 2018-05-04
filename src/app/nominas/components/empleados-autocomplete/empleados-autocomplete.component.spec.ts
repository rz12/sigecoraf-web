import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpleadosAutocompleteComponent } from './empleados-autocomplete.component';

describe('EmpleadosAutocompleteComponent', () => {
  let component: EmpleadosAutocompleteComponent;
  let fixture: ComponentFixture<EmpleadosAutocompleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmpleadosAutocompleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpleadosAutocompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
