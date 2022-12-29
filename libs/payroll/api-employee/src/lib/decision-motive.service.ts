import { Injectable } from '@angular/core';
import { BaseEntityService } from '@ss/common/api-base-entity';
import { HttpService } from '@ss/common/api-common';
import { CAREER_PARENT_URL, CAREER_CHILD_URL, Career } from './employee-api';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {Lookup} from '@ss/common/api-lookup';


@Injectable({ providedIn: 'root' })
export class DecisionMotiveService extends BaseEntityService<Lookup> {

    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, '/lookups/decision_motives');
    }
}
