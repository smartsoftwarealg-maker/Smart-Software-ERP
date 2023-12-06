import {Injectable} from '@angular/core';
import {HttpService} from '@ss/common/api-common';
import { TransactionLinesClass } from '@ss/logistics/api-transaction';

const DETAIL = '/detail';
const RESERVATIONS = '/reservations';

@Injectable({
    providedIn: 'root'
})
export class ReservationLinesService extends TransactionLinesClass {

    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, DETAIL, RESERVATIONS);
    }
}
