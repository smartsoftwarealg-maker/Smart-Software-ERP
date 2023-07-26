import { Injectable } from '@angular/core';
import { TransactionLinesClass } from '@ss/logistics/api-transaction';
import { HttpService } from '@ss/common/api-common';

@Injectable({
    providedIn: 'root'
})
export class PartsRequestLineService extends TransactionLinesClass {

    constructor(protected override httpSrv: HttpService) {
        super(httpSrv,  '/detail', '/part-requests');
    }
}
