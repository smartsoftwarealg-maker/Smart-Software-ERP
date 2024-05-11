import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ScheduledSalesMainPageComponent } from './scheduled-sales-main-page.component';

describe('ScheduledSalesMainPageComponent', () => {
    let component: ScheduledSalesMainPageComponent;
    let fixture: ComponentFixture<ScheduledSalesMainPageComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ScheduledSalesMainPageComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(ScheduledSalesMainPageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
