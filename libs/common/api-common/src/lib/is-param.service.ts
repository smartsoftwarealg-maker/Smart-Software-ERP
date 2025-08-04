import { inject, Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpService} from '@ss/common/api-common';
import {map} from 'rxjs/operators';


@Injectable({
    providedIn: 'root'
})
export class IsParamService {
    #http = inject(HttpService);

    is(param: string): Observable<boolean> {
        return this
            .#http
            .get<{param: boolean}>(`/is?param=${param}`)
            .pipe(map(res => res[param]));
    }
}
