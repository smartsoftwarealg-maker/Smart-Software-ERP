import {Injectable} from '@angular/core';
import {HttpService} from '@ss/common/api-common';
import {Class, CLASSES_URL} from './lookups-api';
import {BaseEntityService} from '@ss/common/api-base-entity';
import {Observable, of, switchMap} from 'rxjs';
import {Account} from '@ss/accounting/api-accounts';

//import {BaseEntityService} from '@ss/common/api-base-entity';

@Injectable({
    providedIn: 'root'
})
export class ClassService extends BaseEntityService<Class> {

    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, CLASSES_URL);
    }

    init(): Observable<boolean> {
        return this.httpSrv.init();
    }
    reload(data: Class[]): Observable<Class[]> {
        const ids = data.map(e => e.accountId).join(',');
        return this.httpSrv
            .get<Account[]>(`/accounts?id=${ids}`)
            .pipe(switchMap(res => {
                data.forEach(e => e.accountName = res.find(c => c.id === e.accountId)?.description);
                return of(data);
            }));
    }

    showURL() {
        console.log('**************base url', this.httpSrv.baseUrl);
    }
}
