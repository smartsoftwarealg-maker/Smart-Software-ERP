import { AbstractDataSource } from './abstract-data-source';
import { SnackBarService } from '../snack-bar.service';
import { Observable } from 'rxjs';
import { PaginationModel } from '../pagination/pagination.component';
import { switchMap } from 'rxjs/operators';
import { AbstractEntityView } from './abstract-entity-view';
import { LoadingState } from '../util';
import { OnDestroy, Directive } from '@angular/core';
import { SortDirection } from '@angular/material/sort';
import { Right } from '../../smart-lib/common/models';

@Directive()
export class AbstractEntityList<T, S extends AbstractDataSource<T>> extends AbstractEntityView<T, S> implements OnDestroy {

    selectedId = 0;
    sort: { active: string, direction: SortDirection } = { active: null, direction: '' };
    data: T[] = [];
    paginationModel: PaginationModel;

    saveFn = (x, y) => this.save(x, y);

    constructor(public dataSrc: S, public accessRight: Right, public override snackBarSrv: SnackBarService, paginationModel: PaginationModel) {
        super(dataSrc, accessRight, snackBarSrv);
        this.paginationModel = paginationModel;
        this.paginationModel.onChange = this.onPaginationChanged.bind(this);
    }

    protected loadMoreData(): Observable<any> {
        return null;
    }

    public refresh(): void {
        if (!this.accessRight.read) {
            return;
        }
        this.clearSelection();
        this.loadingState = LoadingState.LOADING;
        this.data = [];
        const getDataObservable = this.dataSrc.refresh(this.paginationModel.page - 1, this.paginationModel.pageSize);
        let observable = this.loadMoreData();
        if (observable == null) {
            observable = getDataObservable;
        } else {
            observable = observable.pipe(switchMap(() => getDataObservable));
        }
        observable.subscribe(r => {
            this.data = r.data;
            this.paginationModel.elementCount = r.itemCount;
            this.afterLoading();
            this.loadingState = LoadingState.COMPLETE;
        }, e => {
            this.loadingState = LoadingState.ERROR;
            throw e;
        });
    }

    public setFilter(filter: string): void {
        this.dataSrc.setFilter(filter);
        this.refresh();
    }

    public onPaginationChanged(): void {
        this.refresh();
    }

    public sortData(sort: any) {
        if (sort.direction === 'asc') {
            this.dataSrc.setSortBy(sort.active);
        } else if (sort.direction === 'desc') {
            this.dataSrc.setSortBy('-' + sort.active);
        } else {
            this.dataSrc.setSortBy(null);
        }
        this.sort = sort;
        this.refresh();
    }

    public select(id: number): void {
        this.selectedId = id;
    }

    public clearSelection(): void {
        this.selectedId = 0;
    }

    public removeSelected() {
        if (this.selectedId) {
            this.remove(this.selectedId, b => {
                if (b) {
                    this.paginationModel.elementCount--;
                    this.clearSelection();
                }
            });
        }
    }

    protected afterLoading() {
    }

    ngOnDestroy(): void {
        this.paginationModel.onChange = null;
    }

}
