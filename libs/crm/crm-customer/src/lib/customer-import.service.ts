import {inject, Injectable} from '@angular/core';
import { HttpService } from '@ss/common/api-common';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class CustomerImportService {
    private httpSrv = inject(HttpService);

    // constructor(private httpSrv: HttpService) {}

    upload(data: FormData): Observable<{ count: number} > {
        return this.httpSrv.upload('/agents/injection', data);
    }
}
