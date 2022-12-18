import { Injectable } from '@angular/core';
import { BaseEntityExtendedService } from '@ss/common/api-base-entity';
import { HttpService } from '@ss/common/api-common';
import { TTransaction, TTransactionLine, TRANSACTIONS_URL } from './models';

export class TransactionService extends BaseEntityExtendedService<TTransaction> {
    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, TRANSACTIONS_URL);
    }
}

export class TransactionLineService extends BaseEntityExtendedService<TTransactionLine> {
    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, TRANSACTIONS_URL);
    }
}

