import { Injectable, signal } from '@angular/core';
import {BaseEntityService} from '@ss/common/api-base-entity';
import {
    ATTENDANCE_PERSONS_URL,
    ATTENDANCE_SHIFTS_URL,
    PersonShift, SHIFT_TIMING_URL,
    Timing,
    WORK_SHIFT_URL,
    WorkShift
} from './attendance-api';
import { HttpService, PaginationModel } from '@ss/common/api-common';
import { HttpParams } from '@angular/common/http';
import { filter, map, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
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

    private addOffset(date: Date, offset: Date): Date {
        return date? new Date(new Date(date).getTime() + offset.getTime()) : null;
    }

    override getPage(pageModel: PaginationModel, filter?: string, sortBy?: string, extraPrams?: HttpParams): Observable<Timing[]> {
        return super.getPage(pageModel, filter, sortBy, extraPrams)
            .pipe(tap(data => {
                this.periodExhausted.set(this._period <= data.length);
                if (this.startDate) {
                    const start = new Date(this.startDate);
                    data.forEach((e, i, t) => {
                        e.date = new Date(start.getTime());
                        e.date.setHours(0, 0, 0);
                        e.date.setDate(start.getDate() + i);
                        e.from = this.addOffset(e.from, e.date);
                        e.to = this.addOffset(e.to, e.date);
                        e.breakFrom = this.addOffset(e.breakFrom, e.date);
                        e.breakTo = this.addOffset(e.breakTo, e.date);
                    });
                }
            }));
    }

    set period(period: number) {
        this._period = period;
    }

    get period() {
        return this._period;
    }
}
