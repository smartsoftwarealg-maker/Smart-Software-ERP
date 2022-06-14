import {Injectable} from '@angular/core';
import {HttpService} from '@ss/common/api-common';
import {map, Observable, pipe, tap} from 'rxjs';
import {DBResponse} from './db-updater-api';

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

    updateDatabase(file: string): Observable<DBResponse> {
        return this.httpSrv.post('/update-db', {filename: file});
    }

    info(): Observable<DBResponse> {
        return this.httpSrv.get<DBResponse>('/update-db');
    }
}
