import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetBlockingDetailComponent } from './asset-blocking-detail.component';

describe('AssetBlockingDetailComponent', () => {
  let component: AssetBlockingDetailComponent;
  let fixture: ComponentFixture<AssetBlockingDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssetBlockingDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetBlockingDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
