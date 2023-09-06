import { Injectable } from '@angular/core';
import { HttpService } from '@ss/common/api-common';
import { Employee, EmployeeService } from '@ss/employee-services/employee-services';
import { Observable } from 'rxjs';
import { CMMSEmployee } from './cmms-api';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})

export class CMMSEmployeeService extends EmployeeService {
    constructor(protected override httpSrv: HttpService) {
        super(httpSrv);
    }

    override update(a: Employee): Observable<number> {
        const e: CMMSEmployee = { id: a.id, firstName: a.firstName, lastName: a.lastName, hourlyRate: a.hourlyRate};
        return this.httpSrv
            .put('/cmms/persons', e)
            .pipe(map((res: { count: number }) => res['count']));
    }
}
