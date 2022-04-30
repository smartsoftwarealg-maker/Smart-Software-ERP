import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {HttpService} from '@ss/common/api-common';
import {map} from 'rxjs/operators';


@Injectable({
    providedIn: 'root'
})
export class IsParamService {
    constructor(private http: HttpService) { }

    is(param: string): Observable<boolean> {
        return this
            .http.get<{param: boolean}>('/is?param=' + param)
            .pipe(map(res => res[param]));
    }
}
