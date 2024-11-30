import { Component, OnInit } from '@angular/core';
import {BaseEntityListComponent} from '@ss/common/ui-base-entity';
import {LookupsService, Mark, Unit, Vat} from '@ss/common/api-lookup';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import { ActivatedRoute, Router, RouterModule } from "@angular/router";
import {  ConfirmationDialogService } from "@ss/common/ui-confirmation-dialog";
import {DefaultReportService} from '@ss/common/ui-default-report-component';
import { HttpService, MaterialModule, PaginatorPersistenceService } from "@ss/common/api-common";
import {Article, SSArticleService} from '@ss/scheduled-sales/api-scheduled-sales';
import { CommonModule } from "@angular/common";


import { ReactiveFormsModule } from "@angular/forms";
import { CommonUiDatepickerModule } from "@ss/common/ui-datepicker";
import { CommonUiAutoCompleteModule } from "@ss/common/ui-auto-complete";
import { LogisticsUiDocImportModule } from "@ss/logistics/ui-doc-import";
import { UiStockInfoComponent } from "@ss/logistics/ui-stock-info";
import { CommonUiColorSelectModule } from "@ss/common/ui-color-select";
import { ColorPickerModule } from "ngx-color-picker";
import { PaginationComponent } from '@ss/common/ui-pagination';
import { TranslateDirective, TranslatePipe } from '@ss/common/ui-lang';

@Component({
    selector: "ss-article-list-ss",
    templateUrl: "./article-list.component.html",
    styleUrls: ["./article-list.component.scss"],
    standalone: true,
    imports: [
        CommonModule,
        MaterialModule,
        TranslateDirective,
        TranslatePipe,
        ReactiveFormsModule,
        RouterModule,
        CommonUiDatepickerModule,
        CommonUiAutoCompleteModule,
        LogisticsUiDocImportModule,
        UiStockInfoComponent,
        CommonUiColorSelectModule,
        ColorPickerModule,
        PaginationComponent,
        TranslateDirective
    ]

})
export class ArticleListComponent extends BaseEntityListComponent<Article> implements OnInit {

    displayedColumns = [
        'reference',
        'description2',
        'classDescription',
        'typeDescription',
        'price',
        'vatValue',
    ];

    constructor(
        public articleSrv: SSArticleService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override router: Router,
        public override confirmationSrv: ConfirmationDialogService,
        public override defReportSrv: DefaultReportService,
        public lookupsSrv: LookupsService,
        public httpSrv: HttpService,
        public override pagPersistSrv: PaginatorPersistenceService) {
        super(articleSrv, shellSrv, snackBarSrv, route, router, confirmationSrv, defReportSrv, pagPersistSrv, 'LOGISTICS_ARTICLES');
        this.pagination.pageSize = 15;
    }

    // override processLoadedData(data: Article[]): Observable<Article[]> {
    //     data?.forEach(p => {
    //         p.imageModel = new ImageModel(this.httpSrv);
    //         p.imageModel.readOnly = true;
    //         p.imageModel.setImageUrl(this.articleSrv.getPhotoUrl(p.id), false);
    //     })
    //     return of(data);
    // }
}
