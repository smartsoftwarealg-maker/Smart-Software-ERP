import {HttpService} from '@ss/common/api-common';
import {Observable, of} from 'rxjs';
import {BaseEntityService} from "./base-entity.service";
import {HttpParams} from "@angular/common/http";

export class BaseEntityExtendedService<T> extends BaseEntityService<T> {


    constructor(protected httpSrv: HttpService, protected url: string, protected parentUrl?: string) {
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

    /**
     * id is a string for the moment but could be ported to int in the future.
     * @param id
     */
    public get(id: number | string): Observable<T> {
        return typeof id === 'string' ?
        this.httpSrv.get(this.getUrl() + '/?find=' + id) :
            this.httpSrv.get(this.getUrl() + '/' + id);
    }
}
