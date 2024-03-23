import { Injectable } from '@angular/core';
import { BaseEntityService } from '@ss/common/api-base-entity';
import { Application, GICA_ARCHIVES, GICA_YEARS } from '../gica-careers-api';
import { HttpService } from '@ss/common/api-common';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ArchiveService extends BaseEntityService<Application> {
    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, GICA_ARCHIVES, GICA_YEARS);
    }

    delete(year: number): Observable<{count: number }> {
        return this.httpSrv.post(`/gica-careers/years/${year}/delete`);
    }
}
