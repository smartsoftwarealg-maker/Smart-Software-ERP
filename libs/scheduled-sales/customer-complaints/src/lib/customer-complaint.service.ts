import { Injectable } from '@angular/core';
import { BaseEntityService } from '@ss/common/api-base-entity';
import { COMPLAINTS_URL, CustomerComplaint } from './customer-complaint.class';
import { HttpService } from '@ss/common/api-common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class CustomerComplaintsService extends BaseEntityService<CustomerComplaint> {
    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, COMPLAINTS_URL);
    }

    upload(id: number, fd: FormData): Observable<any> {
        const url = `/ssales/complaints/${id}/image`;
        return this.httpSrv.post(url, fd);
    }

    deleteImage(id: number): Observable<any> {
        const url = `/ssales/complaints/${id}/image`;
        return this.httpSrv.remove(url);
    }

}
