import {ShellService} from "@ss/common/ui-shell";
import {BaseEntityService} from "@ss/common/api-base-entity";
import {Transaction, TransactionLine} from "@ss/logistics/api-transaction";
import {PaginationModel} from "@ss/common/api-common";
import {Observable} from "rxjs";
import {switchMap, tap} from "rxjs/operators";
import {LotsService, Store} from "@ss/common/api-lookup";
import {Article, ArticleService} from "@ss/stock/api-article";

export class DocImportingDocument {
    articles: { [reference: string]: string; } = {};
    stores: { [id: number]: string; } = {};
    public data: TransactionLine[] = [];
    public readonly pagination = PaginationModel.newInstance();

    constructor(public shellSrv: ShellService,
                public storeNamesSrv: LotsService,
                public articleSrv: ArticleService,
                public detailLinesSrv: BaseEntityService<TransactionLine>) {
    }

    loadDetailLines() {
        this.shellSrv.setLoading(true);
        this.detailLinesSrv.getPage(this.pagination, null, null)
            .subscribe(x => {
                this.data = x;
                this.loadRelatedTables(this.data)
                    .subscribe(none => {
                        this.shellSrv.setLoading(false);
                    })
            });
    }

    loadRelatedTables(data: TransactionLine[]): Observable<any> {
        const storesIds = this.data.map(x => x.store);
        const articleReferences = this.data.map(x => x.reference);

        return this.storeNamesSrv.getAll(storesIds)
            .pipe(tap(st => this.onStoresLoaded(st)))
            .pipe(switchMap(x => this.articleSrv.getAll(articleReferences, 'reference')))
            .pipe(tap(art => this.onArticlesLoaded(art)))
    }

    protected onStoresLoaded(data: Store[]) {
        this.stores = data.reduce(
            (total: { [id: number]: string; }, currentValue) => {
                total[currentValue.id] = currentValue.description;
                return total
            }, {}
        );
    }

    protected onArticlesLoaded(data: Article[]) {
        this.articles = data.reduce(
            (total: { [reference: string]: string }, currentValue: Article) => {
                total[currentValue.reference] = currentValue.description2;
                return total
            }, {}
        );
    }
}
