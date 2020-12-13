import {Component, OnInit,} from '@angular/core';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute, Router} from '@angular/router';
import {ConfirmationDialogService} from "@ss/common/ui-confirmation-dialog";
import {ReceptionLines, ReceptionLinesService} from "@ss/stock/api-reception-lines";
import {Observable} from "rxjs";
import {map, switchMap, tap} from "rxjs/operators";
import {PaginationModel} from "@ss/common/ui-pagination";
import {LINES_DETAIL_URL} from "@ss/common/api-common";
import {Article, ArticleService} from "@ss/stock/api-article";
import {StoreName, StoreNameService} from "@ss/common/api-lookup";

@Component({
    selector: 'ss-reception-lines-list',
    styleUrls: ['./reception-lines-list.component.scss'],
    templateUrl: './reception-lines-list.component.html'
})
export class ReceptionLinesListComponent implements OnInit {

    //
    public readonly pagination = PaginationModel.newInstance();

    parentId: number;
    data: ReceptionLines[];
    selected: number;

    articles: { [reference: string]: string; } = {};
    stores: { [id: number]: string; } = {};

    displayedColumns = [
        'position',
        'store',
        'reference',
        'description',
        'qtySatisfied',
        'price',
        'controls'
    ];


    constructor(
        public receptionLinesSrv: ReceptionLinesService,
        public shellSrv: ShellService,
        public snackBarSrv: SnackBarService,
        public route: ActivatedRoute,
        public router: Router,
        public articleSrv: ArticleService,
        public storeNamesSrv: StoreNameService,
        public confirmationSrv: ConfirmationDialogService) {
    }


    ngOnInit() {
        this.getCurrentReceptionId().subscribe(x => {
            if (x) {
                this.parentId = x;
                this.receptionLinesSrv.setParentId(x);
                this.loadReceptionLines();
                this.pagination.onChange = () => this.loadReceptionLines();
            }
        });
    }


    getCurrentReceptionId(): Observable<number> {
        return this.route.queryParams.pipe(map(p => +p.id))
    }

    loadReceptionLines() {
        this.shellSrv.setLoading(true);
        this.receptionLinesSrv.getPage(this.pagination, null, null)
            .subscribe(x => {
                this.data = x;
                this.loadRelatedTables(this.data)
                    .subscribe(none => {
                        this.shellSrv.setLoading(false);
                    })
            });
    }

    loadRelatedTables(data): Observable<any> {

        const storesIds = this.data.map(x => x.store);
        const articleReferences = this.data.map(x => x.reference);

        return this.storeNamesSrv.getAll(storesIds)
            .pipe(tap(st => this.onStoresLoaded(st)))
            .pipe(switchMap(x => this.articleSrv.getAll(articleReferences, 'reference')))
            .pipe(tap(art => this.onArticlesLoaded(art)))
    }

    select(id: number): void {
        this.selected = id;
    }

    public deleteSelected(): void {
        this.confirmationSrv.confirmDelete()
            .subscribe(b => {
                if (b) {
                    if (this.selected && this.selected > 0) {
                        const a = this.data.filter(x => x.id === this.selected)[0];
                        if (a && a.id) {
                            this.shellSrv.setLoading(true);
                            this.receptionLinesSrv.remove(a.id)
                                .subscribe(
                                    () => {
                                        this.snackBarSrv.showSuccessMessage();
                                        this.loadReceptionLines();
                                    },
                                    err => {
                                        this.snackBarSrv.showFailureMessage();
                                        this.shellSrv.setLoading(false);
                                        throw err;
                                    }
                                );
                        }
                    }
                }
            })
    }

    edit() {
        if (this.selected) {
            this.showDetail(this.selected);
        }
    }

    public showDetail(id: number): void {
        const params = {
            parent: this.parentId,
            id: id
        };
        this.router.navigate(['../' + LINES_DETAIL_URL], {relativeTo: this.route.parent, queryParams: params})
            .then();
    }


    private onArticlesLoaded(data: Article[]) {
        this.articles = data.reduce(
            (total, currentValue) => {
                total[currentValue.reference] = currentValue.description2;
                return total
            }, {}
        );
    }

    private onStoresLoaded(data: StoreName[]) {
        this.stores = data.reduce(
            (total, currentValue) => {
                total[currentValue.id] = currentValue.description;
                return total
            }, {}
        );
    }

}
