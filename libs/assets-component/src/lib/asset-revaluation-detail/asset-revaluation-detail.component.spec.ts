import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetRevaluationDetailComponent } from './asset-revaluation-detail.component';

describe('AssetRevaluationDetailComponent', () => {
  let component: AssetRevaluationDetailComponent;
  let fixture: ComponentFixture<AssetRevaluationDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssetRevaluationDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetRevaluationDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
