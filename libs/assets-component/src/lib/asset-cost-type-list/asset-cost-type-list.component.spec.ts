import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetCostTypeListComponent } from './asset-cost-type-list.component';

describe('AssetCostTypeListComponent', () => {
  let component: AssetCostTypeListComponent;
  let fixture: ComponentFixture<AssetCostTypeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssetCostTypeListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetCostTypeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
