import {Injectable} from '@angular/core';
import {HttpService} from '@ss/common/api-common';
import {BaseEntityService} from '@ss/common/api-base-entity';
import {GENACCOUNT_URL, GenerationAccount} from "./account-api";


@Injectable({
    providedIn: 'root'
})
export class GenerationAccountService extends BaseEntityService<GenerationAccount> {
    constructor(protected httpSrv: HttpService) {
        super(httpSrv, GENACCOUNT_URL);
    }
}
