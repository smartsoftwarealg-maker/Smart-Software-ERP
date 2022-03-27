import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetCostsDetailComponent } from './asset-costs-detail.component';

describe('AssetCostsDetailComponent', () => {
  let component: AssetCostsDetailComponent;
  let fixture: ComponentFixture<AssetCostsDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssetCostsDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetCostsDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
