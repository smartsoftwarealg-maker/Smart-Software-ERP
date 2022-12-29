import { Injectable } from '@angular/core';
import {HttpService} from '@ss/common/api-common';
import {TransactionLinesClass} from './transaction-lines.class';

@Injectable({
    providedIn: 'root'
})
export class OfferLinesService extends TransactionLinesClass {

    constructor(protected override httpSrv: HttpService) {
        super(httpSrv,  '/detail', '/offers');
    }
}
