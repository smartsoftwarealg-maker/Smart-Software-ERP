import {Injectable} from '@angular/core';
import {HttpService} from '@ss/common/api-common';
import {BaseEntityService} from '@ss/common/api-base-entity';
import {Transaction} from '@ss/logistics/api-transaction';

export const RESERVATION_URL = '/reservations';

@Injectable({
    providedIn: 'root'
})
export class ReservationService extends BaseEntityService<Transaction> {

    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, RESERVATION_URL);
    }
}
