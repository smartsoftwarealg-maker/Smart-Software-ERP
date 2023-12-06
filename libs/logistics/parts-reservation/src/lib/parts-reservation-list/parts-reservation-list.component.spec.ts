import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PartsReservationListComponent } from './parts-reservation-list.component';

describe('LogisticsPartsReservationComponent', () => {
    let component: PartsReservationListComponent;
    let fixture: ComponentFixture<PartsReservationListComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [PartsReservationListComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(PartsReservationListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
