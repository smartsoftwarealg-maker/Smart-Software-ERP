import { Component, inject, OnInit } from '@angular/core';
import { ShellService } from '@ss/common/ui-shell';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Lookup } from '@ss/common/api-lookup';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { AppArchiveService } from '../app-archive.service';
import { ImageUploaderUtil, LoginService, MaterialModule, PaginationModel } from '@ss/common/api-common';
import { Observable, of } from 'rxjs';
import { AppArchive, AppArchiveObs, APPLICATIONS } from '../app-archive-api';
import { CommonModule, DatePipe } from '@angular/common';
import { CommonUiLangModule } from '@ss/common/ui-lang';
import { UiPaginationModule } from '@ss/common/ui-pagination';
import { CommonUiConfirmationDialogModule } from '@ss/common/ui-confirmation-dialog';
import { CommonUiAutoCompleteModule } from '@ss/common/ui-auto-complete';
import { CommonUiDatepickerModule } from '@ss/common/ui-datepicker';

@Component({
    selector: 'ss-app-archive-viewer',
    templateUrl: './app-archive-viewer.component.html',
    styleUrls: ['./app-archive-viewer.component.scss'],
    standalone: true,
    imports: [
        CommonModule,
        RouterModule,
        MaterialModule,
        CommonUiLangModule,
        UiPaginationModule,
        ReactiveFormsModule,
        CommonUiConfirmationDialogModule,
        CommonUiAutoCompleteModule,
        CommonUiDatepickerModule
    ]
})
export class AppArchiveViewerComponent implements OnInit {
    private loginSrv = inject(LoginService);
    private datePipe = new DatePipe('en');
    private ACCOUNTING_COLS = ['COMMON_NUMBER', 'COMMON_DATE', 'COMMON_JOURNAL', 'COMMON_DESCRIPTION'];
    private EMPLOYEE_COLS = ['COMMON_ID', 'COMMON_FIRST_NAME', 'COMMON_LAST_NAME', 'COMMON_DESCRIPTION'];
    private ASSET_COLS = ['COMMON_REFERENCE', 'ASSET_SERIAL_NUMBER', 'COMMON_DESCRIPTION', 'COMMON_DESCRIPTION'];
    private TRANSACTION_COLS = ['COMMON_NUMBER', 'COMMON_DATE', 'COMMON_AGENT', 'COMMON_DESCRIPTION'];
    private PARTNER_COLS = ['LOGISTICS_DENOMINATION', 'LOGISTICS_CUSTOMER_CODE', 'COMMON_ADDRESS', 'COMMON_DESCRIPTION'];
    private shellSrv = inject(ShellService);
    private route = inject(ActivatedRoute);
    private fb = inject(FormBuilder);
    private archiveSrv = inject(AppArchiveService);

    paginator = PaginationModel.newInstance({ page: 0, pageSize: 5, elementCount: 0 });
    processing = false;
    selectedApp: Lookup = null;
    selectedArchive: AppArchive;
    filename: string = null;
    pdfSrc: string = null;
    imgSrc: string | null = null;
    form = this.fb.group({
        number: [0],
        date: [new Date()],
        reference: [''],
        refDate: [new Date()],
        denomination: [''],
        lastName: [''],
        firstName: [''],
        assetReference: [''],
        description: ['']
    });

    numberDateDocs = [2, 5, 7, 52, 53, 54, 55];
    transactionDocs = [5, 52, 53, 54, 55];
    displayedColumns = ['info1', 'info2', 'info3', 'docDescription']; //, 'filename'
    columnHeaders = this.EMPLOYEE_COLS;
    data: AppArchive[] = [];

    applications: Lookup[] = [];

    ngOnInit(): void {
        this.shellSrv.setTitle('COMMON_AAVIEWER');
        this.shellSrv.setGoBackPath('..', this.route);
        this.archiveSrv
            .userDocuments()
            .subscribe(res => {
                if (res.length > 0) {
                    this.applications = APPLICATIONS.filter(e => res.filter(f => f.description === e.descriptionAr).length > 0);
                } else {
                    this.applications = this.loginSrv.appCtx.manager? APPLICATIONS : [];
                }
            });
    }


    selectApp(a: Lookup) {
        this.selectedApp = a;
        this.paginator.page = 0;
        this.paginator.elementCount = 0;
        this.archiveSrv.setParentId(a?.id || 0);
        this.data = [];
        this.imgSrc = null;
    }

    select(a: AppArchive) {
        this.selectedArchive = a;
        if (a) {
            if (a.filename?.indexOf('.pdf') > 1) {
                this.filename = a.filename;
                this.imgSrc = './assets/img/pdf.png';
            } else if (a.filename?.indexOf('.doc') > 1) {
                this.filename = a.filename;
                this.imgSrc = ('./assets/img/word.png');
            } else {
                this.filename = null;
                this.archiveSrv
                    .image(a?.id || 0)
                    .subscribe(res => {
                        ImageUploaderUtil.toBase64(res, (s: string) => this.imgSrc = s);
                    });
            }
        }
    }

    private getArchiveObserver(): Observable<AppArchiveObs> {
        const params = this.form.getRawValue();
        switch (this.selectedApp?.id) {
        case 1:
            this.columnHeaders = this.PARTNER_COLS;
            return this.archiveSrv.getPartnerArchives(params.denomination, 0, this.paginator.pageSize);
        case 2:
            this.columnHeaders = this.TRANSACTION_COLS;
            return this.archiveSrv.getAssetReceptionArchives(params.number, this.datePipe.transform(params.date, 'dd/MM/yyyy'), this.datePipe.transform(params.refDate, 'dd/MM/yyyy'), 0, this.paginator.pageSize);
        case 3:
            this.columnHeaders = this.ASSET_COLS;
            return this.archiveSrv.getAssetArchives(params.reference, params.description, 0, this.paginator.pageSize);
        case 4:
            this.columnHeaders = this.EMPLOYEE_COLS;
            return this.archiveSrv.getEmployeeArchives(params.firstName, params.lastName, 0, this.paginator.pageSize);
        case 7:
            this.columnHeaders = this.ACCOUNTING_COLS;
            return this.archiveSrv.getAccounting(
                params.number,
                this.datePipe.transform(params.date, 'dd/MM/yyyy'),
                params.reference,
                0,
                this.paginator.pageSize);
        case 5:
            this.columnHeaders = this.TRANSACTION_COLS;
            return this.archiveSrv.getTransactionArchives('purchase-orders',
                params.number,
                this.datePipe.transform(params.date, 'dd/MM/yyyy'),
                params.reference,
                this.datePipe.transform(params.refDate, 'dd/MM/yyyy'),
                0,
                this.paginator.pageSize);
        case 52:
            this.columnHeaders = this.TRANSACTION_COLS;
            return this.archiveSrv.getTransactionArchives('receptions',
                params.number,
                this.datePipe.transform(params.date, 'dd/MM/yyyy'),
                params.reference,
                this.datePipe.transform(params.refDate, 'dd/MM/yyyy'),
                0,
                this.paginator.pageSize);
        case 53:
            this.columnHeaders = this.TRANSACTION_COLS;
            return this.archiveSrv.getTransactionArchives('sales-orders',
                params.number,
                this.datePipe.transform(params.date, 'dd/MM/yyyy'),
                params.reference,
                this.datePipe.transform(params.refDate, 'dd/MM/yyyy'),
                0,
                this.paginator.pageSize);
        case 54:
            this.columnHeaders = this.TRANSACTION_COLS;
            return this.archiveSrv.getTransactionArchives('invoices',
                params.number,
                this.datePipe.transform(params.date, 'dd/MM/yyyy'),
                params.reference,
                this.datePipe.transform(params.refDate, 'dd/MM/yyyy'),
                0,
                this.paginator.pageSize);
        default:
            return of({ body: [], itemCount: 0 });
        }
    }

    view() {
        this.getArchiveObserver().subscribe(res => {
            this.data = res.body;
            this.paginator.elementCount = res.itemCount;
        });
    }

    refresh() {
        this.imgSrc = null;
        if (this.archiveSrv.getParentId() > 0) {
            this.archiveSrv.getList(0, 50)
                .subscribe(res => {
                    this.data = res.body || [];
                    this.paginator.elementCount = res.itemCount;
                });
        } else {
            this.data = [];
            this.paginator.elementCount = 0;
        }
    }

    onClick(e: MouseEvent) {
        this.archiveSrv
            .image(this.selectedArchive?.id)
            .subscribe(res => {
                const pdfSrc = window.URL.createObjectURL(res);
                window.open(pdfSrc);
                window.URL.revokeObjectURL(pdfSrc);
            });
    }
}
