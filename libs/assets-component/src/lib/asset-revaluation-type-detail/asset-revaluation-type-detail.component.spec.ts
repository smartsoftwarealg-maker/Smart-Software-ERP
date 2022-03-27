import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetRevaluationTypeDetailComponent } from './asset-revaluation-type-detail.component';

describe('AssetRevaluationTypeDetailComponent', () => {
  let component: AssetRevaluationTypeDetailComponent;
  let fixture: ComponentFixture<AssetRevaluationTypeDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssetRevaluationTypeDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetRevaluationTypeDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
