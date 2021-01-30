import {Injectable} from '@angular/core';
import {DeliveryLine, DELIVERY_LINE_URL} from './delivery-lines-api';
import {HttpService} from '@ss/common/api-common';
import {BaseEntityExtendedService} from '@ss/common/api-base-entity';


@Injectable({
    providedIn: 'root'
})
export class DeliveryLinesService extends BaseEntityExtendedService<DeliveryLine> {

    constructor(protected httpSrv: HttpService) {
        super(httpSrv, DELIVERY_LINE_URL);
    }
}
