import { Injectable } from '@angular/core';
import { HttpService } from '@ss/common/api-common';
import { BaseEntityService } from '@ss/common/api-base-entity';
import { CMMSEmployee } from './cmms-api';
import { Employee } from '@ss/employee-services/employee-services';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})

export class CmmsPersonService extends BaseEntityService<CMMSEmployee> {
    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, '/cmms/persons');
    }

    override update(a: Employee): Observable<number> {
        const e: CMMSEmployee = { id: a.id, firstName: a.firstName, lastName: a.lastName, hourlyRate: a.hourlyRate};
        return this.httpSrv
            .put('/cmms/persons', e)
            .pipe(map((res: { count: number }) => res['count']));
    }
}
