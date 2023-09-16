import {Injectable} from '@angular/core';
import {BaseEntityExtendedService} from '@ss/common/api-base-entity';
import { AccessRight, APPLICATIONS_URL, HttpService } from "@ss/common/api-common";
import {Observable} from 'rxjs';
import { APP_ARCHIVE_URL, AppArchive, AppArchiveObs } from "./app-archive-api";
import { HttpParams } from '@angular/common/http';
import { Lookup } from "@ss/common/api-lookup";

@Injectable({
    providedIn: 'root'
})
export class AppArchiveService extends BaseEntityExtendedService<AppArchive> {
    private _appId: number;
    private _editable = false;
    private _id = 0;

    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, APP_ARCHIVE_URL, APPLICATIONS_URL);
    }

    upsert(id: number, fd: FormData): Observable<any> {
        const url = `${APPLICATIONS_URL}/${id}/upload`;
        return this.httpSrv.post(url, fd);
    }

    image(id: number): Observable<any> {
        return this.httpSrv.getBlob(`/applications/${id}/upload`);
    }

    set appId(id: number) {
        this._appId = id;
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

    get isReady() {
        return this._appId > 0 && this.getParentId() > 0;
    }

    getPartnerArchives(denomination: string, offset: number, limit: number): Observable<AppArchiveObs> {
        const params = new HttpParams().set('denomination', denomination || '');
        return this.httpSrv.getData<AppArchive>('/archives/partners', offset, limit, null, null, params);
    }

    getTransactionArchives(url: string, numb: number, date: string, ref: string, refDate: string, offset: number, limit: number): Observable<AppArchiveObs> {
        const params = new HttpParams()
            .set('number', numb)
            .set('date', date)
            .set('ref', ref)
            .set('refdate', refDate);
        return this.httpSrv.getData<AppArchive>(`/archives/${url}`, offset, limit, null, null, params);
    }

    getAccounting(numb: number, date: string, ref: string, offset: number, limit: number): Observable<AppArchiveObs> {
        const params = new HttpParams()
            .set('number', numb)
            .set('date', date)
            .set('ref', ref);
        return this.httpSrv.getData<AppArchive>('/archives/accounting', offset, limit, null, null, params);
    }

    getAssetReceptionArchives(numb: number, date: string, refDate: string, offset: number, limit: number): Observable<AppArchiveObs> {
        const params = new HttpParams()
            .set('denomination', numb || 0)
            .set('refdate', refDate || '');
        return this.httpSrv.getData<AppArchive>('/archives/asset-receptions', offset, limit, null, null, params);
    }

    getAssetArchives(reference: string, description: string, offset: number, limit: number): Observable<AppArchiveObs> {
        const params = new HttpParams()
            .set('reference', reference)
            .set('description', description)
            .set('page', `${offset}-${limit}`);
        return this.httpSrv.getData<AppArchive>('/archives/assets', offset, limit, null, null, params);
    }

    getEmployeeArchives(firstName: string, lastName: string, offset: number, limit: number): Observable<AppArchiveObs> {
        const params = new HttpParams()
            .set('lastname', lastName)
            .set('firstname', firstName);
        return this.httpSrv.getData<AppArchive>('/archives/employees', offset, limit, null, null, params);
    }

    getRolesFor(document: string): Observable<AccessRight[]> {
        return this.httpSrv.get<AccessRight[]>(`/archives/roles?document=${document}`);
    }

    addRole(data: Lookup): Observable<{ count: number }> {
        return this.httpSrv.post('/archives', data);
    }

    userDocuments(): Observable<Lookup[]> {
        return this.httpSrv.get<Lookup[]>('/archives/user-documents');
    }

    override setParentId(id: number) {
        this._id = id;
        super.setParentId(id * 100 + this._appId);
    }

    get id() {
        return this._id;
    }
}
