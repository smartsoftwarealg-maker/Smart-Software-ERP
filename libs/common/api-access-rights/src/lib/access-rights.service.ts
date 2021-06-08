import {Injectable} from '@angular/core';
import {AccessRight, HttpService, UserCenter, UserRole} from '@ss/common/api-common';
import {BaseEntityExtendedService} from '@ss/common/api-base-entity';
import {Observable, of} from 'rxjs';
import {ShellService} from "@ss/common/ui-shell";
import {HttpParams} from "@angular/common/http";
import {map} from "rxjs/operators";

export const ACCESS_RIGHTS_URL = '/accessrights';

@Injectable({
    providedIn: 'root'
})
export class AccessRightsService extends BaseEntityExtendedService<AccessRight> {

    constructor(protected httpSrv: HttpService, private shellSrv: ShellService) {
        super(httpSrv, ACCESS_RIGHTS_URL);
    }

    getEntities(): Observable<string[]> {
        const params = new HttpParams().set('app', 'exchange'); // this.shellSrv.getApp()
        const url = '/entities';
        return this.httpSrv
            .get<{ entities: string[] }>(url, params)
            .pipe(map(res => res['entities']));
    }

    saveRights(r: AccessRight, form: string): Observable<any> {
        const url = `/accessrights?form=${form}`;
        return r.id? this.httpSrv.put(url, r) : this.httpSrv.post(url, r);
    }
}
