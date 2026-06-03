import { Injectable } from '@angular/core';
import { HttpService } from '@ss/common/api-common';
import {BaseEntityService} from '@ss/common/api-base-entity';
import {
    ActivityCategory,
    ActivityCategoryTree,
    BOM,
    BOM_TREE_URL,
    CATEGORY_TREE_URL,
    CATEGORY_URL,
} from '@ss/master-data/api-article';
import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';



@Injectable({
    providedIn: 'root',
})
export class CategoriesService extends BaseEntityService<ActivityCategory> {
    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, CATEGORY_URL);
    }

    tree(filter?: string, id?: number): Observable<ActivityCategoryTree[]> {
        const params = filter ? new HttpParams().set('filter', filter) : null;
        const params2 = id
            ? (params || new HttpParams()).set('id', id.toString())
            : params;
        return this.httpSrv.get<ActivityCategoryTree[]>(
            CATEGORY_TREE_URL,
            params2,
        );
    }

    treeById(): Observable<ActivityCategoryTree[]> {
        return this.httpSrv.get<ActivityCategoryTree[]>(
            CATEGORY_TREE_URL,
            new HttpParams().set('id', this.getParentId() || 0),
        );
    }

    // versions(
    //     reference: string,
    //     version: string,
    // ): Observable<ActivityCategory[]> {
    //     const params = new HttpParams()
    //         .set('reference', reference)
    //         .set('version', version);
    //     return this.httpSrv.get<BOM[]>('/manufacturing/bom-versions', params);
    // }
    //
    // duplicate(bomId: number): Observable<{ id: number }> {
    //     return this.httpSrv.put(`/manufacturing/bom-duplicate/${bomId}`);
    // }
}
