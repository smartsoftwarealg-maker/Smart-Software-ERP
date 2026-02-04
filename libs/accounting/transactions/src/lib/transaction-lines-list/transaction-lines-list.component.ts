import { Component, DestroyRef, HostListener, inject, OnInit, signal } from '@angular/core';
import {
    AccFileService,
    AccPoliciesService, ACCPolicy,
    ACCTransactionLine, AccTransactionLineService
} from '@ss/accounting/accounting-api';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import {DefaultReportService} from '@ss/common/ui-default-report-component';
import {  ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { LoginService, MaterialModule, PaginationModel, PaginatorPersistenceService } from '@ss/common/api-common';
import { of, Subscription, switchMap, tap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Sort } from '@angular/material/sort';
import { PaginationComponent } from '@ss/common/ui-pagination';
import { TranslateDirective, TranslatePipe } from '@ss/common/ui-lang';
import { MatDialog } from '@angular/material/dialog';
import { PieceDuplicationComponent } from '../piece-duplication/piece-duplication.component';

@Component({
    selector: 'ss-transaction-lines-list',
    templateUrl: './transaction-lines-list.component.html',
    styleUrls: ['./transaction-lines-list.component.scss'],
    standalone: true,
    imports: [
        CommonModule,
        RouterModule,
        MaterialModule,
        TranslateDirective,
        TranslatePipe,
        ReactiveFormsModule,
        PaginationComponent
    ]
})
export class TransactionLinesListComponent implements OnInit {
    private selectedRow: ACCTransactionLine|null = null;
    private dialog = inject(MatDialog);
    private fileSrv = inject(AccFileService);
    private subscription: Subscription = null;
    private accPolicy: ACCPolicy = null;

    private COLUMNS = [
        'lineNumber',
        'accountNo',
        'description',
        'customer',
        'reference',
        'c_o_d',
        'debit',
        'credit'];
    displayedColumns = this.COLUMNS;

    selected = 0;
    parentId: number = null;
    data: ACCTransactionLine[] = [];
    pagination = PaginationModel.newInstance({ page: 1, pageSize: 5, elementCount: 0 });
    searchText = new FormControl<string>('');
    readonly isClosed = signal<boolean>(this.fileSrv.accFile.closed);
    processing = signal(false);
    isEmpty = signal(false);

    constructor(
        public entitySrv: AccTransactionLineService,
        public shellSrv: ShellService,
        public snackBarSrv: SnackBarService,
        public route: ActivatedRoute,
        public router: Router,
        public defReportSrv: DefaultReportService,
        public confirmationSrv: ConfirmationDialogService,
        public pagPersistSrv: PaginatorPersistenceService,
        private loginSrv: LoginService,
        private policySrv: AccPoliciesService,
        private destroyRef: DestroyRef) {
        this.pagination.onChange = () => this.refresh();
        this.destroyRef.onDestroy(() => this.subscription?.unsubscribe());
    }

    ngOnInit() {
        this.parentId = this.entitySrv.getParentId();
        this.route
            .parent
            .parent
            .params
            .pipe(tap(params => {
                this.parentId = +params['id'];
                this.entitySrv.setParentId(this.parentId);
            }),
            switchMap(() => this.entitySrv.getList(0, 5)))
            .subscribe(res => {
                this.data = res.body;
                this.pagination.elementCount = res.itemCount;
                this.isEmpty.set(this.pagination.elementCount === 0);
            });

        this.policySrv
            .get(this.loginSrv.appCtx.center)
            .subscribe(res => {
                this.accPolicy = res;
                this.displayedColumns = this.COLUMNS.filter(e => this.accPolicy?.manualCashFlow || e !== 'c_o_d');
            });
        this.subscription = this.searchText
            .valueChanges
            .pipe(
                debounceTime(300),
                distinctUntilChanged()
            ).subscribe(() => this.refresh());
    }

    @HostListener('document:keydown', ['$event'])
    handleKeyboardEvent(event: KeyboardEvent) {
        if (event.altKey && event.key === 'n') {
            this.showDetail(0);
            event.preventDefault();
        } else if (event.altKey && event.key === 'e' && this.selected) {
            this.showDetail(this.selected);
            event.preventDefault();
        } else if (event.altKey && event.key === 'd' && this.selected) {
            this.delete();
            event.preventDefault();
        }
    }
    selectRow(row: ACCTransactionLine) {
        this.selectedRow = row;
        this.selected = row?.id || 0;
    }


    delete() {
        this.confirmationSrv
            .confirmDelete()
            .pipe(switchMap(res => res ? this.entitySrv.remove(this.selected) : of({ count: -1 })),
                switchMap(res => res.count > 0 ? this.entitySrv.getList(this.pagination.page - 1, this.pagination.pageSize) : of(null)))
            .subscribe(res => {
                if (res && res.itemCount != null) {
                    this.data = res.body;
                    this.pagination.elementCount = res.itemCount;
                    this.snackBarSrv.showSuccessMessage();
                    this.selected = null;
                }
                this.entitySrv.updateStatus();
            });

    }

    showDetail(id: number) {
        this.router.navigate([id], { relativeTo: this.route }).then();
    }

    refresh() {
        this.entitySrv
            .getList(this.pagination.page - 1, this.pagination.pageSize, this.searchText.value)
            .subscribe(res => {
                this.data = res.body;
                this.pagination.elementCount = res.itemCount;
                this.isEmpty.set(this.pagination.elementCount === 0);
            });
    }

    sort(event: Sort) {
        this.entitySrv.sortColumn = event;
        this.refresh();
    }

    duplicate() {
        const dialogRef = this.dialog.open(PieceDuplicationComponent, {
            width: '500px',
            height: '21em',
            data: { destinationId: this.parentId },
            disableClose: true
        });

        dialogRef
            .afterClosed()
            .subscribe(() => this.refresh());
    }
}
