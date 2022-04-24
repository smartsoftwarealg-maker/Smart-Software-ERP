import {Component, OnDestroy, ViewChild} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router, RouterOutlet} from '@angular/router';
import {
    AccJournalsService,
    ACCTransaction,
    AccTransactionLineService,
    AccTransactionService,
    Journal,
} from '@ss/accounting/accounting-api';
import {KeepOnToolbar, ShellService, SnackBarService, ToolbarButton} from '@ss/common/ui-shell';
import {DefaultReportService} from '@ss/common/ui-default-report-component';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {LoginService, PaginatorPersistenceService} from '@ss/common/api-common';
import {MatSelectionListChange} from '@angular/material/list';
import {Observable, Subscription, tap} from 'rxjs';
import {filter} from 'rxjs/operators';
import {BaseEntityListComponent} from '@ss/common/ui-base-entity';

@Component({
  selector: 'ss-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.scss']
})
export class TransactionListComponent extends BaseEntityListComponent<ACCTransaction> implements OnDestroy {
    private headerMode: boolean = true;
    private listButton: ToolbarButton = {
        icon: this.headerMode? 'far fa-smile' : 'fas fa-child',
        label: this.headerMode? 'ACC_SHOW_DETAIL' : 'ACC_SHOW_HEADER',
        disabled: false,
        visible: true,
        keepOnToolbar: KeepOnToolbar.DYNAMIC,
        click: () => this.toggleMode()
    };
    private subs: Subscription = null;
    journalList: Journal[] = [];
    displayedColumns = ['pieceNo', 'pieceDate', 'debit', 'credit', 'projectName'];

    @ViewChild(RouterOutlet) outlet: RouterOutlet;

    constructor(
        public override entitySrv: AccTransactionService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override router: Router,
        public override defReportSrv: DefaultReportService,
        public override confirmationSrv: ConfirmationDialogService,
        public override pagPersistSrv: PaginatorPersistenceService,
        private journalSrv: AccJournalsService,
        private detailSrv: AccTransactionLineService) {
        super(entitySrv, shellSrv, snackBarSrv, route, router, confirmationSrv, defReportSrv, pagPersistSrv, 'ACC_TRANSACTIONS');
        entitySrv.setParentId(0);
    }

    override preload(): Observable<any> {
        return this.journalSrv
            .getList(0, 50)
            .pipe(tap(res => this.journalList = res.body));
    }

    override ngOnInit() {
        this.journalSrv
            .getList(0, 50)
            .subscribe(res => this.journalList = res.body);
        this.subs = this.router
            .events
            .pipe(filter(ev => ev instanceof NavigationEnd))
            .subscribe(event => {
                if (event instanceof NavigationEnd) {
                    if (event.url === '/app/accounting/transactions') {
                        this.transactionSaved();
                        this.setDefaultButtons();
                    }
                }
            });
        this.setDefaultButtons();
    }

    private setDefaultButtons() {
        this.shellSrv.setButtons([this.refreshButton,
                                  this.addButton,
                                  this.editButton,
                                  this.deleteButton,
                                  this.viewReportButton,
                                  this.defReportButton,
                                  this.listButton]);
        this.shellSrv.updateShell();
    }

    override ngOnDestroy() {
        super.ngOnDestroy();
        this.subs?.unsubscribe();
    }

    private showButtons() {
        const itemControlsOn = this.selected != null && this.selected > 0;
        this.editButton.disabled = !itemControlsOn;
        this.deleteButton.disabled = !itemControlsOn;
        this.viewReportButton.disabled = !itemControlsOn;
        this.setDefaultButtons();
    }

    private navigate() {
        if (this.selected) {
            if (this.outlet?.isActivated) {
                this.outlet.deactivate();
            }
            const commands = this.headerMode? [this.selected] : [this.selected, 'detail'];
            this.router
                .navigate(['.'], { relativeTo: this.route })
                .then(_ => this.router.navigate(commands, {relativeTo: this.route}))
                .then(_ => {
                    this.detailSrv.setParentId(this.selected);
                });
        }
    }

    override selectRow(row: ACCTransaction) {
        row.id = (row.fileId || 0 ) * 10000 + (row.oid || 0);
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
                this.pagination.elementCount = res.itemCount;
            });
    }

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
                this.shellSrv.setGoBackPath('..', this.route);
                this.showButtons();
            });
    }

    toggleMode( ) {
        this.headerMode = !this.headerMode;
        this.listButton.icon  = this.headerMode? 'far fa-smile' : 'fas fa-child';
        this.listButton.label = this.headerMode? 'ACC_SHOW_DETAIL' : 'ACC_SHOW_HEADER';
        this.navigate();
    }
}
