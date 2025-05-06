import { Injectable } from '@angular/core';
import { BaseEntityService } from '@ss/common/api-base-entity';
import { HttpService } from '@ss/common/api-common';
import { Invitation, INVITATION_CHILD_URL, INVITATION_PARENT_URL } from './employee-api';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({ providedIn: 'root' })
export class EmployeeInvitationService extends BaseEntityService<Invitation> {

    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, INVITATION_CHILD_URL, INVITATION_PARENT_URL);
    }

    public getLast(): Observable<Invitation> {
        return this.getList(0, 1, null, 'from_date')
            .pipe(
                map(x => x.body[0])
            );
    }
    public lastCareer(): Observable<Invitation[]> {
        return this.httpSrv.get<Invitation[]>('/invitations/last/' + this.getParentId());
    }

    public reorder(id: number): Observable<{ count: number }> {
        return this.httpSrv.put(`/persons/${id}/invitations/reorder`);
    }


}
