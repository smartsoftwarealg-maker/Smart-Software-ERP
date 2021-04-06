import {Injectable} from '@angular/core';
import {HttpService} from '@ss/common/api-common';
import {BaseEntityService} from '@ss/common/api-base-entity';
import {DELIVERY_URL} from "./delivery-api";
import {Transaction} from "@ss/logistics/api-transaction";


@Injectable({
    providedIn: 'root'
})
export class DeliveryService extends BaseEntityService<Transaction> {

    constructor(protected httpSrv: HttpService) {
        super(httpSrv, DELIVERY_URL);
    }
}
