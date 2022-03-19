import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpService} from '@ss/common/api-common';

@Injectable({
    providedIn: 'root'
})
export class ArchiveGeneratorService {

    constructor(protected httpSrv: HttpService) {
    }

    generate(period: number): Observable<any> {
       return this.httpSrv.post(`/payroll/archive?period=${period}`);
    }
}
