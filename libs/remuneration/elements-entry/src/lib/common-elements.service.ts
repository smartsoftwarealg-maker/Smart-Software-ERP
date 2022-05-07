import {Injectable} from '@angular/core';
import {BaseEntityService} from '@ss/common/api-base-entity';
import {COMMON_ELEMENTSINFO_URL, ElementsInfo} from '@ss/remuneration/elementsinfo';
import {HttpService} from '@ss/common/api-common';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CommonElementsService extends BaseEntityService<ElementsInfo> {

    constructor(protected httpSrv: HttpService) {
        super(httpSrv, COMMON_ELEMENTSINFO_URL);
    }

    updateAll(data: { field: string, value: number }): Observable<any> {
        return this.httpSrv.put(COMMON_ELEMENTSINFO_URL, data);
    }
}
