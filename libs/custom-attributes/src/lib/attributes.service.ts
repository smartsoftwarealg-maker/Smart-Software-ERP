import { Injectable } from '@angular/core';
import {BaseEntityService} from '@ss/common/api-base-entity';
import {ATTRIB_MODULES_URL, ATTRIB_TEMPL_URL, AttribTempl, AttribVal} from './attributes';
import {HttpService} from '@ss/common/api-common';
import {Lookup} from '@ss/common/api-lookup';
import {HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AttributesService extends BaseEntityService<AttribTempl> {
    readonly LOOKUP = 4;
    attributeTypes: Lookup[] = [
        {id: 1, description: 'ADMINISTRATION_TEXT'},
        {id: 2, description: 'ADMINISTRATION_INT'},
        {id: 3, description: 'ADMINISTRATION_DECIMAL'},
        {id: this.LOOKUP, description: 'ADMINISTRATION_LOOKUP'},
        {id: 5, description: 'COMMON_DATE'},
    ];

    modules: Lookup[] = [
        {id: 1, description: 'LOGISTICS_ARTICLES'},
        {id: 2, description: 'ASSETS'},
    ];

    constructor(protected override httpSrv: HttpService) {
        super(httpSrv, ATTRIB_TEMPL_URL, ATTRIB_MODULES_URL);
        this.setParentId(0);
    }

    getValueList(id: number,
                 page: number,
                 pageSize: number,
                 filter?: string,
                 sortBy?: string,
                 extraPrams?: HttpParams): Observable<{ itemCount: number; body: AttribVal[] }> {
        return this.httpSrv.getData<AttribVal>(`/attributes/${id}/values`, page, pageSize, filter, sortBy, extraPrams);
    }

    deleteLookupValue(v: AttribVal): Observable<any> {
        return this.httpSrv.remove(`/attributes/${v.code}/values/${v.id}`);
    }

    saveLookupValue(v: AttribVal): Observable<number> {
        return v.id?
         this.httpSrv
            .put(`/attributes/${v.code}/values`, v)
            .pipe(map((res: { count: number }) => res.count)):
         this.httpSrv
            .post(`/attributes/${v.code}/values`, v)
            .pipe(map((res: { id: number }) => res.id));

    }
}
