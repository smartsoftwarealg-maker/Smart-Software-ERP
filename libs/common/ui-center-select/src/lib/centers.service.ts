import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Center, Company } from '@ss/common/api-common';
import { HttpService } from '@ss/common/api-common';

@Injectable({
    providedIn: 'root'
})
export class CentersService {
    constructor(private httpSrv: HttpService) {
    }

    public getCompanyList(): Observable<Company[]> {
        return this.httpSrv.get<Company[]>('/login/companies');
    }

    public getCenterList(company: number): Observable<Center[]> {
        const id = company || 0;
        return this.httpSrv.get<Company[]>(`/companies/${id}/publicCenters`);
    }
}
