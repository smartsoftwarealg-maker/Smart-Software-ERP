import {Component, inject} from '@angular/core';
import {CRMQuote} from '../quotes-api';
import {CrmQuotesService} from '../crm-quotes.service';
import {BaseChildEntityListComponent} from '@ss/common/ui-base-entity';
import {AsyncPipe, DatePipe} from '@angular/common';
import {
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderCellDef,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRow,
    MatRowDef,
    MatTable
} from '@angular/material/table';
import {PaginationComponent} from '@ss/common/ui-pagination';
import {TranslateDirective, TranslatePipe} from '@ss/common/ui-lang';
import {MatMiniFabButton} from '@angular/material/button';
import {MatTooltip} from '@angular/material/tooltip';
import {MatDialog} from '@angular/material/dialog';
import {CrmEmailSenderComponent} from "../crm-email-sender/crm-email-sender.component";
import {MatDialogModule} from '@angular/material/dialog';
import {DefaultReportService} from "@ss/common/ui-default-report-component";



@Component({
    selector: 'ss-crm-quotes-list',
    standalone: true,
    imports: [
        DatePipe,
        MatCell,
        MatCellDef,
        MatColumnDef,
        MatHeaderCell,
        MatHeaderRow,
        MatHeaderRowDef,
        MatRow,
        MatRowDef,
        MatTable,
        PaginationComponent,
        TranslateDirective,
        TranslatePipe,
        MatHeaderCellDef,
        AsyncPipe,
        MatMiniFabButton,
        MatTooltip,
        MatDialogModule
    ],
    templateUrl: './crm-quotes-list.component.html',
    styleUrls: ['./crm-quotes-list.component.scss']
})
export class CrmQuotesListComponent extends BaseChildEntityListComponent<CRMQuote> {
    selectedReport: string | null = null;
    private reportFormName = 'WorkPermit';
    private defaultReportSrv = inject(DefaultReportService);

    override displayedColumns = [
        'number',
        'date',
        'user'
    ];

    constructor(
        protected override detailSrv: CrmQuotesService,
        private dialog: MatDialog
    ) {
        super(detailSrv, 'CrmQuotesList');
    }

    override ngOnInit() {
        super.ngOnInit();
        this.refresh();
    }

    override selectReport() {
        this.defaultReportSrv
            .open(this.shellSrv.getApp(), this.reportFormName)
            .subscribe(resp => {
                if (resp.count > 0) {
                    this.selectedReport = this.reportFormName;
                    this.snackBarSrv.showSuccessMessage();
                }
            });
    }

    emailQuote() {
        if (!this.selectedRow) return;

        if (!this.selectedReport) {
            this.snackBarSrv.showMessage('Please select a report first');
            return;
        }

        console.log('selectedReport =', this.selectedReport);

        this.dialog.open(CrmEmailSenderComponent, {
            width: '350px',
            height: '370px',
            data: {
                id: this.selectedRow.id,
                form: this.selectedReport
            },
            disableClose: true
        });
    }
}

