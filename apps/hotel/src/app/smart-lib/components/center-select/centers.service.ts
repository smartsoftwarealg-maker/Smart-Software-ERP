import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Center, Company } from '../../common/models';
import { HttpService } from '../../../smart-lib/common/http.service';

@Injectable()
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
