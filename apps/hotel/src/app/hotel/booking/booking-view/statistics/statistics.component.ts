import { Component } from '@angular/core';
import { LoadingState } from '../../../../common/util';
import { Observable } from 'rxjs';
import { HttpService } from '../../../../smart-lib/common/http.service';

interface Statistics {
    roomCount: number;
    bedCount: number;
    occupiedRoomsCount: number;
    cleanRoomsCount: number;
    guestsCount: number;
    occupancyRatio: number;
    bedOccupancyRatio: number;
    inToday: number;
    outToday: number;
    projectedIncome: number;
    projectedIncomeWithTax: number;
}


@Component({
    selector: 'app-booking-stats',
    templateUrl: './statistics.component.html',
    styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent {

    bookingStatsUrl = '/hotels/booking/stats';

    stats: Statistics = {
        roomCount: 0,
        bedCount: 0,
        occupiedRoomsCount: 0,
        cleanRoomsCount: 0,
        guestsCount: 0,
        occupancyRatio: 0,
        bedOccupancyRatio: 0,
        inToday: 0,
        outToday: 0,
        projectedIncome: 0,
        projectedIncomeWithTax: 0
    }; // used to display stats when the menu is open, refreshed every time is opened

    loadingState: LoadingState = null;

    constructor(public httpSrv: HttpService) {
    }

    refresh() {
        this.loadingState = LoadingState.LOADING;
        this.getBookingStatistics().subscribe(s => {
            this.stats = s;
            this.stats.occupancyRatio *= 100;
            this.stats.bedOccupancyRatio *= 100;
            this.loadingState = LoadingState.COMPLETE;
        }, e => {
            this.loadingState = LoadingState.ERROR;
            throw e;
        });
    }

    public getBookingStatistics(): Observable<Statistics> {
        return this.httpSrv.get<Statistics>(this.bookingStatsUrl);
    }
}
