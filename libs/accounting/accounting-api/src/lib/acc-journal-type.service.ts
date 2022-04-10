import {Injectable} from '@angular/core';
import {BaseEntityService} from '@ss/common/api-base-entity';
import {ACC_JOURNAL_TYPE_URL, ACC_POLICY_URL, ACCPolicy} from './accounting-api';
import {HttpService} from '@ss/common/api-common';
import {Lookup} from '@ss/common/api-lookup';

@Injectable({
    providedIn: 'root'
})
export class JournalTypeService extends BaseEntityService<Lookup> {

    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, ACC_JOURNAL_TYPE_URL);
    }
}
