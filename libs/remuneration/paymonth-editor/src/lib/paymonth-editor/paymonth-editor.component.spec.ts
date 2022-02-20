import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymonthEditorComponent } from './paymonth-editor.component';

describe('PaymonthEditorComponent', () => {
  let component: PaymonthEditorComponent;
  let fixture: ComponentFixture<PaymonthEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymonthEditorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymonthEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
