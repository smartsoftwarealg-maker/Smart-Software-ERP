import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseEntityService } from '@ss/common/api-base-entity';
import { HttpService } from '@ss/common/api-common';
import {
    CMMS_EMPLOYEES_URL,
    Employee,
    EMPLOYEE_PHOTO_URL,
    EMPLOYEES_URL
} from '@ss/employee-services/employee-services';

@Injectable({
    providedIn: 'root'
})
export class CmmsEmployeeService extends BaseEntityService<Employee> {

    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, CMMS_EMPLOYEES_URL);
    }

    public loadPhoto(id: number): Observable<Blob> {
        return this.httpSrv.getBlob(EMPLOYEES_URL + '/' + id + EMPLOYEE_PHOTO_URL);
    }

    public getPhotoUrl(id: number): string {
        return id != null && id > 0 ? (EMPLOYEES_URL + '/' + id + EMPLOYEE_PHOTO_URL) : null;
    }
}
