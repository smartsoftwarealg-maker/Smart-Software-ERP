import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ScheduledSalesProductsPageComponent } from './scheduled-sales-products-page.component';

describe('ScheduledSalesProductsPageComponent', () => {
    let component: ScheduledSalesProductsPageComponent;
    let fixture: ComponentFixture<ScheduledSalesProductsPageComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ScheduledSalesProductsPageComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(ScheduledSalesProductsPageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
