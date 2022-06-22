import { Injectable } from '@angular/core';
import {BaseEntityService} from '@ss/common/api-base-entity';
import {ATTRIB_MODULES_URL, ATTRIB_TEMPL_URL, AttribTempl, AttribVal} from './attributes';
import {HttpService} from '@ss/common/api-common';
import {Lookup} from '@ss/common/api-lookup';
import {HttpParams} from '@angular/common/http';
import {Observable, tap} from 'rxjs';
import {map} from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class AttributesService extends BaseEntityService<AttribTempl> {
    readonly TEXT    = 1;
    // readonly INT     = 2;
    readonly DECIMAL = 2;
    readonly LOOKUP  = 3;
    readonly DATE    = 4;

    readonly ARTICLES = 1;
    readonly ASSETS   = 2;

    attributeTypes: Lookup[] = [
        {id: this.TEXT, description: 'ADMINISTRATION_TEXT'},
        // {id: 2, description: 'ADMINISTRATION_INT'},
        {id: this.DECIMAL, description: 'ADMINISTRATION_DECIMAL'},
        {id: this.LOOKUP, description: 'ADMINISTRATION_LOOKUP'},
        {id: this.DATE, description: 'COMMON_DATE'},
    ];

    modules: Lookup[] = [
        {id: this.ARTICLES, description: 'LOGISTICS_ARTICLES'},
        {id: this.ASSETS, description: 'ASSETS'},
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

    getChildAttributes(): Observable<AttribTempl[]> {
        this.setParentId(this.ASSETS);
        return this.getList(0, 50)
            .pipe(map(res => res.body));
    }

    attributeList(modeuleId: number, attribType: number): Observable<AttribTempl[]> {
        this.setParentId(modeuleId);
        return this.getList(0, 50)
            .pipe(map(res => res.body.filter(e => e.attType === attribType)));
    }

    override getList(page: number, pageSize: number, filter?: string, sortBy?: string, extraPrams?: HttpParams): Observable<{ itemCount: number; body: AttribTempl[] }> {
        return super.getList(page, pageSize, filter, sortBy, extraPrams);
    }
}
