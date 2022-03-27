import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetRevaluationListComponent } from './asset-revaluation-list.component';

describe('AssetRevaluationListComponent', () => {
  let component: AssetRevaluationListComponent;
  let fixture: ComponentFixture<AssetRevaluationListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssetRevaluationListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetRevaluationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
