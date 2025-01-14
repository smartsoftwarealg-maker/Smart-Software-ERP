import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseOrderDetailComponent } from '@ss/purchases/ui-purchase-order';

describe('UiOrderDetailComponent', () => {
    let component: PurchaseOrderDetailComponent;
    let fixture: ComponentFixture<PurchaseOrderDetailComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ PurchaseOrderDetailComponent ]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(PurchaseOrderDetailComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
