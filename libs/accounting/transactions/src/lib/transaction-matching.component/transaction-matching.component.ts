import { Component, computed, inject, Inject, OnInit, signal } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule, PaginationModel } from '@ss/common/api-common';
import { TranslateDirective, TranslatePipe } from '@ss/common/ui-lang';
import { KeepOnToolbar, ShellService, SnackBarService, ToolbarButton } from '@ss/common/ui-shell';
import { ActivatedRoute } from '@angular/router';
import { TransactionMatchingService } from './api/transaction-matching.service';
import { Match, MBalanace } from './api/matching.api';
import { PaginationComponent } from '@ss/common/ui-pagination';
import { Sort } from '@angular/material/sort';
import { DecimalPipe } from '@angular/common';

@Component({
    selector: 'ss-doc-import',
    templateUrl: './transaction-matching.component.html',
    styleUrls: ['./transaction-matching.component.scss'],
    standalone: true,
    imports: [
        MaterialModule,
        TranslateDirective,
        FormsModule,
        ReactiveFormsModule,
        PaginationComponent,
        DecimalPipe,
        TranslatePipe
    ]
})
export class TransactionMatchingComponent implements OnInit {
    #snackBarSrv = inject(SnackBarService);
    #route = inject(ActivatedRoute);
    #shellSrv = inject(ShellService);
    #matchingSrv = inject(TransactionMatchingService);
    #searchText: string = '';
    #debitSort: Sort | null = null;
    #creditSort: Sort | null = null;
    #refreshButton: ToolbarButton = {
        icon: 'fas fa-sync-alt',
        label: 'COMMON_REFRESH',
        disabled: false,
        visible: true,
        keepOnToolbar: KeepOnToolbar.DYNAMIC,
        click: () => this.refresh(this.#searchText || '')
    };

    UNMATCHED_MODE = 1;
    MATCHED_MODE = 2;
    displayedColumns = ['customerCode', 'description', 'matchKey', 'debit', 'credit'];
    creditColumns = ['customerCode', 'description', 'matchKey', 'debit', 'credit', 'matchBtn'];
    debits: MBalanace[] = [];
    credits: MBalanace[] = [];
    debitPaginator = PaginationModel.newInstance({ pageSize: 5, page: 1, elementCount: 0 });
    creditPaginator = PaginationModel.newInstance({ pageSize: 5, page: 1, elementCount: 0 });

    mode = signal(this.UNMATCHED_MODE);
    selectedDebit = signal<MBalanace | null>(null);
    selectedCredit = signal<MBalanace | null>(null);
    validSelection = computed(() =>
        this.selectedDebit() !== null &&
        this.selectedCredit() !== null &&
        this.selectedDebit()?.customerCode === this.selectedCredit()?.customerCode);

    ngOnInit(): void {
        this.#shellSrv.addButton(this.#refreshButton);
        this.#shellSrv.setGoBackPath('../', this.#route);
        this.#shellSrv.setTitle('ACC_TRANSACTION_MATCHING');
        this.#shellSrv.enableSearch('SEARCH_APP', o => o.subscribe((f: string) => this.refresh(f)));
        this.#shellSrv.updateShell();
        this.debitPaginator.onChange = () => this.refreshDebit();
        this.creditPaginator.onChange = () => this.refreshCredit();
    }

    private refresh(str: string) {
        this.#searchText = str;
        this.refreshDebit();
        this.clearCredit();
    }

    private refreshCredit() {
        const col = this.#creditSort?.active ? this.#creditSort.active : null;
        const direction = this.#creditSort?.direction === 'asc' ? '' : '-';
        const orderBy = col ? `${direction}${col}` : null;
        const obs = this.mode() === this.MATCHED_MODE ?
            this.#matchingSrv.creditorMatches(this.creditPaginator.page - 1, this.creditPaginator.pageSize, this.selectedDebit()?.customerCode, null, orderBy) :
            this.#matchingSrv.credits(this.creditPaginator.page - 1, this.creditPaginator.pageSize, this.selectedDebit()?.customerCode, null, orderBy);
        obs.subscribe(res => {
            this.credits = res.body;
            this.creditPaginator.elementCount = res.itemCount;
        });
    }

    private refreshDebit() {
        const col = this.#debitSort?.active ? this.#debitSort.active : null;
        const direction = this.#debitSort?.direction === 'asc' ? '' : '-';
        const orderBy = col ? `${direction}${col}` : null;
        const obs = this.mode() === this.MATCHED_MODE ?
            this.#matchingSrv.debtorMatches(this.debitPaginator.page - 1, this.debitPaginator.pageSize, this.#searchText, orderBy) :
            this.#matchingSrv.debits(this.debitPaginator.page - 1, this.debitPaginator.pageSize, this.#searchText, orderBy);

        obs.subscribe(res => {
            this.debits = res.body;
            this.debitPaginator.elementCount = res.itemCount;
        });
    }

    sortDebit(event: Sort) {
        this.#debitSort = event;
        this.refreshDebit();
    }

    sortCredit(event: Sort) {
        this.#creditSort = event;
        this.refreshCredit();
    }

    selectDebit(debit: MBalanace) {
        this.selectedDebit.set(debit);
        this.refreshCredit();
    }

    selectCredit(credit: MBalanace) {
        this.selectedCredit.set(credit);
    }

    join(e: MBalanace) {
        if (e.customerCode === this.selectedDebit()?.customerCode) {
            const data: Match = {
                fileId: e.fileId,
                srcId: this.selectedDebit()?.id,
                srcLine: this.selectedDebit()?.lineNumber,
                withId: e.id,
                customer: e.customerCode,
                withLine: e.lineNumber
            };
            if (this.mode() === this.UNMATCHED_MODE) {
                this.#matchingSrv
                    .join(data)
                    .subscribe(res => {
                        if (res.count > 0) {
                            this.#snackBarSrv.showSuccessMessage();
                            this.refreshDebit();
                            this.clearCredit();
                        }
                    });
            } else {
                this.#matchingSrv
                    .free(data)
                    .subscribe(res => {
                        if (res.count > 0) {
                            this.#snackBarSrv.showSuccessMessage();
                            this.refreshDebit();
                            this.clearCredit();
                        }
                    });
            }
        }
    }

    private clearCredit() {
        this.selectedDebit.set(null);
        this.credits = [];
        this.creditPaginator.elementCount = 0;
    }

    toggleMode() {
        this.mode.set(this.mode() === this.UNMATCHED_MODE ? this.MATCHED_MODE : this.UNMATCHED_MODE);
        this.refreshDebit();
        this.clearCredit();
    }
}
