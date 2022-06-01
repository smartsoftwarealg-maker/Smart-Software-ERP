import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetReceptionsComponent } from './asset-receptions.component';

describe('AssetReceptionsComponent', () => {
  let component: AssetReceptionsComponent;
  let fixture: ComponentFixture<AssetReceptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssetReceptionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetReceptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
