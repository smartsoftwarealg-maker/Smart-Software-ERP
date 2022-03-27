import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetBlockingListComponent } from './asset-blocking-list.component';

describe('AssetBlockingListComponent', () => {
  let component: AssetBlockingListComponent;
  let fixture: ComponentFixture<AssetBlockingListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssetBlockingListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetBlockingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
