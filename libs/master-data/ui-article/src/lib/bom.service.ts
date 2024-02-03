import { Injectable } from '@angular/core';
import { BOM, BOM_TREE_URL, BOM_URL, BOMTree } from '@ss/master-data/api-article';
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

    tree(filter?: string): Observable<BOMTree[]> {
        const params = filter? new HttpParams().set('filter', filter): null;
        return this.httpSrv.get<BOMTree[]>(BOM_TREE_URL, params);
    }

    treeById(): Observable<BOMTree[]> {
        return this.httpSrv.get<BOMTree[]>(BOM_TREE_URL, new HttpParams().set('id', this.getParentId() || 0));
    }
}
