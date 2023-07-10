import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseEntityService } from '@ss/common/api-base-entity';
import { HttpService, Password } from '@ss/common/api-common';
import {
    Employee,
    EMPLOYEE_PHOTO_URL,
    EMPLOYEES_URL,
    INACTIVE_EMPLOYEES_URL
} from '@ss/employee-services/employee-services';

@Injectable({
    providedIn: 'root'
})
export class EmployeeService extends BaseEntityService<Employee> {

    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, EMPLOYEES_URL);
    }

    public loadPhoto(id: number): Observable<Blob> {
        return this.httpSrv.getBlob(EMPLOYEES_URL + '/' + id + EMPLOYEE_PHOTO_URL);
    }

    public getPhotoUrl(id: number): string {
        return id != null && id > 0 ? (EMPLOYEES_URL + '/' + id + EMPLOYEE_PHOTO_URL) : null;
    }

    setMode(active: boolean) {
        this.setURL(active? EMPLOYEES_URL : INACTIVE_EMPLOYEES_URL);
    }
    updatePassword(pwd: Password): Observable<any> {
        return this.httpSrv.post('/password', pwd);
    }
}
