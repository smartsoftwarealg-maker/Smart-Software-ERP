import {Injectable} from '@angular/core';
import {HttpService} from '@ss/common/api-common';
import {JOURNAL_TYPES_URL, JournalType} from './lookups-api';
import {BaseEntityService} from '@ss/common/api-base-entity';

@Injectable({
    providedIn: 'root'
})
export class JournalTypeService extends BaseEntityService<JournalType> {

    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, JOURNAL_TYPES_URL);
    }

}
