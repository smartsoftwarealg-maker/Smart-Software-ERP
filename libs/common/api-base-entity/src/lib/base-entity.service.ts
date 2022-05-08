import {map} from 'rxjs/operators';
import {Observable, of} from 'rxjs';
import {HttpParams} from '@angular/common/http';
import {HttpService, isString, PaginationModel} from '@ss/common/api-common';

export class BaseEntityService<T> {

    protected parentId: number;

    constructor(protected httpSrv: HttpService, protected url: string, protected parentUrl?: string) {}

    public getPage(pageModel: PaginationModel, filter?: string, sortBy?: string, extraPrams?: HttpParams): Observable<T[]> {
        return this.getList(pageModel.page - 1, pageModel.pageSize, filter, sortBy, extraPrams)
            .pipe(
                map(data => {
                    pageModel.elementCount = data.itemCount;
                    return data.body;
                })
            );
    }

    public getListSimple(): Observable<T[]> {
        return this.httpSrv.get<T[]>(this.getUrl());
    }

    public getList(page: number, pageSize: number, filter?: string, sortBy?: string, extraPrams?: HttpParams): Observable<{ itemCount: number, body: T[] }> {
        return this.httpSrv.getData<T>(this.getUrl(), page, pageSize, filter, sortBy, extraPrams);
    }

    public excel(): Observable<Blob> {
        return this.httpSrv.getBlob(this.getUrl() + '/excel');
    }

    //
    // public get(id: number): Observable<T> {
    //     return this.httpSrv.get(this.getUrl() + '/' + id);
    // }

    /**
     * id is a string for the moment but could be ported to int in the future.
     * @param id
     */
    public get(id: number | string): Observable<T> {
        return id < 1 || id === '-1' ? of(null) :
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

    setParentId(id: number): void {
        this.parentId = id;
    }

    getParentId() {
        return this.parentId;
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
}
