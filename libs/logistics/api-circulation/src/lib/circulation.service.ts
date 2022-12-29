import {Injectable} from '@angular/core';
import {HttpService, PaginationModel} from '@ss/common/api-common';
import {BaseEntityService} from '@ss/common/api-base-entity';
import {Circulation, CIRCULATION_URL} from './circulation-api';
import {ARTICLES_URL} from '@ss/stock/api-article';
import {Observable} from 'rxjs';
import {HttpParams} from '@angular/common/http';
import {map} from 'rxjs/operators';


@Injectable({
    providedIn: 'root'
})
export class CirculationService extends BaseEntityService<Circulation> {

    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, CIRCULATION_URL, ARTICLES_URL);
    }

    loadByReference(paginator: PaginationModel, filter: string | null, sortBy: string | null, reference: string | null): Observable<Circulation[]> {
        return this.httpSrv
            .getData<Circulation>(`${ARTICLES_URL}${CIRCULATION_URL}`,
                paginator.page - 1,
                paginator.pageSize,
                filter,
                sortBy,
                new HttpParams().set('find', reference))
            .pipe(
                map((data: { itemCount: number, body: Circulation[] }) => {
                    paginator.elementCount = data.itemCount;
                    return data.body;
                })
            );
    }
}
