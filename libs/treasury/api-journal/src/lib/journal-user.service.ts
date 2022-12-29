import { Injectable } from '@angular/core';
import { BaseEntityExtendedService } from '@ss/common/api-base-entity';
import { HttpService } from '@ss/common/api-common';
import { JournalUser, JOURNAL_USERS_URL } from './model';

@Injectable({
    providedIn: 'root'
})
export class JournalUserService extends BaseEntityExtendedService<JournalUser> {
    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, JOURNAL_USERS_URL);
    }
}
