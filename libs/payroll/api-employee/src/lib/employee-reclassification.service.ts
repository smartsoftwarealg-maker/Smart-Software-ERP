import { Injectable } from '@angular/core';
import { BaseEntityService } from '@ss/common/api-base-entity';
import { HttpService } from '@ss/common/api-common';
import { Reclassification, RECLASSIFICATION_CHILD_URL, RECLASSIFICATION_PARENT_URL } from './employee-api';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({ providedIn: 'root' })
export class EmployeeReclassificationService extends BaseEntityService<Reclassification> {

    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, RECLASSIFICATION_CHILD_URL, RECLASSIFICATION_PARENT_URL);
    }

    public getLast(): Observable<Reclassification> {
        return this.getList(0, 1, null, 'from_date')
            .pipe(
                map(x => x.body[0])
            );
    }
    public lastCareer(): Observable<Reclassification[]> {
        return this.httpSrv.get<Reclassification[]>('/reclassifications/last/' + this.getParentId());
    }

    public reorder(id: number): Observable<{ count: number }> {
        return this.httpSrv.put(`/persons/${id}/reclassifications/reorder`);
    }


}
