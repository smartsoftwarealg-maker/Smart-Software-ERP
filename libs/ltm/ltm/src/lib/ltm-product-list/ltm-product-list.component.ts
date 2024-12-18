import { Component } from '@angular/core';
import {BaseEntityListComponent} from '@ss/common/ui-base-entity';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import {  ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import {DefaultReportService} from '@ss/common/ui-default-report-component';
import { MaterialModule, PaginatorPersistenceService } from '@ss/common/api-common';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { LTMProduct } from '@ltm/ltm-api';
import { LtmProductService } from '@ltm/ltm-api';
import { PaginationComponent } from '@ss/common/ui-pagination';
import { TranslateDirective } from '@ss/common/ui-lang';

@Component({
    selector: 'ss-ltm-product-list',
    templateUrl: './ltm-product-list.component.html',
    styleUrls: ['./ltm-product-list.component.scss'],
    standalone: true,
    imports: [
        CommonModule,
        MaterialModule,
        PaginationComponent,
        ReactiveFormsModule,
        TranslateDirective
    ],
})
export class LtmProductListComponent extends BaseEntityListComponent<LTMProduct> {
    displayedColumns = ['code', 'description'];

    constructor(
        public override entitySrv: LtmProductService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override confirmationSrv: ConfirmationDialogService,
        public override defReportSrv: DefaultReportService,
        public override router: Router,
        public override pagPersistSrv: PaginatorPersistenceService) {
        super(entitySrv, shellSrv, snackBarSrv, route, router, confirmationSrv, defReportSrv, pagPersistSrv, 'COMMON_PRODUCTS');
        this.pagination.pageSize = 15;
    }
}
