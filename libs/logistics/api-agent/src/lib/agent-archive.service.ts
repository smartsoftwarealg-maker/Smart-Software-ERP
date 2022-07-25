import {Injectable} from '@angular/core';
import {BaseEntityExtendedService} from '@ss/common/api-base-entity';
import {HttpService} from '@ss/common/api-common';
import {AGENT_ARCHIVE_URL, Archive} from './agent-api';
import {Observable} from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class AgentArchiveService extends BaseEntityExtendedService<Archive> {
    constructor(protected httpSrv: HttpService) {
        super(httpSrv, AGENT_ARCHIVE_URL);
    }

    upsert(fd: FormData): Observable<any> {
        return this.httpSrv.post(AGENT_ARCHIVE_URL, fd);
    }
 }
