import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
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

    public getList(page: number, pageSize: number, filter?: string, sortBy?: string, extraPrams?: HttpParams): Observable<{ itemCount: number, body: T[] }> {
        return this.httpSrv.getData<T>(this.getUrl(), page, pageSize, filter, sortBy, extraPrams);
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
        return isString(id) ?
            this.httpSrv.get(this.getUrl() + '?find=' + id) :
            this.httpSrv.get(this.getUrl() + '/' + id);
    }

    public remove(id: number): Observable<any> {
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

    protected getUrl(): string {
        if (this.parentUrl && !this.parentId) {
            throw Error('No parent id was given !')
        }

        return this.parentUrl ? `${this.parentUrl}/${this.parentId}${this.url}` : this.url;
    }

    setURL(url: string) {
        this.url = url;
    }
}
