import { Injectable } from '@angular/core';
import {HttpService} from '@ss/common/api-common';
import {BaseEntityExtendedService} from '@ss/common/api-base-entity';
import {Observable, of} from 'rxjs';
import {TransactionLine} from './transaction-line';
import {Transaction} from './transaction';
import {TransactionLinesClass} from './transaction-lines.class';

@Injectable({
    providedIn: 'root'
})
export class OfferLinesService extends TransactionLinesClass {

    constructor(protected httpSrv: HttpService) {
        super(httpSrv,  '/detail', '/offers');
    }
}
