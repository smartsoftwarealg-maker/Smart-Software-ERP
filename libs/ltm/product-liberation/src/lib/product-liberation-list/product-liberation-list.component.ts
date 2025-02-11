import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseEntityListComponent } from '@ss/common/ui-base-entity';
import { KeepOnToolbar, ShellService, SnackBarService, ToolbarButton } from '@ss/common/ui-shell';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { DefaultReportService } from '@ss/common/ui-default-report-component';
import { PaginatorPersistenceService } from '@ss/common/api-common';

import {
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatHeaderCell, MatHeaderCellDef,
    MatHeaderRow,
    MatHeaderRowDef, MatRow, MatRowDef, MatTable
} from '@angular/material/table';
import { MatSort, MatSortHeader } from '@angular/material/sort';
import {
    LTM_NON_CONFORMITY_DOC, LTM_PRODUCT_LIBERATION_DOC,
    LTMProductLiberation, LTMProductLiberationLine,
    LtmProductLiberationLineService, LtmProductLiberationService
} from '@ltm/ltm-api';
import { PaginationComponent } from '@ss/common/ui-pagination';
import { TranslateDirective } from '@ss/common/ui-lang';
import { LtmEmailSenderComponent } from '../../../../ltm/src/lib/email-sender/ltm-email-sender.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
    selector: 'ss-product-liberation-line-list',
    standalone: true,
    imports: [CommonModule,
              PaginationComponent,
              MatCell,
              MatCellDef,
              MatColumnDef,
              MatHeaderCell,
              MatHeaderRow,
              MatHeaderRowDef,
              MatRow,
              MatRowDef,
              MatSort,
              MatSortHeader,
              MatTable,
              MatHeaderCellDef,
              TranslateDirective
    ],
    templateUrl: './product-liberation-list.component.html',
    styleUrl: './product-liberation-list.component.scss',
})
export class ProductLiberationListComponent extends BaseEntityListComponent<LTMProductLiberation> {
    #dialog = inject(MatDialog);
    #emailBtn: ToolbarButton = {
        disabled: false,
        icon: 'fa-solid fa-at',
        keepOnToolbar: KeepOnToolbar.ALWAYS,
        label: 'COMMON_EMAIL_REPORT',
        visible: true,
        click: () => this.emailTheReport()
    };

    displayedColumns = [
        'date',
        'from',
        'to',
        'description'
    ];

    constructor(
        public override entitySrv: LtmProductLiberationService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override confirmationSrv: ConfirmationDialogService,
        public override defReportSrv: DefaultReportService,
        public override router: Router,
        public override pagPersistSrv: PaginatorPersistenceService) {
        super(entitySrv, shellSrv, snackBarSrv, route, router, confirmationSrv, defReportSrv, pagPersistSrv, 'LTM_PRODUCT_LIBERATION');
        this.pagination.pageSize = 15;
    }

    private emailTheReport() {
        const dialogRef = this.#dialog.open(LtmEmailSenderComponent,{
            width: '500px',
            height: '30em',
            data: { document: LTM_PRODUCT_LIBERATION_DOC, form: this.formReport, message: 'test' },
            disableClose: true
        });
        dialogRef.afterClosed().subscribe(res => {
            if (!res) {
                this.snackBarSrv.showSuccessMessage();
            }
        })
    }

    override ngOnInit() {
        super.ngOnInit();
        this.shellSrv.addButton(this.#emailBtn);
    }
}
