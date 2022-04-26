import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetLocationsDetailComponent } from './asset-locations-detail.component';

describe('AssetLocationsDetailComponent', () => {
  let component: AssetLocationsDetailComponent;
  let fixture: ComponentFixture<AssetLocationsDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssetLocationsDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetLocationsDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
