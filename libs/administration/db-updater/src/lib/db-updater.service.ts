import {Injectable} from '@angular/core';
import {HttpService} from '@ss/common/api-common';
import {map, Observable, pipe, tap} from 'rxjs';

interface Files {
    files: string[];
}

@Injectable({
    providedIn: 'root'
})
export class DbUpdaterService {

    constructor(private httpSrv: HttpService) {
    }


    getChangeFiles(): Observable<string[]> {
        return this.httpSrv
            .get<Files>('/liquibase-files')
            .pipe(map(res => res.files));
    }

    updateDatabase(file: string): Observable<string> {
        return this.httpSrv.post('/update-db', {filename: file});
    }
}
