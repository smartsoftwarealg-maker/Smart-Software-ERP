import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetClassListComponent } from './asset-class-list.component';

describe('AssetClassListComponent', () => {
  let component: AssetClassListComponent;
  let fixture: ComponentFixture<AssetClassListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssetClassListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetClassListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
