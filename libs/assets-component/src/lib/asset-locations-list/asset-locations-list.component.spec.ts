import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetLocationsListComponent } from './asset-locations-list.component';

describe('AssetLocationsListComponent', () => {
  let component: AssetLocationsListComponent;
  let fixture: ComponentFixture<AssetLocationsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssetLocationsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetLocationsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
