import { Component, } from '@angular/core';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { ActivatedRoute, Router, RouterModule } from "@angular/router";
import { Mark } from '@ss/common/api-lookup';
import { switchMap, tap } from 'rxjs/operators';
import {BaseEntityListComponent} from '@ss/common/ui-base-entity';
import { Observable } from 'rxjs';
import {LookupsService, Vat} from '@ss/common/api-lookup';
import { CommonUiConfirmationDialogModule, ConfirmationDialogService } from "@ss/common/ui-confirmation-dialog";
import {DefaultReportService} from '@ss/common/ui-default-report-component';
import { MaterialModule, PaginatorPersistenceService } from "@ss/common/api-common";
import { CommonModule } from "@angular/common";
import { CommonUiLangModule } from "@ss/common/ui-lang";
import { UiPaginationModule } from "@ss/common/ui-pagination";
import { ReactiveFormsModule } from "@angular/forms";

import { CommonUiDatepickerModule } from "@ss/common/ui-datepicker";
import { CommonUiAutoCompleteModule } from "@ss/common/ui-auto-complete";
import { StockUiArticleStoreModule } from "@ss/stock/article-store";
import { Article, ArticleService } from '@ss/master-data/api-article';

@Component({
    selector: 'ss-store-list',
    styleUrls: ['./store-list.component.scss'],
    templateUrl: './store-list.component.html',
    standalone: true,
    imports: [
        CommonModule,
        MaterialModule,
        CommonUiLangModule,
        UiPaginationModule,
        RouterModule,
        ReactiveFormsModule,

        CommonUiConfirmationDialogModule,
        CommonUiDatepickerModule,
        CommonUiAutoCompleteModule,
        StockUiArticleStoreModule
    ],
})
export class StoreListComponent extends BaseEntityListComponent<Article> {

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
        public override entitySrv: ArticleService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override router: Router,
        public override confirmationSrv: ConfirmationDialogService,
        public override defReportSrv: DefaultReportService,
        public lookupsSrv: LookupsService,
        public override pagPersistSrv: PaginatorPersistenceService) {
        super(entitySrv,
            shellSrv,
            snackBarSrv,
            route,
            router,
            confirmationSrv,
            defReportSrv,
            pagPersistSrv,
            'STOCK_SORES');
    }

    override preload(): Observable<any> {
        return this.lookupsSrv.getMarks()
            .pipe(
                tap(x => this.onMarksLoaded(x)),
                switchMap(() => this.lookupsSrv.getVats()),
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
