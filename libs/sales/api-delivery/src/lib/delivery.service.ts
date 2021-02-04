import {Injectable} from '@angular/core';
import {HttpService} from '@ss/common/api-common';
import {BaseEntityService} from '@ss/common/api-base-entity';
import {DELIVERY_URL, Delivery} from "./delivery-api";


@Injectable({
    providedIn: 'root'
})
export class DeliveryService extends BaseEntityService<Delivery> {

    constructor(protected httpSrv: HttpService) {
        super(httpSrv, DELIVERY_URL);
    }
}
