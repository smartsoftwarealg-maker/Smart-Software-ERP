import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseEntityService } from '@ss/common/api-base-entity';
import { HttpService, Password } from '@ss/common/api-common';
import {
    EMPLOYEE_PHOTO_URL,
    EMPLOYEES_URL
} from '@ss/employee-services/employee-services';
import { Driver, DRIVERS } from '../driver-api';

@Injectable({
    providedIn: 'root'
})
export class DriverService extends BaseEntityService<Driver> {

    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, DRIVERS);
    }

    public loadPhoto(id: number): Observable<Blob> {
        return this.httpSrv.getBlob(EMPLOYEES_URL + '/' + id + EMPLOYEE_PHOTO_URL);
    }

    public getPhotoUrl(id: number): string {
        return id != null && id > 0 ? (EMPLOYEES_URL + '/' + id + EMPLOYEE_PHOTO_URL) : null;
    }

    updatePassword(pwd: Password): Observable<any> {
        return this.httpSrv.post('/password', pwd);
    }
}
