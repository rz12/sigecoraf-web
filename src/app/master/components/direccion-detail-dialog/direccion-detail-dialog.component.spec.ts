import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DireccionDetailDialogComponent } from './direccion-detail-dialog.component';

describe('DireccionDetailDialogComponent', () => {
  let component: DireccionDetailDialogComponent;
  let fixture: ComponentFixture<DireccionDetailDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DireccionDetailDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DireccionDetailDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
