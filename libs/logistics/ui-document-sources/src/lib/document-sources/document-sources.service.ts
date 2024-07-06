import { Injectable } from '@angular/core';
import { BaseEntityService } from '@ss/common/api-base-entity';
import { HttpService } from '@ss/common/api-common';
import { INVENTORY, Source, SOURCES } from './document-sources.api';
import { Observable } from 'rxjs';

@Injectable( {
    providedIn: 'root'
})
export class DocumentSourcesService extends BaseEntityService<Source> {
    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, SOURCES, INVENTORY);
    }

    getData(): Observable<Source[]> {
        return this.httpSrv
            .get<Source[]>(`/inventory/${this.getParentId()}/sources`)
    }

}
