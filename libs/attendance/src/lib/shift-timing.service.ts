import { Injectable, signal } from '@angular/core';
import { BaseEntityService } from '@ss/common/api-base-entity';
import { SHIFT_TIMING_URL, Timing, WORK_SHIFT_URL } from './attendance-api';
import { dateTimeToYmdStr, HttpService, PaginationModel } from '@ss/common/api-common';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class ShiftTimingService extends BaseEntityService<Timing> {
    private _startDate: Date = null;
    private _period = 0;

    periodExhausted = signal<boolean>(false);

    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, SHIFT_TIMING_URL, WORK_SHIFT_URL);
        this.setParentId(0);
    }

    get startDate() {
        return this._startDate;
    }

    set startDate(d: Date) {
        this._startDate = d;
    }

    override getPage(
        pageModel: PaginationModel,
        filter?: string,
        sortBy?: string,
        extraPrams?: HttpParams,
    ): Observable<Timing[]> {
        return super.getPage(pageModel, filter, sortBy, extraPrams).pipe(
            tap((data) => {
                this.periodExhausted.set(this._period <= data.length);
                if (this.startDate) {
                    const start = new Date(this.startDate);
                    data.forEach((e, i, t) => {
                        const dt = new Date(start.getTime());
                        dt.setHours(0, 0, 0);
                        dt.setDate(start.getDate() + i);
                        e.date = dateTimeToYmdStr(dt);
                    });
                }
            }),
        );
    }

    set period(period: number) {
        this._period = period;
    }

    get period() {
        return this._period;
    }
}
