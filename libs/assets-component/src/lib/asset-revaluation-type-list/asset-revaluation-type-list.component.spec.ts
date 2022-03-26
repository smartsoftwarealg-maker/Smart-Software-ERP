import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetRevaluationTypeListComponent } from './asset-revaluation-type-list.component';

describe('AssetRevaluationTypeListComponent', () => {
  let component: AssetRevaluationTypeListComponent;
  let fixture: ComponentFixture<AssetRevaluationTypeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssetRevaluationTypeListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetRevaluationTypeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
