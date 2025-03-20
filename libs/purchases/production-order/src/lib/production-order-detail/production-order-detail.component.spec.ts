import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductionOrderDetailComponent } from '@ss/purchases/production-order';

describe('UiOrderDetailComponent', () => {
    let component: ProductionOrderDetailComponent;
    let fixture: ComponentFixture<ProductionOrderDetailComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ ProductionOrderDetailComponent ]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ProductionOrderDetailComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
