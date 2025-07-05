import { Injectable } from '@angular/core';
import { BaseEntityService } from '@ss/common/api-base-entity';
import { ConsolidationCenter } from './consolidation-api';
import { HttpService } from '@ss/common/api-common';
import { Observable } from 'rxjs';

@Injectable()
export class ConsolidationCenterService extends BaseEntityService<ConsolidationCenter> {
    constructor(httpSrv: HttpService) {
        super(httpSrv, '/accounting/consolidation-centers');
    }

    override update(a: ConsolidationCenter): Observable<number> {
        return a.newRecord? super.add(a) : super.update(a);
    }

    generateAll(): Observable<{ count: number}> {
        return this.httpSrv.put('/accounting/consolidation-centers/generate-all');
    }
}
