import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ScheduledSalesHeaderComponent } from './scheduled-sales-header.component';

describe('ScheduledSalesHeaderComponent', () => {
    let component: ScheduledSalesHeaderComponent;
    let fixture: ComponentFixture<ScheduledSalesHeaderComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ScheduledSalesHeaderComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(ScheduledSalesHeaderComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
