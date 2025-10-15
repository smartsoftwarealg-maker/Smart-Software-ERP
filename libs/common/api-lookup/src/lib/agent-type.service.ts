import {Injectable} from '@angular/core';
import { HttpService } from '@ss/common/api-common';
import {AGENT_TYPE_URL} from './lookups-api';
import {BaseEntityService} from '@ss/common/api-base-entity';
import { Lookup } from './lookup.class';
import { Observable, of } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AgentTypeService extends BaseEntityService<Lookup> {
    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, AGENT_TYPE_URL);
    }

    public override get(iid: number): Observable<Lookup> {
        const id = iid === undefined || iid === null ? 0 : iid;
        return (id as number) < 0 ? of(null) : this.httpSrv.get(this.getUrl() + '/' + id);
    }
}
