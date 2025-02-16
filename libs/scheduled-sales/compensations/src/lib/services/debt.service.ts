import {Injectable} from '@angular/core';
import {BaseEntityService} from '@ss/common/api-base-entity';
import {HttpService} from '@ss/common/api-common';
import { DEBTS_URL, Debt } from './compensation-api';

@Injectable({
    providedIn: 'root'
})
export class DebtService extends BaseEntityService<Debt> {

    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, DEBTS_URL);
    }
}
