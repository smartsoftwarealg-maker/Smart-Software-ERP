import {Injectable} from '@angular/core';
import {AccessRight, HttpService} from '@ss/common/api-common';
import {BaseEntityExtendedService} from '@ss/common/api-base-entity';
import {Observable, of} from 'rxjs';
import {HttpParams} from '@angular/common/http';
import {map} from 'rxjs/operators';

export const ACCESS_RIGHTS_URL = '/accessrights';

@Injectable({
    providedIn: 'root'
})
export class AccessRightsService extends BaseEntityExtendedService<AccessRight> {
    // private APPLICATION_LIST = [
    //     "ACCOUNTING",
    //     'ADMINISTRATION',
    //     'ASSETS',
    //     "DASHBOARD-APP",
    //     "FINANCE",
    //     'HRMASTER',
    //     'STOCK',
    //     'LOGISTICS',
    //     'LOGISTICS-ADMINISTRATION',
    //     'ORGANIZATION',
    //     'PAYMENTS',
    //     'PAYROLL',
    //     'ATTENDANCE',
    //     'PURCHASES',
    //     `SALES`,
    //     'WEBARCHIVE',
    //     'TREASURY',
    //     'LTM',
    //     'WORKFLOW'];

    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, ACCESS_RIGHTS_URL);
    }

    getEntities(app: string): Observable<string[]> {
        const params = new HttpParams().set('app', app);
        const url = '/entities';
        return app === 'APPLICATIONS' ?
            this.httpSrv.get<{ apps: string[] }>('/modules').pipe(map(res => res.apps)) : //'COMMON', , 'EXCHANGE'
            this.httpSrv
                .get<{ entities: string[] }>(url, params)
                .pipe(map(res => res['entities'].sort((a, b) => a.localeCompare(b))));
    }

    saveRights(r: AccessRight, form: string): Observable<any> {
        const url = `/accessrights?form=${form}`;
        return r.id? this.httpSrv.put(url, r) : this.httpSrv.post(url, r);
    }

    getApps(): Observable<{ apps: string[] }> {
        return this.httpSrv.get('/modules');
    }
}
