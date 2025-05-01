import { Component, effect, inject, OnDestroy, OnInit, signal, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterModule, RouterOutlet } from "@angular/router";
import {
    AccFileService,
    AccJournalsService, AccPoliciesService,
    ACCTransaction,
    AccTransactionLineService,
    AccTransactionService,
    Journal, JournalSummary
} from '@ss/accounting/accounting-api';
import { KeepOnToolbar, ShellService, SnackBarService, ToolbarButton } from '@ss/common/ui-shell';
import {DefaultReportService} from '@ss/common/ui-default-report-component';
import {  ConfirmationDialogService } from "@ss/common/ui-confirmation-dialog";
import { LoginService, MaterialModule, PaginatorPersistenceService } from "@ss/common/api-common";
import {MatSelectionListChange} from '@angular/material/list';
import {switchMap, tap} from 'rxjs';
import {debounceTime, distinctUntilChanged, filter} from 'rxjs/operators';
import {BaseEntityListComponent} from '@ss/common/ui-base-entity';
import { FormControl, ReactiveFormsModule } from "@angular/forms";
import { MatRadioChange } from '@angular/material/radio';
import { CommonModule } from "@angular/common";




import { DatePickerComponent } from "@ss/common/ui-datepicker";
import { AppArchiveMainComponent } from '@ss/common/app-archive';
import { PaginationComponent } from '@ss/common/ui-pagination';
import { TranslateDirective, TranslatePipe } from '@ss/common/ui-lang';
import { toSignal } from '@angular/core/rxjs-interop';
import { Sort } from '@angular/material/sort';
import { callback } from 'chart.js/helpers';


@Component({
    selector: 'ss-transaction-list',
    templateUrl: './transaction-list.component.html',
    styleUrls: ['./transaction-list.component.scss'],
    standalone: true,
    imports: [
        CommonModule,
        RouterModule,
        MaterialModule,
        TranslateDirective,
        ReactiveFormsModule,
        AppArchiveMainComponent,
        PaginationComponent
    ]
})
export class TransactionListComponent extends BaseEntityListComponent<ACCTransaction> implements OnDestroy, OnInit {
    public packButton: ToolbarButton = {
        icon: 'fa-solid fa-cubes',
        label: 'ACC_PACK',
        disabled: false,
        visible: true,
        keepOnToolbar: KeepOnToolbar.ALWAYS,
        click: () => this.pack()
    };

    private fileSrv = inject(AccFileService);
    private journalSrv =  inject(AccJournalsService);
    private detailSrv =  inject(AccTransactionLineService);
    private loginSrv =  inject(LoginService);
    private accPolicySrv =  inject(AccPoliciesService);
    private updateEffect = effect(() => {
        if (this.detailSrv.updateCounter() > 0) {
            if (this.selectedRow) {
                this.entitySrv
                    .get(this.selectedRow?.id)
                    .subscribe(res => {
                        this.entitySrv.select(res);
                        this.selectedRow.debit = res.debit;
                        this.selectedRow.credit = res.credit;
                    });
            }
        }
    });


    transactionMode = true;
    public math = Math;
    isRoot = signal(true);
    isArchive = signal(false);
    journalSummary = signal<JournalSummary>({ id: 0, debit: 0, credit: 0 });
    selectedJournal = 0;
    journalFilter = new FormControl<string>('');
    journalList: Journal[] = [];
    displayedColumns = ['pieceNo', 'pieceDate']; // , 'debit', 'credit'

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
        this.shellSrv.addButton(this.packButton);

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
                this.displayedColumns.push('userName', 'updateTime');
            });

        this.subscriptions
            .push(this.router
                .events
                .pipe(filter(ev => ev instanceof NavigationEnd))
                .subscribe(event => {
                    if (event instanceof NavigationEnd) {
                        const isRoot = event.url === '/app/accounting/transactions';
                        this.isArchive.set(event.url.indexOf('/archive') > 0);
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

        this.shellSrv.setGoBackFn(() => {
            const idx = this.router.url.lastIndexOf('/detail/');
            const remaining = idx >= 0 ? this.router.url.substring(idx + '/detail/'.length) : '';
            if (remaining.length < 1) {
                this.router.navigate(['/app/accounting']).then();
            }
        });

    }


    private setDefaultButtons(isRoot: boolean) {
        this.isRoot.set(isRoot);
        this.addButton.visible = isRoot && this.selectedJournal > 0 && Math.abs(this.journalSummary()?.debit - this.journalSummary()?.credit) < 0.01;
        this.editButton.visible = isRoot;
        this.deleteButton.visible = isRoot;
        if (isRoot) {
            this.journalFilter.enable();
        } else {
            this.journalFilter.disable();
        }
    }

    // private showButtons() {
    //     const itemControlsOn = this.selected != null && this.selected > 0;
    //     this.editButton.disabled = !itemControlsOn;
    //     this.deleteButton.disabled = !itemControlsOn;
    //     this.viewReportButton.disabled = !itemControlsOn;
    // }

    private navigate() {
        if (this.selected) {
            const commands = this.transactionMode? [this.selected] : [this.selected,  'archive'];
            this.router.navigate(commands, {relativeTo: this.route})
                .then(_ => {
                    this.detailSrv.setParentId(this.selected);
                });
        }
    }

    override selectRow(row: ACCTransaction) {
        if (this.isRoot()) {
            super.selectRow(row);
            this.edit();
            this.entitySrv.select(row);
        }
    }

    override edit() {
        this.navigate();
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
                this.pagination.elementCount = res.itemCount;
            });
        this.entitySrv
            .journalSummary()
            .subscribe(res => this.journalSummary.set(res));
    }

    private refreshTransactions() {
        this.entitySrv
            .findByJournal(this.selectedJournal, this.pagination.page, this.pagination.pageSize)
            .subscribe(res => {
                this.data = res.body;
                this.pagination.elementCount = res.itemCount;
            });
        // this.router
        //     .navigate(['.'], { relativeTo: this.route })
        //     .then(_ => {
        //         this.shellSrv.setGoBackPath('..', this.route);
        //         // this.showButtons();
        //     });
    }

    journalSelected(event: MatSelectionListChange) {
        this.selectedJournal = event.options[0].value;
        const journalId = event.options[0].value;
        this.entitySrv.setParentId(journalId);
        this.refreshTransactions();
        this.entitySrv
            .journalSummary()
            .subscribe(res => {
                this.journalSummary.set(res);
                this.addButton.visible = journalId > 0 && Math.abs(this.journalSummary()?.debit - this.journalSummary()?.credit) < 0.01;
            });
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

    override sort(event: Sort) {
        if (this.isRoot()) {
            super.sort(event);
        }
    }

    private pack() {
        this.entitySrv
            .pack(this.selectedJournal)
            .subscribe(res => {
                if (res.count) {
                    this.snackBarSrv.showSuccessMessage();
                    this.refreshTransactions();
                }
            })
    }
}
