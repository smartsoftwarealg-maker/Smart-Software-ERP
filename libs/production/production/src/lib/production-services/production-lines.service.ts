import { Injectable } from '@angular/core';
import {HttpService} from '@ss/common/api-common';
import {TransactionLinesClass} from '@ss/logistics/api-transaction';

@Injectable({
    providedIn: 'root'
})
export class ProductionLinesService extends TransactionLinesClass {

    constructor(protected override httpSrv: HttpService) {
        super(httpSrv,  '/detail', '/production');
    }
}
