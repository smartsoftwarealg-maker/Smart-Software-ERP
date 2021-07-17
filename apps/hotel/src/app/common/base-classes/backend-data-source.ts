import { AbstractDataSource } from './abstract-data-source';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { isString } from '@ss/common/api-common';
import { HttpService } from '../../smart-lib/common/http.service';

export class BackendDataSource<T> extends AbstractDataSource<T> {

    protected filter = '';
    protected sortBy: string = null;

    constructor(public httpSrv: HttpService, public url: string) {
        super();
    }

    public setFilter(filter: string): void {
        this.filter = filter;
    }

    public refresh(page: number, pageSize: number): Observable<{ data: T[], itemCount: number }> {
        if (this.url == null) {
            return of({ data: [], itemCount: 0 });
        }
        return this.httpSrv
            .getData<T>(this.url, page, pageSize, this.filter, this.sortBy)
            .pipe(map((r: { itemCount: number, body: T[] }) => {
                return { data: r.body, itemCount: r.itemCount };
            }));
    }

    public setSortBy(sortBy: string): void {
        this.sortBy = sortBy;
    }

    remove(id: number): Observable<boolean> {
        if (this.url == null) {
            return of(false);
        }
        return this.httpSrv.removeById(this.url, id)
            .pipe(map(() => true));
    }

    save(obj: T): Observable<boolean> {
        const id = (obj as any).id;
        if (this.url == null || id == null || !Number.isFinite(id)
            || Number.isNaN(id) || !Number.isInteger(id)) {
            return of(false);
        }
        return id > 0
            ? this.httpSrv.put(this.url, obj).pipe(map(() => true))
            : this.httpSrv.post(this.url, obj).pipe(map(newId => {
                if (isString(newId)) {
                    newId = +newId;
                }
                (obj as any).id = newId;
                return true;
            }));
    }

    getById(id: number | string): Observable<T> {
        if (this.url == null) {
            return of(null);
        }
        return this.httpSrv.get<T>(this.url + '/' + id);
    }
}
