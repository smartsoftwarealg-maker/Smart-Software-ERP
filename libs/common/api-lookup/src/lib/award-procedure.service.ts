import {Injectable} from '@angular/core';
import {HttpService} from '@ss/common/api-common';
import {AWARD_PROCEDURE_URL} from './lookups-api';
import {BaseEntityService} from '@ss/common/api-base-entity';
import {Lookup} from '@ss/common/api-lookup';

@Injectable({
    providedIn: 'root'
})
export class AwardProcedureService extends BaseEntityService<Lookup> {

    constructor(protected httpSrv: HttpService) {
        super(httpSrv, AWARD_PROCEDURE_URL);
    }

}
