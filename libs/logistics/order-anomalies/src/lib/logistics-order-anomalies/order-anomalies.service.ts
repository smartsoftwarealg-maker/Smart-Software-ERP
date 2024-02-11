import { BaseEntityService } from '@ss/common/api-base-entity';
import { OrderAnomaly } from './api-order-anomalies';
import { Injectable } from '@angular/core';
import { HttpService } from '@ss/common/api-common';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class OrderAnomaliesService extends BaseEntityService<OrderAnomaly> {
    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, '/logistics/order-anomalies');
    }

    fix(): Observable<{ count: number }> {
        return this.httpSrv.put('/logistics/order-anomalies');
    }
}
