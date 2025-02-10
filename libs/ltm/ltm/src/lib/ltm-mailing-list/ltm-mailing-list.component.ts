import { Component, inject, OnInit } from '@angular/core';
import {BaseEntityListComponent} from '@ss/common/ui-base-entity';
import { ShellService, SnackBarService } from "@ss/common/ui-shell";
import { ActivatedRoute, Router } from "@angular/router";
import { DefaultReportService } from '@ss/common/ui-default-report-component';
import {  ConfirmationDialogService } from "@ss/common/ui-confirmation-dialog";
import { MaterialModule, PaginatorPersistenceService } from "@ss/common/api-common";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { LtmMailingDocumentService, LTMMailingList } from '@ltm/ltm-api';
import { PaginationComponent } from '@ss/common/ui-pagination';
import { TranslateDirective } from '@ss/common/ui-lang';
import { LtmMailingService } from '@ltm/ltm-api';

@Component({
    selector: 'ss-ltm-mailing-list',
    templateUrl: './ltm-mailing-list.component.html',
    styleUrls: ['./ltm-mailing-list.component.scss'],
    standalone: true,
    imports: [
        CommonModule,
        MaterialModule,
        TranslateDirective,
        PaginationComponent,
        ReactiveFormsModule,
    ],
})
export class LtmMailingListComponent extends BaseEntityListComponent<LTMMailingList> implements OnInit {
    #mailingDocumentSrv = inject(LtmMailingDocumentService);

    displayedColumns = [
        'fullName',
        'email',
    ];

    constructor(
        public override entitySrv: LtmMailingService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override router: Router,
        public override defReportSrv: DefaultReportService,
        public override confirmationSrv: ConfirmationDialogService,
        public override pagPersistSrv: PaginatorPersistenceService) {
        super(
            entitySrv,
            shellSrv,
            snackBarSrv,
            route,
            router,
            confirmationSrv,
            defReportSrv,
            pagPersistSrv,
            'COMMON_MAILING_LIST');
        this.pagination.pageSize = 15;
    }

    override select(id: number) {
        super.select(id);
        this.#mailingDocumentSrv.setParentId(id);
    }
}
