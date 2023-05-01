import { Component, inject, OnDestroy, ViewChild } from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router, RouterOutlet} from '@angular/router';
import {
    AccFileService,
    AccJournalsService, AccPoliciesService,
    ACCTransaction,
    AccTransactionLineService,
    AccTransactionService,
    Journal, SCALE
} from '@ss/accounting/accounting-api';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {DefaultReportService} from '@ss/common/ui-default-report-component';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {LoginService, PaginatorPersistenceService} from '@ss/common/api-common';
import {MatSelectionListChange} from '@angular/material/list';
import {switchMap, tap} from 'rxjs';
import {debounceTime, distinctUntilChanged, filter} from 'rxjs/operators';
import {BaseEntityListComponent} from '@ss/common/ui-base-entity';
import {FormControl} from '@angular/forms';
import { MatRadioChange } from '@angular/material/radio';

@Component({
    selector: 'ss-transaction-list',
    templateUrl: './transaction-list.component.html',
    styleUrls: ['./transaction-list.component.scss']
})
export class TransactionListComponent extends BaseEntityListComponent<ACCTransaction> implements OnDestroy {
    private fileSrv = inject(AccFileService);
    private journalSrv =  inject(AccJournalsService);
    private detailSrv =  inject(AccTransactionLineService);
    private loginSrv =  inject(LoginService);
    private accPolicySrv =  inject(AccPoliciesService);

    transactionMode = true;
    public math = Math;
    isRoot = true;
    selectedJournal = 0;
    journalFilter = new FormControl<string>('');
    journalList: Journal[] = [];
    displayedColumns = ['pieceNo', 'pieceDate', 'debit', 'credit'];

    @ViewChild(RouterOutlet) outlet: RouterOutlet;

    constructor(
        public override entitySrv: AccTransactionService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override router: Router,
        public override defReportSrv: DefaultReportService,
        public override confirmationSrv: ConfirmationDialogService,
        public override pagPersistSrv: PaginatorPersistenceService) {
        super(entitySrv, shellSrv, snackBarSrv, route, router, confirmationSrv, defReportSrv, pagPersistSrv, 'COMMON_TRANSACTIONS');
        entitySrv.setParentId(0);
        this.pagination.onChange = () => this.refreshTransactions();
    }

    // override preload(): Observable<any> {
    //     return this.journalSrv
    //         .getUserJournals(this.journalFilter.value || '')
    //         .pipe(tap(res => this.journalList = res.body));
    // }

    override ngOnInit() {
        this.setDefaultButtons(true);
        super.ngOnInit();

        this.journalSrv
            .getUserJournals(this.journalFilter.value || '')
            .pipe(tap(res => this.journalList = res.body),
                switchMap(_ => this.accPolicySrv.get(this.loginSrv.appCtx.center)))
            .subscribe(policy => {
                if (policy.showProjects) {
                    this.displayedColumns.push('projectName');
                }
                if (policy.showBudget) {
                    this.displayedColumns.push('isBudget');
                }
            });

        this.subscriptions
            .push(this.router
                .events
                .pipe(filter(ev => ev instanceof NavigationEnd))
                .subscribe(event => {
                    if (event instanceof NavigationEnd) {
                        const isRoot = event.url === '/app/accounting/transactions';
                        if (isRoot) {
                            this.transactionSaved();
                        }
                        this.setDefaultButtons(isRoot);
                    }
                }));

        this.subscriptions.push(
            this.journalFilter
                .valueChanges
                .pipe(debounceTime(300),
                    distinctUntilChanged(),
                    switchMap(str => this.journalSrv.getUserJournals(str)))
                .subscribe(res => this.journalList = res.body));
    }


    private setDefaultButtons(isRoot: boolean) {
        this.isRoot = isRoot;
        this.addButton.visible = isRoot && this.selectedJournal > 0;
        this.editButton.visible = isRoot;
        this.deleteButton.visible = isRoot;
    }

    // private showButtons() {
    //     const itemControlsOn = this.selected != null && this.selected > 0;
    //     this.editButton.disabled = !itemControlsOn;
    //     this.deleteButton.disabled = !itemControlsOn;
    //     this.viewReportButton.disabled = !itemControlsOn;
    // }

    private navigate() {
        if (this.selected) {
            const commands = this.transactionMode? [this.selected] : [this.selected, 'archive'];
            this.router.navigate(commands, {relativeTo: this.route})
                .then(_ => {
                    this.detailSrv.setParentId(this.selected);
                });
        }
    }

    override selectRow(row: ACCTransaction) {
        row.id = (row.fileId || 0 ) * SCALE + (row.oid || 0);
        super.selectRow(row);
        this.navigate();
    }

    override edit() {
        if (this.selected) {
            this.router
                .navigate(['.'], {relativeTo: this.route})
                .then(res => this.router.navigate([this.selected], {relativeTo: this.route}));
        }
    }


    override showDetail(id: number) {
        this.router
            .navigate(['.'], { relativeTo: this.route })
            .then(res => this.router.navigate([0], { relativeTo: this.route }));
    }

    public transactionSaved() {
        this.entitySrv
            .findByJournal(this.entitySrv.getParentId(), this.pagination.page, this.pagination.pageSize)
            .subscribe(res => {
                this.data = res.body;
                this.data.forEach(e => e.id = e.fileId * SCALE + e.oid);
                this.pagination.elementCount = res.itemCount;
            });
    }

    private refreshTransactions() {
        this.entitySrv
            .findByJournal(this.selectedJournal, this.pagination.page, this.pagination.pageSize)
            .subscribe(res => {
                this.data = res.body;
                this.data.forEach(e => e.id = e.fileId * SCALE + e.oid);
                this.pagination.elementCount = res.itemCount;
            });
        this.router
            .navigate(['.'], { relativeTo: this.route })
            .then(_ => {
                this.shellSrv.setGoBackPath('..', this.route);
                // this.showButtons();
            });
    }
    journalSelected(event: MatSelectionListChange) {
        this.selectedJournal = event.options[0].value;
        const journalId = event.options[0].value;
        this.entitySrv.setParentId(journalId);
        this.refreshTransactions();
        this.addButton.visible = journalId > 0;
    }

    protected override canShowProcessingStatus(): boolean {
        return false;
    }

    onMode(e: MatRadioChange) {
        this.transactionMode = +e.value === 1;
        this.navigate();
    }

    get isEditable() {
        return this.fileSrv.isEditable;
    }
}
