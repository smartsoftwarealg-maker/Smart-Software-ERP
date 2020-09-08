import { map } from 'rxjs/operators';
import { HttpService } from '@ss/common/api-common';
import { PaginationModel } from '@ss/common/ui-pagination';
import { Observable } from 'rxjs';

export class BaseEntityService<T> {

    constructor(protected httpSrv: HttpService, protected url: string) {}

    public getPage(pageModel: PaginationModel, filter?: string, sortBy?: string): Observable<T[]> {
        return this.getList(pageModel.page - 1, pageModel.pageSize, filter, sortBy)
            .pipe(
                map(data => {
                    pageModel.elementCount = data.itemCount;
                    return data.body;
                })
            );
    }

    public getList(page: number, pageSize: number, filter?: string, sortBy?: string): Observable<{itemCount: number, body: T[]}> {
        return this.httpSrv.getData<T>(this.url, page, pageSize, filter, sortBy);
    }

    public get(id: number): Observable<T> {
        return this.httpSrv.get(this.url + '/' + id);
    }

    public remove(id: number): Observable<void> {
        return this.httpSrv.remove(this.url + '/' + id);
    }

    public add(a: T): Observable<number> {
        return this.httpSrv.post(this.url, a)
            .pipe(map(id => +id));
    }

    public update(a: T): Observable<void> {
        return this.httpSrv.put(this.url, a);
    }
}
