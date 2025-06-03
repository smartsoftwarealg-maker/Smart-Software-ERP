import { Injectable } from '@angular/core';
import { HttpService } from '@ss/common/api-common';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class CustomerImportService {
    constructor(private httpSrv: HttpService) {}

    upload(data: FormData): Observable<any> {
        return this.httpSrv.upload('/agents/injection', data);
    }
}
