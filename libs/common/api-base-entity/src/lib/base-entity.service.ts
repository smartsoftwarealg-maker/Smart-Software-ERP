import {map} from 'rxjs/operators';
import {Observable, of} from 'rxjs';
import {HttpParams, HttpResponse} from '@angular/common/http';
import {HttpService, isString, PaginationModel} from '@ss/common/api-common';
import {Sort} from '@angular/material/sort';
import { signal } from '@angular/core';

export class BaseEntityService<T> {
    private _sortColumn: string = null;
    protected parentId: number;

    selectedId = signal<number>(0);
    currentPage = 1;

    constructor(protected httpSrv: HttpService, protected url: string, protected parentUrl?: string) {}

    public getPage(pageModel: PaginationModel, filter?: string, sortBy?: string, extraPrams?: HttpParams): Observable<T[]> {
        return this.getList(pageModel.page - 1, pageModel.pageSize, filter, this._sortColumn, extraPrams)
            .pipe(
                map(data => {
                    pageModel.elementCount = data.itemCount;
                    return data.body;
                })
            );
    }

    public getData2(page: number, pageSize: number, filter?: string, sortBy?: string, extraPrams?: HttpParams): Observable<T[]> {
        return this.httpSrv.getData<T>(this.getUrl(), page, pageSize, filter, this._sortColumn || sortBy, extraPrams).pipe(map(data => data.body));
    }

    public getListSimple(): Observable<T[]> {
        return this.httpSrv.get<T[]>(this.getUrl());
    }

    public getList(page: number, pageSize: number, filter?: string, sortBy?: string, extraPrams?: HttpParams): Observable<{ itemCount: number, body: T[] }> {
        return this.httpSrv.getData<T>(this.getUrl(), page, pageSize, filter, this._sortColumn || sortBy, extraPrams);
    }

    public excel(filter?: string): Observable<Blob> {
        const params = filter? new HttpParams().set('filter', filter) : null;
        return this.httpSrv.getBlob(this.getUrl() + '/excel', params);
    }
    public getBlob(url: string, httpParams?: HttpParams): Observable<Blob> {
        return  this.httpSrv.getBlob(this.getUrl() + url, httpParams);
    }

    public json(filter?: string): Observable<Blob> {
        const params = filter? new HttpParams().set('filter', filter) : null;
        return this.httpSrv.getBlob(this.getUrl() + '/json', params);
    }

    public excelWithParams(params?: HttpParams): Observable<Blob> {
        return this.httpSrv.getBlob(this.getUrl() + '/excel', params);
    }

    //
    // public get(id: number): Observable<T> {
    //     return this.httpSrv.get(this.getUrl() + '/' + id);
    // }

    /**
     * id is a string for the moment but could be ported to int in the future.
     * @param iid
     */
    public get(iid: number | string): Observable<T> {
        const id = iid === undefined || iid === null ? 0 : iid;
        return (id as number) < 1 || id === '-1' ? of(null) :
            isString(id) ?
                this.httpSrv.get(this.getUrl() + '?find=' + id) :
                this.httpSrv.get(this.getUrl() + '/' + id);
    }

    public remove(id: number): Observable<{ count: number}> {
        return this.httpSrv.remove(this.getUrl() + '/' + id);
    }

    public add(a: T): Observable<number> {
        return this.httpSrv
            .post(this.getUrl(), a)
            .pipe(map((res: { id: number }) => res.id));
    }

    public save(a: T): Observable<number> {
        return (a as any).id ? this.update(a) : this.add(a);
    }

    public update(a: T): Observable<number> {
        return this.httpSrv
            .put(this.getUrl(), a)
            .pipe(map((res: { count: number }) => res['count']));
    }

    public add2(a: T): Observable<number> {
        return this.httpSrv
            .put(this.getUrl(), a)
            .pipe(map((res: { id: number }) => res['id']));
    }

    setParentId(id: number): void {
        this.parentId = id;
    }

    getParentId() {
        return this.parentId;
    }
    public putBlob(url: string, data?: any | null): Observable<ArrayBuffer> {
        return this.httpSrv.putBlob(this.getUrl() + url, data);
    }
    protected getUrl(): string {
        if (this.parentUrl) {
            if (this.parentId == null) {
                throw Error('No parent id was given !');
            }
            const parentUrl = this.parentUrl.endsWith('/') ? this.parentUrl : (this.parentUrl + '/');
            return `${parentUrl}${this.parentId}${this.url}`;
        }
        return this.url;
    }

    setURL(url: string) {
        this.url = url;
    }

    setParentURL(url: string) {
        this.parentUrl = url;
    }

    set sortColumn(s: Sort) {
        this._sortColumn = (s.direction === 'desc' ? '-' : '') + s.active;
    }

    get sortColumn(): string {
        return this._sortColumn;
    }

    public getStatus(url: string, uuid: string): Observable<HttpResponse<Object>> {
        return this.httpSrv
            .getBlobResponse(url, new HttpParams().set('uuid', uuid));
    }
}
