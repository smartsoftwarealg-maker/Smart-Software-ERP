import { Injectable } from '@angular/core';
import { BOM, BOM_TREE_URL, BOM_URL, BOMTree, MANUFACTORING_BOMS_URL } from '@ss/master-data/api-article';
import { BaseEntityService } from '@ss/common/api-base-entity';
import { HttpService } from '@ss/common/api-common';
import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class BomService extends BaseEntityService<BOM> {

    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, BOM_URL);
    }

    tree(filter?: string, id?: number): Observable<BOMTree[]> {
        const params = filter? new HttpParams().set('filter', filter) : null;
        const params2 = id ? (params||new HttpParams()).set('id', id.toString()) : params;
        return this.httpSrv.get<BOMTree[]>('/articles/tree', params2);
    }

    treeById(): Observable<BOMTree[]> {
        return this.httpSrv.get<BOMTree[]>(BOM_TREE_URL, new HttpParams().set('id', this.getParentId() || 0));
    }

    versions(reference: string, version: string): Observable<BOM[]> {
        const params = new HttpParams().set('reference', reference).set('version', version);
        return this.httpSrv.get<BOM[]>('/manufacturing/bom-versions', params);
    }

    duplicate(bomId: number): Observable<{ id: number}> {
        return this.httpSrv.put(`/manufacturing/bom-duplicate/${bomId}`);
    }
}
