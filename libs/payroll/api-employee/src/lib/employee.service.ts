import { Injectable } from '@angular/core';
import {Employee, EMPLOYEE_PHOTO_URL, EMPLOYEES_URL, INACTIVE_EMPLOYEES_URL} from './employee-api';
import { Observable, of } from 'rxjs';
import { BaseEntityService } from '@ss/common/api-base-entity';
import { HttpService } from '@ss/common/api-common';
import {HttpParams} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class EmployeeService extends BaseEntityService<Employee> {

    constructor(protected httpSrv: HttpService) {
        super(httpSrv, EMPLOYEES_URL);
    }

    public loadPhoto(id: number): Observable<Blob> {
        return this.httpSrv.getBlob(EMPLOYEES_URL + '/' + id + EMPLOYEE_PHOTO_URL);
    }

    public getPhotoUrl(id: number): string {
        return id != null && id > 0 ? (EMPLOYEES_URL + '/' + id + EMPLOYEE_PHOTO_URL) : null;
    }

    setMode(active: Boolean) {
      this.setURL(active? EMPLOYEES_URL : INACTIVE_EMPLOYEES_URL);
    }
}
