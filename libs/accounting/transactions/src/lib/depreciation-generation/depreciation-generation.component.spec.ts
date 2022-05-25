import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepreciationGenerationComponent } from './depreciation-generation.component';

describe('DepreciationGenerationComponent', () => {
  let component: DepreciationGenerationComponent;
  let fixture: ComponentFixture<DepreciationGenerationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DepreciationGenerationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DepreciationGenerationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
