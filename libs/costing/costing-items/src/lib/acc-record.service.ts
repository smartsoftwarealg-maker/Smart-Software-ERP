import { Injectable } from '@angular/core';
import { BaseEntityService } from '@ss/common/api-base-entity';
import { ACCRecord } from '@ss/costing/costing-utils';
import { HttpService } from '@ss/common/api-common';
import { HttpParams } from "@angular/common/http";
import { map, Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class AccRecordService extends BaseEntityService<ACCRecord> {
    private _year = 0;
    constructor(protected override httpSrv: HttpService) {
        super(httpSrv,  '/costing/accrecords');
    }

    override getList(page: number, pageSize: number, filter?: string, sortBy?: string, extraPrams?: HttpParams): Observable<{
        itemCount: number;
        body: ACCRecord[]
    }> {
        return super.getList(page, pageSize, filter, sortBy, new HttpParams().set('year', this._year))
            .pipe(map(res => {
                res.body = res.body.map((v, i) => {
                    return {...v, id: i};
                })
                return res;
            }));
    }

    set year(y: number) {
        this._year = y;
    }

    list(year: number): Observable<ACCRecord[]> {
        this._year = year;
        return this.getList(1, 1000, null, null, new HttpParams().set('year', year))
            .pipe(map(res => res.body.map((v, i) => {
                return {...v, id: i};;
            })))
    }
}
