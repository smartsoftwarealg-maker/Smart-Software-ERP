import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Mark, MARKS_URL, Vat, VATS_URL } from './lookups-api';
import { HttpService } from '@ss/common/api-common';
import { tap, map } from 'rxjs/operators';

// this service must cache things for 60 seconds
// this service should update the cache when local changes accur
// NOT THREAD-SAFE! i.e. don't call again until the first result's observable is complete

@Injectable({
    providedIn: 'root'
})
export class StockLookups {

    readonly cacheTime = 60000; // 1 minute

    marks: Mark[] = null;
    marksLoadTime = 0;

    vats: Vat[] = null;
    vatLoadTime = 0;

    constructor(private httpSrv: HttpService) {
    }

    // #########################
    // Mark
    // #########################

    public getMarks(): Observable<Mark[]> {
        if (this.marksLoadTime < Date.now()) {
            this.marks = null;
        }
        if (this.marks != null) {
            return of(this.marks);
        }
        return this.httpSrv.get<Mark[]>(MARKS_URL)
            .pipe(tap(m => {
                this.marksLoadTime = Date.now() + this.cacheTime;
                this.marks = m;
            }));
    }

    // #########################
    // VAT
    // #########################

    public getVats(): Observable<Vat[]> {
        if (this.vatLoadTime < Date.now()) {
            this.vats = null;
        }
        if (this.vats != null) {
            return of(this.vats);
        }
        return this.httpSrv.get<Vat[]>(VATS_URL)
            .pipe(tap(m => {
                this.vatLoadTime = Date.now() + this.cacheTime * 2; // x 2 because vats don't change that often
                this.vats = m;
            }));
    }

}
