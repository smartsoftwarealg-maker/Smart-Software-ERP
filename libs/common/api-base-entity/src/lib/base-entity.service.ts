import {map} from 'rxjs/operators';
import {HttpService} from '@ss/common/api-common';
import {PaginationModel} from '@ss/common/ui-pagination';
import {Observable} from 'rxjs';

export class BaseEntityService<T> {

    private _parentId: number

    constructor(protected httpSrv: HttpService, protected url: string, protected parentUrl?: string) {
    }

    public getPage(pageModel: PaginationModel, filter?: string, sortBy?: string): Observable<T[]> {
        return this.getList(pageModel.page - 1, pageModel.pageSize, filter, sortBy)
            .pipe(
                map(data => {
                    pageModel.elementCount = data.itemCount;
                    return data.body;
                })
            );
    }

    public getList(page: number, pageSize: number, filter?: string, sortBy?: string): Observable<{ itemCount: number, body: T[] }> {
        return this.httpSrv.getData<T>(this.getUrl(), page, pageSize, filter, sortBy);
    }

    public get(id: number): Observable<T> {
        return this.httpSrv.get(this.getUrl() + '/' + id);
    }

    public remove(id: number): Observable<void> {
        return this.httpSrv.remove(this.getUrl() + '/' + id);
    }

    public add(a: T): Observable<number> {
        return this.httpSrv.post(this.getUrl(), a)
            .pipe(map(id => +id));
    }

    public update(a: T): Observable<void> {
        return this.httpSrv.put(this.getUrl(), a);
    }

    set parentId(value: number) {
        this._parentId = value;
    }

    protected getUrl(): string {

        if (this.parentUrl && !this._parentId) {
            throw Error("No parent id was given !")
        }

        return this.parentUrl ? `${this.parentUrl}/${this._parentId}${this.url}` : this.url;
    }
}
