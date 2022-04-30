import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetSearchDialogComponent } from './asset-search-dialog.component';

describe('AssetSearchDialogComponent', () => {
  let component: AssetSearchDialogComponent;
  let fixture: ComponentFixture<AssetSearchDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssetSearchDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetSearchDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
