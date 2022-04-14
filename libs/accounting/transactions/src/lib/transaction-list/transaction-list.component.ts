import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {
    AccJournalsService,
    ACCTransaction,
    AccTransactionLineService,
    AccTransactionService,
    Journal
} from '@ss/accounting/accounting-api';
import {KeepOnToolbar, ShellService, SnackBarService, ToolbarButton} from '@ss/common/ui-shell';
import {DefaultReportService} from '@ss/common/ui-default-report-component';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {PaginationModel, PaginatorPersistenceService} from '@ss/common/api-common';
import {MatSelectionListChange} from '@angular/material/list';
import {Observable} from 'rxjs';
import {switchMap} from 'rxjs/operators';

@Component({
  selector: 'ss-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.scss']
})
export class TransactionListComponent  implements OnInit {
    private reportForm: string = null;
    public filter: string = null;
    public sortBy: string = null;
    selectedRow: ACCTransaction = null;
    selectedId = 0;
    data: ACCTransaction[] = [];
    journalList: Journal[] = [];
    displayedColumns = ['pieceno', 'piecedate', 'debit', 'credit'];
    pagination = PaginationModel.newInstance();
    public refreshButton: ToolbarButton = {
        icon: 'fas fa-sync-alt',
        label: 'COMMON_REFRESH',
        disabled: false,
        visible: true,
        keepOnToolbar: KeepOnToolbar.DYNAMIC,
        click: () => {
            this.refresh();
        }
    };
    public addButton: ToolbarButton = {
        icon: 'fas fa-plus',
        label: 'COMMON_ADD',
        disabled: false,
        visible: true,
        keepOnToolbar: KeepOnToolbar.DYNAMIC,
        click: () => this.showDetail(0)
    };
    public editButton: ToolbarButton = {
        icon: 'fas fa-pen',
        label: 'COMMON_EDIT_SELECTED',
        disabled: true,
        visible: true,
        keepOnToolbar: KeepOnToolbar.DYNAMIC,
        click: () => this.edit()
    };
    public deleteButton: ToolbarButton = {
        icon: 'fas fa-trash-alt',
        label: 'COMMON_DEL_SELECTED',
        disabled: true,
        visible: true,
        keepOnToolbar: KeepOnToolbar.DYNAMIC,
        click: () => this.deleteSelected()
    };

    public defReportButton: ToolbarButton = {
        icon: 'fas fa-folders',
        label: 'COMMON_DEFAULT_REPORT',
        disabled: false, // always false
        visible: false,
        keepOnToolbar: KeepOnToolbar.DYNAMIC,
        click: () => this.selectReport()
    };

    public viewReportButton: ToolbarButton = {
        icon: 'fas fa-print',
        label: 'COMMON_VIEW_REPORT',
        disabled: false,
        visible: true,
        keepOnToolbar: KeepOnToolbar.DYNAMIC,
        click: () => this.viewReport()
    };

    constructor(
        public entitySrv: AccTransactionService,
        public shellSrv: ShellService,
        public snackBarSrv: SnackBarService,
        public route: ActivatedRoute,
        public router: Router,
        public defReportSrv: DefaultReportService,
        public confirmationSrv: ConfirmationDialogService,
        public pagPersistSrv: PaginatorPersistenceService,
        private journalSrv: AccJournalsService,
        private detailSrv: AccTransactionLineService) {
        entitySrv.setParentId(0);
    }

    ngOnInit() {
      this.journalSrv
            .getList(0, 50)
            .subscribe(res => this.journalList = res.body);
      this.shellSrv.setButtons([this.refreshButton, this.addButton, this.editButton, this.deleteButton, this.viewReportButton, this.defReportButton]);
    }

    private showButtons() {
        const itemControlsOn = this.selectedId != null && this.selectedId > 0;
        // to avoid calling up shellUpdate twice, i will replace the next 2 lines with a better code
        // this.shellSrv.setButtonEnabled(this.editButton, itemControlsOn);
        // this.shellSrv.setButtonEnabled(this.deleteButton, itemControlsOn);
        // this removes calling updateShell twice
        this.shellSrv.setButtons([this.refreshButton, this.addButton, this.editButton, this.deleteButton, this.viewReportButton, this.defReportButton]);
        this.editButton.disabled = !itemControlsOn;
        this.deleteButton.disabled = !itemControlsOn;
        this.viewReportButton.disabled = !itemControlsOn;
        this.shellSrv.updateShell();
    }

    selectRow(row: ACCTransaction) {
        row.id = (row.fileId || 0 ) * 10000 + (row.oid || 0);
        this.selectedRow = row;
        this.selectedId = row ? row.id || 0 : 0;
        this.detailSrv.setParentId(this.selectedId);
        this.router
            .navigate([this.selectedId, 'detail'], { relativeTo: this.route })
            .then(_ => {
                this.showButtons();
                this.shellSrv.setGoBackPath('..', this.route);
                this.detailSrv.setParentId(this.selectedId);
            });
    }

    edit() {
        const id = this.selectedRow.fileId * 10000 + this.selectedRow.oid;
        this.router
            .navigate(['.'], { relativeTo: this.route })
            .then(res => this.router.navigate([id], { relativeTo: this.route }));
    }

    // addDetail() {
    //     this.router.navigate(['0'], { relativeTo: this.route });
    // }
    //
    // showDetail() {
    //     this.router.navigate(['detail'], { relativeTo: this.route });
    // }
    //
    // showDetailDetail() {
    //     this.router.navigate(['detail', 'detail'], { relativeTo: this.route });
    // }

    journalSelected(event: MatSelectionListChange) {
        const journalId = event.options[0].value;
        this.entitySrv.setParentId(event.options[0].value);
        this.entitySrv
            .findByJournal(journalId, this.pagination.page, this.pagination.pageSize)
            .subscribe(res => {
                this.data = res.body;
                this.pagination.elementCount = res.itemCount;
            });
        this.router
            .navigate(['.'], { relativeTo: this.route })
            .then(_ => {
                this.showButtons();
                this.shellSrv.setGoBackPath('..', this.route);
            });
    }
    public refresh(callback?: () => void) {
        this.data = [];
        this.shellSrv.setLoading(true);
        this.selectedId = 0;
        this.getPage()
            .subscribe({
                next:
                    data => {
                        this.finishLoading(data);
                        if (callback) {
                            callback();
                        }
                    },
                error: err => {
                    this.data = []; // clear everything;
                    this.shellSrv.setLoading(false); // stop the animation
                    throw err;
                }
            }
        );
    }
    public getPage() {
        return this.entitySrv.getPage(this.pagination, this.filter, this.sortBy);
    }

    public finishLoading(data: ACCTransaction[]) {
        this.data = data;
        this.shellSrv.setLoading(false);
    }

    private selectReport() {
        this.defReportSrv
            .open(this.shellSrv.getApp(), this.reportForm)
            .subscribe(res => {
                if (typeof res === 'string') {
                    this.defReportSrv
                        .setUserReport(this.reportForm, res)
                        .subscribe(resp => {
                            if (resp.count > 0) {
                                this.snackBarSrv.showSuccessMessage();
                            }
                        })
                }
            });
    }

    private viewReport() {
        this.defReportSrv
            .viewReport(this.reportForm, this.selectedId)
            .subscribe(res => {
                const fileURL = URL.createObjectURL(new Blob([res], { type: 'application/pdf' }));
                window.open(fileURL, '_blank');
            });
    }
    public deleteSelected(): void {
        this.confirmationSrv.confirmDelete()
            .subscribe(b => {
                if (b) {
                    if (this.selectedId && this.selectedId > 0) {
                        const a = this.data.filter(x => x.id === this.selectedId)[0];
                        if (a && a.id) {
                            this.shellSrv.setLoading(true);
                            this.entitySrv.remove(a.id)
                                .subscribe({
                                    next: () => {
                                        this.snackBarSrv.showSuccessMessage();
                                        this.refresh();
                                    },
                                    error: err => {
                                        this.snackBarSrv.showFailureMessage();
                                        this.shellSrv.setLoading(false);
                                        throw err;
                                    }
                                });
                        }
                    }
                }
            })
    }
    public showDetail(id: number): void {
        this.router.navigate([id], { relativeTo: this.route }).then();
    }
}
