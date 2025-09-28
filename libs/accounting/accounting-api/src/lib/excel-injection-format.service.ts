import {Injectable} from '@angular/core';
import {BaseEntityService} from '@ss/common/api-base-entity';
import {
    ACC_JOURNALS_URL,
    ACC_POLICY_URL,
    ACCPolicy,
    JOURNAL_USER_URL,
    JournalUser,
    XLSInjectionFormat
} from './accounting-api';
import {HttpService} from '@ss/common/api-common';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ExcelInjectionFormatService extends BaseEntityService<XLSInjectionFormat> {

    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, '/accounting/injection-formats');
    }
}
