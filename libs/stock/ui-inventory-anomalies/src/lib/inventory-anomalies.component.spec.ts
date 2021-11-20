import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryAnomaliesComponent } from './inventory-anomalies.component';

describe('InventoryAnomaliesComponent', () => {
  let component: InventoryAnomaliesComponent;
  let fixture: ComponentFixture<InventoryAnomaliesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InventoryAnomaliesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InventoryAnomaliesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
