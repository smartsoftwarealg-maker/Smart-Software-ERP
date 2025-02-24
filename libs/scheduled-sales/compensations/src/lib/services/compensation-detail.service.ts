import { Injectable, Signal, signal } from '@angular/core';
import {BaseEntityService} from '@ss/common/api-base-entity';
import {HttpService} from '@ss/common/api-common';
import { Compensation, COMPENSATIONS_URL, DEBTS_URL, InvoicePayment, PAYMENTS_URL } from './compensation-api';

@Injectable({
    providedIn: 'root'
})
export class CompensationDetailService extends BaseEntityService<Compensation> {
    #editInProgress = signal(false);

    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, DEBTS_URL);
    }

    get isEditInProgress(): Signal<boolean> {
        return this.#editInProgress;
    }

    set isEditInProgress(value: boolean) {
        this.#editInProgress.set(value);
    }
}
