import { Component, effect, inject, OnDestroy, OnInit, signal, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterModule, RouterOutlet } from '@angular/router';
import {
    AccFileService,
    AccJournalsService, AccPoliciesService, ACCTransaction,
    AccTransactionLineService,
    AccTransactionService,
    Journal, JournalSummary
} from '@ss/accounting/accounting-api';
import { KeepOnToolbar, ShellService, SnackBarService, ToolbarButton } from '@ss/common/ui-shell';
import { DefaultReportService } from '@ss/common/ui-default-report-component';
import { ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { LoginService, MaterialModule, PaginatorPersistenceService } from '@ss/common/api-common';
import {MatListOption, MatSelectionListChange } from '@angular/material/list';
import {Observable, switchMap, tap } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter } from 'rxjs/operators';
import { BaseEntityListComponent } from '@ss/common/ui-base-entity';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatRadioChange } from '@angular/material/radio';
import { CommonModule } from '@angular/common';
import { AppArchiveMainComponent } from '@ss/common/app-archive';
import { PaginationComponent } from '@ss/common/ui-pagination';
import { TranslateDirective } from '@ss/common/ui-lang';
import { Sort } from '@angular/material/sort';
import {Transaction} from "@ss/logistics/api-transaction";
import {MatOption} from "@angular/material/core";


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
    private packButton: ToolbarButton = {
        icon: 'fa-solid fa-cubes',
        label: 'ACC_PACK',
        disabled: false,
        visible: true,
        keepOnToolbar: KeepOnToolbar.ALWAYS,
        click: () => this.pack()
    };

    private fileSrv = inject(AccFileService);
    private journalSrv = inject(AccJournalsService);
    private detailSrv = inject(AccTransactionLineService);
    private loginSrv = inject(LoginService);
    private accPolicySrv = inject(AccPoliciesService);
    private updateEffect = effect(() => {
        if (this.detailSrv.updateCounter() > 0) {
            if (this.selectedRow()) {
                this.entitySrv
                    .get(this.selectedId())
                    .subscribe(res => {
                        this.entitySrv.select(res);
                        this.selectedRow.update(v => (v? {...v, debit: res?.debit||0, credit: res?.credit||0}: null));
                    });
            }
        }
    });


    selectedJournal = signal(0);
    transactionMode = true;
    public math = Math;
    isRoot = signal(true);
    isArchive = signal(false);
    journalSummary = signal<JournalSummary>({ id: 0, debit: 0, credit: 0 });
    journalFilter = new FormControl<string>('');
    journalList = signal<Journal[]>([]);
    displayedColumns = signal<string[]>(['pieceNo', 'pieceDate']); // , 'debit', 'credit'

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
   override preload():Observable<any>{
       return this.journalSrv
           .getUserJournals(this.journalFilter.value || '')
           .pipe(
               tap(res => {
                   this.journalList.set(res.body.filter(j => !j.blocked || j.blockYear < this.loginSrv.appCtx.accYear));
                   this.shellSrv.addButton(this.packButton);
               }),
               switchMap(() => this.accPolicySrv.get(this.loginSrv.appCtx.center)),
                   tap((policy => {
                       if (policy.showProjects) {
                           this.displayedColumns.update(v => [...v, 'projectName']);
                       }
                       if (policy.showBudget) {
                           this.displayedColumns.update(v => [...v, 'isBudget']);
                       }
                       this.displayedColumns.update(v => [...v, 'userName', 'updateTime']);
                   })),
               switchMap(() => super.preload())
           );
    }


    override ngOnInit() {
        this.setDefaultButtons(true);
        super.ngOnInit();


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
                .subscribe(res => this.journalList.set(res.body.filter(j => !j.blocked || j.blockYear < this.loginSrv.appCtx.accYear))));

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
        const isRootAndTransactionMode = isRoot && this.transactionMode;
        this.addButton.visible = isRootAndTransactionMode && this.selectedJournal() > 0; // && Math.abs(this.journalSummary()?.debit - this.journalSummary()?.credit) < 0.01;
        this.editButton.visible = isRootAndTransactionMode;
        this.deleteButton.visible = isRootAndTransactionMode;
        this.shellSrv.setVisibleSearch(isRootAndTransactionMode);
        this.shellSrv.setGoBackEnabled(isRootAndTransactionMode);
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
        if (this.selectedId()) {
            this.loading.set(true);
            const commands = this.transactionMode ? [this.selectedId()] : [this.selectedId(), 'archive'];
            this.router.navigate(commands, { relativeTo: this.route })
                .then(_ => {
                    this.detailSrv.setParentId(this.selectedId());
                    this.loading.set(false);
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
        this.loading.set(true);
        this.entitySrv
            .journalSummary()
            .pipe(
                tap(res => this.journalSummary.set(res)),
                switchMap(() => this.entitySrv.findByJournal(this.entitySrv.getParentId(), this.pagination.page, this.pagination.pageSize, this.filter))
            ).subscribe(res => {
                this.data.set(res.body);
                this.pagination.elementCount = res.itemCount;
                this.loading.set(false);
            });
    }

    private refreshTransactions() {
        this.loading.set(true);
        this.entitySrv
            .findByJournal(this.selectedJournal(), this.pagination.page, this.pagination.pageSize, this.filter)
            .subscribe(res => {
                this.data.set(res.body);
                this.pagination.elementCount = res.itemCount;
                this.loading.set(false);
            });
    }


    journalSelected(event: MatSelectionListChange) {
        this.shellSrv.setLoading(true);
        this.loading.set(true);
        this.selectedJournal.set(event.options[0].value);
        const journalId = event.options[0].value;
        this.entitySrv.setParentId(journalId);
        this.entitySrv
            .findByJournal(this.selectedJournal(), this.pagination.page, this.pagination.pageSize, this.filter)
            .pipe(
                tap(res => {
                    this.data.set(res.body);
                    this.pagination.elementCount = res.itemCount;
                }),
                switchMap(() => this.entitySrv.journalSummary()),
                tap(res => {
                    this.journalSummary.set(res);
                    this.addButton.visible = journalId > 0 && Math.abs(this.journalSummary()?.debit - this.journalSummary()?.credit) < 0.01;
                })
                ).subscribe(() => {
                     this.shellSrv.setLoading(false);
                     this.loading.set(false);
            });
    }

    protected override canShowProcessingStatus(): boolean {
        return false;
    }

    onMode(e: MatRadioChange) {
        this.transactionMode = +e.value === 1;
        this.refreshButton.visible = this.transactionMode;
        this.addButton.visible = this.transactionMode;
        this.editButton.visible = this.transactionMode;
        this.deleteButton.visible = this.transactionMode;
        this.shellSrv.setVisibleSearch(this.transactionMode);
        this.shellSrv.setGoBackEnabled(this.transactionMode);
        this.router.navigate(['/app/accounting/transactions']).then();
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
            .pack(this.selectedJournal())
            .subscribe(res => {
                if (res.count) {
                    this.snackBarSrv.showSuccessMessage();
                    this.refreshTransactions();
                }
            });
    }

    override refresh() {
        this.loading.set(true);
        if (this.transactionMode) {
            super.refresh(() => this.loading.set(false));
        }
    }

    selectAndScroll(option: MatListOption) {
        if (option) {
            // Scroll into view (after selection)
            setTimeout(() => {
                option._elementRef.nativeElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center'
                });
            }, 100);
        }
    }
}
