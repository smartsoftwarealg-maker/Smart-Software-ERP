import { Injectable } from '@angular/core';
import {BaseEntityExtendedService} from '@ss/common/api-base-entity';
import {LTM_INJECTION_URL, LTMTestInjection} from '../ltm-api';
import {HttpService} from '@ss/common/api-common';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class LtmInjectionService extends BaseEntityExtendedService<LTMTestInjection> {

    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, LTM_INJECTION_URL);
    }

    upload(data: FormData): Observable<any> {
        return this.httpSrv.upload(LTM_INJECTION_URL, data);
    }
}
