import {Injectable} from '@angular/core';
import {BaseEntityService} from '@ss/common/api-base-entity';
import {Budget, BUDGET_URL} from './budget-api';
import {HttpService} from '@ss/common/api-common';

@Injectable({
    providedIn: 'root'
})
export class BudgetService extends BaseEntityService<Budget> {
    private _currentBudget: Budget = null;

    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, BUDGET_URL);
    }

    get budget(): Budget {
        return this._currentBudget;
    }

    set budget(bdg: Budget) {
        this._currentBudget = bdg;
    }
}
