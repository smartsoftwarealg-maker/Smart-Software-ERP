import { Injectable } from '@angular/core';
import { BaseEntityService } from '@ss/common/api-base-entity';
import { HttpService } from '@ss/common/api-common';
import { Reintegration, REINTEGRATION_PARENT_URL, REINTEGRATION_CHILD_URL } from './employee-api';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({ providedIn: 'root' })
export class EmployeeReintegrationService extends BaseEntityService<Reintegration> {

    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, REINTEGRATION_CHILD_URL, REINTEGRATION_PARENT_URL);
    }

    public getLast(): Observable<Reintegration> {
        return this.getList(0, 1, null, 'from_date')
            .pipe(
                map(x => x.body[0])
            );
    }
    public lastCareer(): Observable<Reintegration[]> {
        return this.httpSrv.get<Reintegration[]>('/reintegrations/last/' + this.getParentId());
    }

    public reorder(id: number): Observable<{ count: number }> {
        return this.httpSrv.put(`/persons/${id}/reintegrations/reorder`);
    }


}
