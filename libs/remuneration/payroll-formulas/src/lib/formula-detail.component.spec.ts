import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormulaDetailComponent } from './formula-detail.component';

describe('FormulaDetailComponent', () => {
  let component: FormulaDetailComponent;
  let fixture: ComponentFixture<FormulaDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormulaDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormulaDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
