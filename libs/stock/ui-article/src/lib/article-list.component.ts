import { Component, OnDestroy, OnInit } from '@angular/core';
import { ShellService, ToolbarButton, SnackBarService } from '@ss/common/ui-shell';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticleService, Article } from '@ss/stock/api-article';
import { StockLookups, Mark, Vat } from '@ss/stock/api-lookup';
import { switchMap, tap } from 'rxjs/operators';
import { BaseEntityListComponent } from '@ss/common/api-base-entity';
import { Observable } from 'rxjs';


@Component({
    selector: 'ss-article-list',
    styleUrls: ['./article-list.component.scss'],
    templateUrl: './article-list.component.html'
})
export class ArticleListComponent extends BaseEntityListComponent<Article> {

    displayedColumns = [
        'reference',
        'description2',
        'price',
        'vat',
        'mark',
        'accountno'
    ];

    marks: { [id: number]: string; };
    vats: { [id: number]: number; };

    constructor(
        public articleSrv: ArticleService,
        public shellSrv: ShellService,
        public snackBarSrv: SnackBarService,
        public route: ActivatedRoute,
        public router: Router,
        public stockLookupsSrv: StockLookups) {
        super(articleSrv, shellSrv, snackBarSrv, route, router, 'STOCK_ARTICLES');
    }

    preload(): Observable<any> {
        return this.stockLookupsSrv.getMarks()
            .pipe(
                tap(x => this.onMarksLoaded(x)),
                switchMap(() => this.stockLookupsSrv.getVats()),
                tap(x => this.onVatsLoaded(x))
            );
    }

    onMarksLoaded(data: Mark[]) {
        this.marks = {};
        data.forEach(m => this.marks[m.id] = m.description);
    }

    onVatsLoaded(data: Vat[]) {
        this.vats = {};
        data.forEach(m => this.vats[m.id] = m.value);
    }

}
