import { Injectable } from '@angular/core';
import { LTM_MATTER_URL, LTM_PHYSICAL_TESTING_URL, LTMTesting } from '../ltm-api';
import { HttpService } from '@ss/common/api-common';
import { LtmBaseTestingClass } from './ltm-base-testing.class';
import { HttpParams } from '@angular/common/http';
import { catchError, Observable, of, repeat } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class LtmPhysicalTestingService extends LtmBaseTestingClass {
    #_open: boolean = false;

    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, LTM_PHYSICAL_TESTING_URL, LTM_MATTER_URL);
    }

    set open(o: boolean) {
        this.#_open = o;
    }

    get open(): boolean {
        return this.#_open;
    }

    override getList(page: number, pageSize: number, filter?: string, sortBy?: string, extraPrams?: HttpParams): Observable<{
        itemCount: number;
        body: LTMTesting[]
    }> {
        const searchStr = this.#_open?((filter||'') + '_0_'): filter;
        return super.getList(page, pageSize, searchStr, sortBy, extraPrams);
    }

    getPendingCount(): Observable<{ count: number}> {
        return this.httpSrv
            .get<{ count: number}>(`/ltm/pending-tests`)
            .pipe(repeat( { delay: 120_000 }),
                  catchError(() => of({ count: 0})));
    }
}


