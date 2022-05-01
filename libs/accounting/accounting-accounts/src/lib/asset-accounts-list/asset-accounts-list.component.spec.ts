import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetAccountsListComponent } from './asset-accounts-list.component';

describe('AssetAccountsListComponent', () => {
  let component: AssetAccountsListComponent;
  let fixture: ComponentFixture<AssetAccountsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssetAccountsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetAccountsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
