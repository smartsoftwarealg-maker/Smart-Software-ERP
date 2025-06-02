import { Injectable } from '@angular/core';
import { BaseEntityService } from '@ss/common/api-base-entity';
import { Lookup } from '@ss/common/api-lookup';
import { HttpService } from '@ss/common/api-common';
import { Observable } from 'rxjs';

export interface VPeriod {
    year: number;
    month: number;
}

// service
@Injectable()
export class ValidationService extends BaseEntityService<Lookup> {
    constructor(protected http: HttpService) {
        super(http, '/logistics');
    }

    validateAll(period: VPeriod): Observable<{ count: number }> {
        return this.http.post(`${this.url}/validate-all`, period);
    }
}
