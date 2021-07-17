import {Observable} from 'rxjs';

export abstract class AbstractDataSource<T> {

    public abstract refresh(page: number, pageSize: number): Observable<{ data: T[], itemCount: number }>;

    public abstract setFilter(filter: string): void;

    public abstract setSortBy(sortBy: string): void;

    public abstract remove(id: number): Observable<boolean>;

    public abstract save(obj: T): Observable<boolean>;

    public abstract getById(id: number | string): Observable<T>;
}
