import { Injectable } from '@angular/core';
import { BaseEntityService } from '@ss/common/api-base-entity';
import { GICA_REPORTS } from '../gica-careers-api';
import { HttpService } from '@ss/common/api-common';
import { Report } from '../gica-careers-api';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ReportService extends BaseEntityService<Report> {
    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, GICA_REPORTS);
    }

    apply(year: number): Observable<{count: number }> {
        return this.httpSrv.post(`/gica-careers/years/${year}/apply`);
    }

    delete(year: number): Observable<{count: number }> {
        return this.httpSrv.post(`/gica-careers/years/${year}/delete`);
    }
}
