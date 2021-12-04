import { Injectable } from '@angular/core';
import {dateStrToDmy, dateToYmdStr, HttpService} from "@ss/common/api-common";
import {ShellService} from "@ss/common/ui-shell";
import {Observable, of} from 'rxjs';
import {HttpParams} from "@angular/common/http";


export interface LogNode {
    application: string;
    schema?: Schema;
    children?: LogNode[];
}

export interface Schema {
    id: number;
    description: string;
    schemaVersion: number;
    creationDate: string;
    columns: string;
    application: string;
}

export interface SchemaMap {
    application: string;
    schemas: Schema[];
}

@Injectable({
  providedIn: 'root'
})
export class TraceabilityService {
    fromDate = new Date();
    toDate   = new Date();
    private URLs = ['/logging/writes', '/logging/updates', '/logging/deletes' ];

    constructor(private httpSrv: HttpService) {}

    getSchemaMap(application: string): Observable<SchemaMap[]> {
        const params = new HttpParams().set('app', application);
        return this.httpSrv
            .get<SchemaMap[]>('/logging/map', params);
    }

    getDetails(from: Date, to: Date, type: number, schema: number, page: number, size: number): Observable<{ itemCount: number, body: string[] }> {
        const params = new HttpParams()
            .set('from', dateToYmdStr(from))
            .set('to', dateToYmdStr(to))
            .set('schema', schema)
            .set('page', `${page}-${size}`);
        const url = this.URLs[Math.min(2, Math.max(type - 1, 0))];
        return this.httpSrv.getData(url, page, size, '', '', params);
        //return this.httpSrv.get<string[]>(url, params);
    }

    getApps(): Observable<{ apps: string[] }> {
        return this.httpSrv.get('/logging/apps');
    }
}
