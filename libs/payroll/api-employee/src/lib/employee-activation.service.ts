import { Injectable } from '@angular/core';
// import {BaseEntityService} from '@ss/common/api-base-entity';
import { BaseEntityService } from '@ss/common/api-base-entity';
import { HttpService } from '@ss/common/api-common';
import { ACTIVATION_PARENT_URL, ACTIVATION_CHILD_URL, EmployeeActivation } from './employee-api';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';


@Injectable({ providedIn: 'root' })
export class EmployeeActivationService extends BaseEntityService<EmployeeActivation> {

    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, ACTIVATION_CHILD_URL, ACTIVATION_PARENT_URL);
    }

    // FIXME: this workaround should not be in the frontend
    public override getList(page: number, pageSize: number, filter?: string, sortBy?: string, extraPrams?: HttpParams): Observable<{ itemCount: number, body: EmployeeActivation[] }> {
        return super.getList(page, pageSize, filter, sortBy, extraPrams).pipe(
            tap(result => result.body.sort((a, b) => (a.activityStatus > 0 ? a.activityStatus : 999999) - (b.activityStatus > 0 ? b.activityStatus : 999999)))
        );
    }

    // FIXME: this workaround should not be in the frontend
    public getLast(): Observable<EmployeeActivation> {
        return this.getList(0, 50).pipe(
            map(data => data.body[data.body.length - 1])
        );
    }
}
