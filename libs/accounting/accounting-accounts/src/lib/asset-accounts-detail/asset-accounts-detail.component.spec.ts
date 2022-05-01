import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetAccountsDetailComponent } from './asset-accounts-detail.component';

describe('AssetAccountsDetailComponent', () => {
  let component: AssetAccountsDetailComponent;
  let fixture: ComponentFixture<AssetAccountsDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssetAccountsDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetAccountsDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
