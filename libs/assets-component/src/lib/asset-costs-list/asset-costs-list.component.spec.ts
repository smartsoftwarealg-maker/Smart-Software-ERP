import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetCostsListComponent } from './asset-costs-list.component';

describe('AssetCostsListComponent', () => {
  let component: AssetCostsListComponent;
  let fixture: ComponentFixture<AssetCostsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssetCostsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetCostsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
