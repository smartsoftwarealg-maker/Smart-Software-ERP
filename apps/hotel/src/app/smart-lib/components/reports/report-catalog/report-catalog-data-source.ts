import { catchError, finalize } from 'rxjs/operators';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { ReportCatalog } from '../report-catalog';
import { ReportCatalogService } from './report-catalog.service';
import { PaginationModel } from '../../../../common/pagination/pagination.component';

export class ReportCatalogDataSource implements DataSource<ReportCatalog> {

    public pagingModel = PaginationModel.newInstance({ pageSize: 5, elementCount: 0, page: 1 });
    private catalogSubject = new BehaviorSubject<ReportCatalog[]>([]);
    private loadingSubject = new BehaviorSubject<boolean>(false);

    constructor(private catalogService: ReportCatalogService) {
    }

    loadReportCatalog() {
        this
            .catalogService
            .load(this.pagingModel.page, this.pagingModel.pageSize)
            .pipe(
                catchError(() => of([])),
                finalize(() => this.loadingSubject.next(false))
            ).subscribe((catalog: {body: any[], itemCount: number}) => {
                this.catalogSubject.next(catalog.body);
                this.pagingModel.elementCount = catalog.itemCount;
            });
    }

    connect(collectionViewer: CollectionViewer): Observable<ReportCatalog[]> {
        return this.catalogSubject.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer): void {
        this.catalogSubject.complete();
        this.loadingSubject.complete();
    }

    delete(id: number) {
        const value = this.catalogSubject.getValue().filter(e => e.id !== id);
        this.catalogSubject.next(value);
    }
}
