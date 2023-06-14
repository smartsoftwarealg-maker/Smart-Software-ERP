import { Injectable } from '@angular/core';
import {BaseEntityService} from '@ss/common/api-base-entity';
import { LTM_LINE_MATTER_URL, LTMLineMatter } from '../ltm-api';
import { HttpService } from '@ss/common/api-common';
import { Observable, of } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class LtmLineMatterService extends BaseEntityService<LTMLineMatter> {

    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, LTM_LINE_MATTER_URL);
    }

    public getByMatterId(id: number): Observable<LTMLineMatter> {
        return this.httpSrv.get('/ltm/line-matters-matter/' + id);
    }
}
