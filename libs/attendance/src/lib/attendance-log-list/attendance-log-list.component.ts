import { Component } from '@angular/core';
import {BaseEntityListComponent} from '@ss/common/ui-base-entity';
import {ATTSignature} from '../attendance-api';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute, Router} from '@angular/router';
import {DefaultReportService} from '@ss/common/ui-default-report-component';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import { MaterialModule, PaginatorPersistenceService } from '@ss/common/api-common';
import {SignatureService} from '../signature.service';
import { MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatCellDef, MatCell, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { TranslateDirective, TranslatePipe } from '@ss/common/ui-lang';
import { PaginationComponent } from '@ss/common/ui-pagination';
import { DatePipe } from '@angular/common';

@Component({
    selector: 'ss-attendance-log-list',
    templateUrl: './attendance-log-list.component.html',
    styleUrls: ['./attendance-log-list.component.scss'],
    standalone: true,
    imports: [
        MaterialModule,
        TranslateDirective,
        PaginationComponent,
        DatePipe
    ],
})
export class AttendanceLogListComponent extends BaseEntityListComponent<ATTSignature> {
    displayedColumns = [
        'personId',
        'firstName',
        'lastName',
        'dateTime',
        'typeDescription',
        'updaterName',
    ];

    constructor(
        public override entitySrv: SignatureService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override router: Router,
        public override defReportSrv: DefaultReportService,
        public override confirmationSrv: ConfirmationDialogService,
        public override pagPersistSrv: PaginatorPersistenceService) {
        super(entitySrv,
            shellSrv,
            snackBarSrv,
            route,
            router,
            confirmationSrv,
            defReportSrv,
            pagPersistSrv,
            'ATT_SIGNATURES');
        this.pagination.pageSize = 15;
    }
}
