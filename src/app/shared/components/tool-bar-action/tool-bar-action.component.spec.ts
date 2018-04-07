import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolBarAcctionComponent } from './tool-bar-acction.component';

describe('ToolBarAcctionComponent', () => {
  let component: ToolBarAcctionComponent;
  let fixture: ComponentFixture<ToolBarAcctionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToolBarAcctionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolBarAcctionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
