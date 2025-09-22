import {Component, inject} from '@angular/core';
import {BaseEntityListComponent} from "@ss/common/ui-base-entity";
import {ShellService, SnackBarService} from "@ss/common/ui-shell";
import {ActivatedRoute, Router} from "@angular/router";
import {ConfirmationDialogService} from "@ss/common/ui-confirmation-dialog";
import {DefaultReportService} from "@ss/common/ui-default-report-component";
import {LookupsService} from "@ss/common/api-lookup";
import {PaymentsListService} from "../services/payments-list.service";
import {map, Observable} from "rxjs";
import {Payment} from "@ss/logistics/api-common";
import {AgentService} from "@ss/logistics/api-agent";
import {PaginatorPersistenceService} from '@ss/common/api-common';
import { MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatCellDef, MatCell, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow } from '@angular/material/table';
import { TranslateDirective } from '@ss/common/ui-lang';
import { PaginationComponent } from '@ss/common/ui-pagination';
import { DecimalPipe, DatePipe } from '@angular/common';
import {AdvancementsService} from "../services/advancements.service";

@Component({
    selector: 'ss-advancements-list',
    templateUrl: './advancements-list.component.html',
    styleUrls: ['./advancements-list.component.scss'],
    standalone: true,
    imports: [
        MatTable,
        MatColumnDef,
        MatHeaderCell,
        TranslateDirective,
        MatCell,
        MatHeaderRow,
        MatRow,
        PaginationComponent,
        DecimalPipe,
        DatePipe,
        MatHeaderCellDef,
        MatCellDef,
        MatRowDef,
        MatHeaderRowDef
    ]
})
export class AdvancementsListComponent extends BaseEntityListComponent<Payment> {
    private agentSrv = inject(AgentService);

    displayedColumns = [
        'date',
        'number',
        'denomination',
        'description',
        // 'modeDescription',
        'debit',
        'credit'
    ];

    constructor(
        public paymentSrv: AdvancementsService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override router: Router,
        public override confirmationSrv: ConfirmationDialogService,
        public override defReportSrv: DefaultReportService,
        public lookupsSrv: LookupsService,
        public override pagPersistSrv: PaginatorPersistenceService) {
        super(paymentSrv, shellSrv, snackBarSrv, route, router, confirmationSrv, defReportSrv, pagPersistSrv,'LOGISTICS_ADVANCEMENT_INVOICE');

        this.pagination.pageSize = 15;
    }
}
