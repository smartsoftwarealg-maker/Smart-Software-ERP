import {Injectable} from '@angular/core';
import {BaseEntityService} from '@ss/common/api-base-entity';
import {Anomaly} from './anomaly.interface';
import {HttpService} from '@ss/common/api-common';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class AnomalyService extends BaseEntityService<Anomaly> {
    private readonly URL = '/inventory/anomalies';
    constructor(protected httpSrv: HttpService) {
        super(httpSrv, '/inventory/anomalies');
    }

    fix(): Observable<{ count: number }> {
        return this.httpSrv.put(this.URL);
    }
}
