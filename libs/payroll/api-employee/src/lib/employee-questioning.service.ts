import { Injectable } from '@angular/core';
import { BaseEntityService } from '@ss/common/api-base-entity';
import { HttpService } from '@ss/common/api-common';
import { Questioning, QUESTIONING_CHILD_URL, QUESTIONING_PARENT_URL } from './employee-api';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({ providedIn: 'root' })
export class EmployeeQuestioningService extends BaseEntityService<Questioning> {

    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, QUESTIONING_CHILD_URL, QUESTIONING_PARENT_URL);
    }

    public getLast(): Observable<Questioning> {
        return this.getList(0, 1, null, 'from_date')
            .pipe(
                map(x => x.body[0])
            );
    }
    public lastCareer(): Observable<Questioning[]> {
        return this.httpSrv.get<Questioning[]>('/questionings/last/' + this.getParentId());
    }

    public reorder(id: number): Observable<{ count: number }> {
        return this.httpSrv.put(`/persons/${id}/questionings/reorder`);
    }


}
