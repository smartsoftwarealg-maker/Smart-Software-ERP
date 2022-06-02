import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetClassDetailComponent } from './asset-class-detail.component';

describe('AssetClassDetailComponent', () => {
  let component: AssetClassDetailComponent;
  let fixture: ComponentFixture<AssetClassDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssetClassDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetClassDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
