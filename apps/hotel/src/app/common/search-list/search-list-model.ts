import {Observable} from 'rxjs';
import {PaginationModel} from '../pagination/pagination.component';
import {tap} from 'rxjs/operators';

export abstract class SearchListModel<T> {

    public readonly paginationModel = PaginationModel.newInstance({page: 1, pageSize: 5, elementCount: 0});

    private selected: T;
    public lastFilter;
    public onChange: (T) => void;

    protected constructor() {
    }

    public refresh(filter: string): Observable<T[]> {
        this.lastFilter = filter == null || filter.trim().length === 0 ? null : filter.trim();
        return this.filter(this.lastFilter, this.paginationModel.page - 1, this.paginationModel.pageSize)
            .pipe(tap(() => this.paginationModel.elementCount = this.getItemCount()));
    }

    setSelected(s: T): void {
        this.selected = s;
        if (this.onChange) {
            this.onChange(s);
        }
    }

    getSelected(): T {
        return this.selected;
    }

    protected abstract filter(filter: string, page: number, pageSize: number): Observable<T[]>;

    public abstract getItemCount(): number;

    public abstract toString(obj: T): string;

}
