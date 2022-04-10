import {Injectable} from '@angular/core';
import {BaseEntityService} from '@ss/common/api-base-entity';
import {ACC_JOURNALS_URL, ACC_POLICY_URL, ACCPolicy, JOURNAL_USER_URL, JournalUser} from './accounting-api';
import {HttpService} from '@ss/common/api-common';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class JournalUserService extends BaseEntityService<JournalUser> {

    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, JOURNAL_USER_URL, ACC_JOURNALS_URL);
    }

    addUser(id: number): Observable<{ count: number }> {
        const data: JournalUser = { id: 0, userId: id, journalId: this.parentId};
        return this.httpSrv
            .post(`${ACC_JOURNALS_URL}/${this.parentId}${JOURNAL_USER_URL}`, data);
    }

    deleteUser(id: number): Observable<{ count: number }> {
        const data: JournalUser = { id: 0, userId: id, journalId: this.parentId};
        return this.httpSrv
            .remove(`${ACC_JOURNALS_URL}/${this.parentId}${JOURNAL_USER_URL}/${id}`);
    }
}
