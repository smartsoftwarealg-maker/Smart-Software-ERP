import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetCostTypeDetailComponent } from './asset-cost-type-detail.component';

describe('AssetCostTypeDetailComponent', () => {
  let component: AssetCostTypeDetailComponent;
  let fixture: ComponentFixture<AssetCostTypeDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssetCostTypeDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetCostTypeDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
