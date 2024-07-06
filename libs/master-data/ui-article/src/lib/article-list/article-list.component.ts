import {Component, OnInit,} from '@angular/core';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ArticleService, Article } from '@ss/master-data/api-article';
import {BaseEntityListComponent} from '@ss/common/ui-base-entity';
import {Observable, of} from 'rxjs';
import {LookupsService} from '@ss/common/api-lookup';
import { CommonUiConfirmationDialogModule, ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import {DefaultReportService} from '@ss/common/ui-default-report-component';
import { CommonUiImageInputModule, ImageModel } from '@ss/common/ui-image-input';
import { HttpService, MaterialModule, PaginatorPersistenceService } from '@ss/common/api-common';
import {FormControl} from '@angular/forms';
import {debounceTime, distinctUntilChanged} from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { CommonUiLangModule } from '@ss/common/ui-lang';
import { UiPaginationModule } from '@ss/common/ui-pagination';
import { StockUiArticleStoreModule } from '@ss/stock/article-store';

import { CommonUiAutoCompleteModule } from '@ss/common/ui-auto-complete';
import { LogisticsUiStockInfoModule } from '@ss/logistics/ui-stock-info';
import { DocInfoComponent } from '@ss/logistics/ui-doc-info';

@Component({
    selector: 'ss-article-list',
    styleUrls: ['./article-list.component.scss'],
    templateUrl: './article-list.component.html',
    standalone: true,
    imports: [
        CommonModule,
        MaterialModule,
        CommonUiLangModule,
        UiPaginationModule,
        CommonUiConfirmationDialogModule,
        StockUiArticleStoreModule,

        RouterModule,
        CommonUiImageInputModule,
        CommonUiAutoCompleteModule,
        LogisticsUiStockInfoModule,
        DocInfoComponent
    ]
})
export class ArticleListComponent extends BaseEntityListComponent<Article> implements OnInit {
    filterCtrl = new FormControl<number>(this.entitySrv.getParentId());
    private STOCK_COLS = ['image', 'reference', 'description2', 'markDescription', 'classDescription', 'unitDescription'];
    private SALES_COLS = ['image', 'reference', 'description2', 'markDescription', 'classDescription', 'unitDescription'];
    displayedColumns = this.STOCK_COLS;

    constructor(
        public articleSrv: ArticleService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override router: Router,
        public override confirmationSrv: ConfirmationDialogService,
        public override defReportSrv: DefaultReportService,
        public lookupsSrv: LookupsService,
        public httpSrv: HttpService,
        public override pagPersistSrv: PaginatorPersistenceService) {
        super(articleSrv, shellSrv, snackBarSrv, route, router, confirmationSrv, defReportSrv, pagPersistSrv, 'STOCK_ARTICLES');
    }

    override processLoadedData(data: Article[]): Observable<Article[]> {
        data?.forEach(p => {
            p.imageModel = new ImageModel(this.httpSrv);
            p.imageModel.readOnly = true;
            p.imageModel.setImageUrl(this.articleSrv.getPhotoUrl(p.id), false);
        });
        return of(data);
    }

    override ngOnInit() {
        super.ngOnInit();
        this.route
            .paramMap
            .subscribe(res => {
                this.displayedColumns = res.get('price') === 'price1'? this.SALES_COLS : this.STOCK_COLS;
            });
        this.subscriptions.push(
            this.filterCtrl
                .valueChanges
                .pipe(
                    debounceTime(300),
                    distinctUntilChanged()
                ).subscribe(id => {
                    this.articleSrv.setParentId(id);
                    this.refresh();
                }));
    }
}
