import { inject, Injectable } from '@angular/core';
import { BaseEntityExtendedService } from '@ss/common/api-base-entity';
import { HttpService, LoginService } from '@ss/common/api-common';
import { Journal } from './model';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class UserJournalsService extends BaseEntityExtendedService<Journal> {
    private loginSrv = inject(LoginService);
    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, '/treasury/user-journals'); //, '/treasury/users'
        this.setParentId(this.loginSrv.appCtx.id);
    }

    override get(iid: number | string): Observable<Journal> {
        return this.httpSrv.get(`/treasury/journals/${iid}`)
    }
}
