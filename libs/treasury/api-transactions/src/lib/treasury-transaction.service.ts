import { Injectable } from '@angular/core';
import { BaseEntityExtendedService } from '@ss/common/api-base-entity';
import { HttpService } from '@ss/common/api-common';
import {TTransaction, TTransactionLine, TRANSACTIONS_URL, PERIOD_URL, Summary, DETAIL_URL} from './models';
import {HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Journal} from '@ss/treasury/api-journal';
import {BaseTreasuryTransactionService} from './base-treasury-transaction-service';

@Injectable({
    providedIn: 'root'
})
export class TreasuryTransactionService extends BaseTreasuryTransactionService {
    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, TRANSACTIONS_URL);
    }
}

@Injectable({
    providedIn: 'root'
})
export class TreasuryBankExpenseService extends BaseTreasuryTransactionService {
    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, TRANSACTIONS_URL);
        this.bankExpenses = true;
    }
}

@Injectable({
    providedIn: 'root'
})
export class TransactionLineService extends BaseEntityExtendedService<TTransactionLine> {
    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, DETAIL_URL, TRANSACTIONS_URL);
        this.setParentId(0);
    }
}

