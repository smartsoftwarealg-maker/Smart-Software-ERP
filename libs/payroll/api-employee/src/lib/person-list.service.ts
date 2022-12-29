import { Injectable } from '@angular/core';
import { EMPLOYEE_PHOTO_URL, EMPLOYEES_URL, INACTIVE_EMPLOYEES_URL, PersonSummary} from './employee-api';
import { Observable } from 'rxjs';
import { BaseEntityService } from '@ss/common/api-base-entity';
import { HttpService } from '@ss/common/api-common';

@Injectable({
    providedIn: 'root'
})
export class PersonListService extends BaseEntityService<PersonSummary> {

    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, '/persons-list');
    }

    public loadPhoto(id: number): Observable<Blob> {
        return this.httpSrv.getBlob(EMPLOYEES_URL + '/' + id + EMPLOYEE_PHOTO_URL);
    }

    public getPhotoUrl(id: number): string {
        return id != null && id > 0 ? (EMPLOYEES_URL + '/' + id + EMPLOYEE_PHOTO_URL) : null;
    }
}
