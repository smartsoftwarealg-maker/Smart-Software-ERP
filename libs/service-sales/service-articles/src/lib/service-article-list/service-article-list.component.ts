import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseEntityListComponent } from '@ss/common/ui-base-entity';
import { Service } from '../service-article-api';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { DefaultReportService } from '@ss/common/ui-default-report-component';
import { PaginatorPersistenceService } from '@ss/common/api-common';
import { ServiceArticleService } from '../service-article.service';

import { CommonUiLangModule } from '@ss/common/ui-lang';

import { MatTableModule } from '@angular/material/table';
import { UiPaginationModule } from '@ss/common/ui-pagination';
import { MatSortModule } from '@angular/material/sort';
import { ImageInputComponent } from '@ss/common/ui-image-input';

@Component({
    selector: 'ss-service-article-list',
    standalone: true,
    imports: [
        CommonModule,
        ImageInputComponent,
        CommonUiLangModule,
        MatTableModule,
        UiPaginationModule,
        MatSortModule],
    templateUrl: './service-article-list.component.html',
    styleUrls: ['./service-article-list.component.css']
})
export class ServiceArticleListComponent extends BaseEntityListComponent<Service> {
    displayedColumns = ['reference', 'description2', 'klassName', 'price1', 'vatValue'];

    constructor(
        public articleSrv: ServiceArticleService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override router: Router,
        public override confirmationSrv: ConfirmationDialogService,
        public override defReportSrv: DefaultReportService,
        public override pagPersistSrv: PaginatorPersistenceService) {
        super(articleSrv, shellSrv, snackBarSrv, route, router, confirmationSrv, defReportSrv, pagPersistSrv, 'STOCK_ARTICLES');
    }
}
