import { Injectable } from '@angular/core';
import {HttpService} from '@ss/common/api-common';
import {BaseEntityExtendedService} from '@ss/common/api-base-entity';
import {TransactionLine} from '@ss/logistics/api-transaction';

@Injectable({
    providedIn: 'root'
})
export class ProformaLinesService extends BaseEntityExtendedService<TransactionLine> {

    constructor(protected httpSrv: HttpService) {
        super(httpSrv,  '/detail', '/proforma');
    }
}
