import {HttpService, isString} from '@ss/common/api-common';
import {Observable, of} from 'rxjs';
import {BaseEntityService} from './base-entity.service';
import {HttpParams} from '@angular/common/http';

export class BaseEntityExtendedService<T> extends BaseEntityService<T> {

    constructor(protected override httpSrv: HttpService,
                protected override url: string,
                protected override parentUrl?: string) {
        super(httpSrv, url, parentUrl);
    }

    public getAll(ids: any[], paramName: string = 'ids'): Observable<T[]> {
        if (ids && ids.length > 0) {
            const param = new HttpParams().set(paramName, ids.join(','));
            return this.httpSrv.get(this.getUrl(), param);
        } else {
            return of([]);
        }
    }
}
