import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CargosAutcompleteComponent } from './cargos-autcomplete.component';

describe('CargosAutcompleteComponent', () => {
  let component: CargosAutcompleteComponent;
  let fixture: ComponentFixture<CargosAutcompleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CargosAutcompleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CargosAutcompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
