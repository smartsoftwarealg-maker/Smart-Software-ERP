import {Observable} from "rxjs";

export interface AutoCompleteService<T> {

    getList(page: number, pageSize: number, filter?: string, sortBy?: string): Observable<{ itemCount: number, body: T[] }>;

    get(id: number): Observable<T>;

    getByFilter(filterBy: string, value: string): Observable<T>;

}
