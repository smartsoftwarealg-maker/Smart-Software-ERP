import {Injectable} from '@angular/core';
import {HttpService} from '@ss/common/api-common';
import {BaseEntityService} from '@ss/common/api-base-entity';
import {Transaction} from '@ss/logistics/api-transaction';
import {TRANSFER_RECEPTION_URL, TRANSFER_URL} from './tranfer-api';


@Injectable({
    providedIn: 'root'
})
export class TransferReceptionService extends BaseEntityService<Transaction> {

    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, TRANSFER_RECEPTION_URL);
    }
}
