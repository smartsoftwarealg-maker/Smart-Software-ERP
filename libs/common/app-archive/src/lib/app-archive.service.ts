import {Injectable} from '@angular/core';
import {BaseEntityExtendedService} from '@ss/common/api-base-entity';
import {HttpService} from '@ss/common/api-common';
import {APP_ARCHIVE_URL, APPLICATIONS_URL, AppArchive} from '@ss/logistics/api-agent';
import {Observable} from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class AppArchiveService extends BaseEntityExtendedService<AppArchive> {
    private _appId: number;
    private _editable = false;
    private _cb : (id: number) => void = null;

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
        if (this._cb != null) {
            this._cb(id);
        }
    }

    get appId() {
        return this._appId;
    }

    set editable(value: boolean) {
        this._editable = value;
    }

    get editable(): boolean {
        return this._editable;
    }
    set objId(id: number) {
        this.setParentId(id);
    }

 }
