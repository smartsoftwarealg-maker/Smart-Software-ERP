import { Injectable } from '@angular/core';
import {BaseEntityService} from '@ss/common/api-base-entity';
import {Budget, BUDGET_URL} from './budget-api';
import {HttpService} from '@ss/common/api-common';

@Injectable({
  providedIn: 'root'
})
export class BudgetService extends BaseEntityService<Budget> {
  constructor(protected override httpSrv: HttpService) {
      super(httpSrv, BUDGET_URL);
  }
}
