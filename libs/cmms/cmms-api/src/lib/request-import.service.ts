import { inject, Injectable } from '@angular/core';
import { HttpService } from '@ss/common/api-common';
import { Observable, of } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class RequestImportService {
    private httpService = inject(HttpService);

    importRequest(id: number): Observable<any> {
        return of(id);
    }
}
