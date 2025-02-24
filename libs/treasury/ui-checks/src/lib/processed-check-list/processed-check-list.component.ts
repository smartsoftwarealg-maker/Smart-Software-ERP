import { Component, OnInit } from '@angular/core';
import {BaseEntityListComponent} from '@ss/common/ui-base-entity';
import {ProcessedCheck, ProcessedCheckService} from '@ss/treasury/api-checks';
import {KeepOnToolbar, ShellService, SnackBarService, ToolbarButton} from '@ss/common/ui-shell';
import {ActivatedRoute, Router} from '@angular/router';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {DefaultReportService} from '@ss/common/ui-default-report-component';
import {LookupsService} from '@ss/common/api-lookup';
import {HttpService, PaginatorPersistenceService} from '@ss/common/api-common';
import {MatDialog} from '@angular/material/dialog';
import {
    ProcessedCheckInjectionDialogComponent
} from '../processed-check-injection-dialog/processed-check-injection-dialog.component';
import { MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatCellDef, MatCell, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow } from '@angular/material/table';
import { TranslateDirective } from '@ss/common/ui-lang';
import { MatCheckbox } from '@angular/material/checkbox';
import { PaginationComponent } from '@ss/common/ui-pagination';
import { DecimalPipe, DatePipe } from '@angular/common';

@Component({
    selector: 'ss-processed-check-list',
    templateUrl: './processed-check-list.component.html',
    styleUrls: ['./processed-check-list.component.scss'],
    standalone: true,
    imports: [
        MatTable,
        MatColumnDef,
        MatHeaderCell,
        TranslateDirective,
        MatCell,
        MatCheckbox,
        MatHeaderRow,
        MatRow,
        PaginationComponent,
        DecimalPipe,
        DatePipe,
        MatHeaderCellDef,
        MatCellDef,
        MatHeaderRowDef,
        MatRowDef
    ]
})
export class ProcessedCheckListComponent extends BaseEntityListComponent<ProcessedCheck> implements OnInit {
    private injectBtn: ToolbarButton = {
        icon: 'fa-regular fa-syringe',
        label: 'COMMON_EXCEL_INJECTION',
        disabled: false,
        visible: true,
        keepOnToolbar: KeepOnToolbar.DYNAMIC,
        click: () => this.inject()
    };

    displayedColumns = [
        'bankName',
        'number',
        'checkDate',
        'amount',
    ];

    constructor(
        private dialog: MatDialog,
        public checkSrv: ProcessedCheckService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override router: Router,
        public override confirmationSrv: ConfirmationDialogService,
        public override defReportSrv: DefaultReportService,
        public lookupsSrv: LookupsService,
        public httpSrv: HttpService,
        public override pagPersistSrv: PaginatorPersistenceService) {
        super(checkSrv, shellSrv, snackBarSrv, route, router, confirmationSrv, defReportSrv, pagPersistSrv, 'TRS_CHECKS');
        this.pagination.pageSize = 10;
    }

   private inject() {
           const dialogRef = this.dialog.open(ProcessedCheckInjectionDialogComponent, {
               width: '500px',
               height: '360px',
               disableClose: true
           });

           dialogRef
               .afterClosed()
               .subscribe(result => {
                   if (result && result['count']) {
                       this.snackBarSrv.showMessage('COMMON_SUCCESS');
                       this.refresh(() => this.shellSrv.setLoading(false));
                   } else {
                       this.snackBarSrv.showFailureMessage();
                   }
               });
    }

    override ngOnInit() {
        super.ngOnInit();
        this.shellSrv.addButton(this.injectBtn);
    }
}
