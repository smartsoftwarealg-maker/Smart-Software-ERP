import {Injectable, Input} from '@angular/core';
import {BaseEntityExtendedService} from '@ss/common/api-base-entity';
import {HttpService} from '@ss/common/api-common';
import {APP_ARCHIVE_URL, APPLICATIONS_URL, AppArchive} from '../../../../logistics/api-agent/src/lib/agent-api';
import {map, Observable} from 'rxjs';
import {tap} from 'rxjs/operators';


@Injectable({
    providedIn: 'root'
})
export class AppArchiveService extends BaseEntityExtendedService<AppArchive> {
    private _appId: number;

    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, APP_ARCHIVE_URL, APPLICATIONS_URL);
    }

    upsert(id: number, fd: FormData): Observable<any> {
        const url = `${APPLICATIONS_URL}/${id}/upload`;
        return this.httpSrv.post(url, fd);
    }

    image(id: number): Observable<any> {
        return this.httpSrv.getBlob(`/applications/${id}/upload` );
    }

    set appId(id: number) {
        this._appId = id;
    }

    get appId() {
        return this._appId;
    }
 }
