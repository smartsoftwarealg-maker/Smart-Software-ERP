import {Component, computed, DestroyRef, effect, inject, signal, Signal} from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseEntityListComponent } from '@ss/common/ui-base-entity';
import { Debt } from '../services/compensation-api';
import {
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatHeaderCell, MatHeaderCellDef,
    MatHeaderRow,
    MatHeaderRowDef, MatRow, MatRowDef, MatTable
} from '@angular/material/table';
import { PaginationComponent } from '@ss/common/ui-pagination';
import { TranslateDirective, TranslatePipe } from '@ss/common/ui-lang';
import { Joint, Payment, SSPaymentService } from '@ss/scheduled-sales/api-scheduled-sales';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { ActivatedRoute, Router } from '@angular/router';
import { DefaultReportService } from '@ss/common/ui-default-report-component';
import { ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import {MaterialModule, PaginationModel, PaginatorPersistenceService} from '@ss/common/api-common';
import {MatSort, MatSortHeader, Sort} from '@angular/material/sort';
import { MatCheckbox } from '@angular/material/checkbox';
import { DebtService } from '../services/debt.service';
import { HttpParams } from '@angular/common/http';
import { MatRadioButton, MatRadioChange, MatRadioGroup } from '@angular/material/radio';
import { SsDirectPaymentService } from '@ss/scheduled-sales/api-scheduled-sales';
import {FormControl, ReactiveFormsModule} from "@angular/forms";
import {MatFormField, MatInput, MatLabel} from "@angular/material/input";
import {Observable, takeUntil, tap} from "rxjs";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {debounceTime, distinctUntilChanged} from "rxjs/operators";

enum SelectionMode {
    Debt = 1,
    Payment = 2
}

@Component({
    selector: 'ss-payments-compensations-list',
    imports: [
        CommonModule,
        MaterialModule,
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
        MatHeaderCellDef,
        MatSort,
        MatSortHeader,
        MatCheckbox,
        MatRadioButton,
        MatRadioGroup,
        MatFormField,
        MatInput,
        MatLabel,
        ReactiveFormsModule
    ],
    templateUrl: './payment-compensation-list.component.html',
    styleUrl: './payment-compensation-list.component.scss',
})
export class PaymentCompensationListComponent extends BaseEntityListComponent<Payment> {
    #destroyRef = inject(DestroyRef);
    #debtsSrv = inject(DebtService);
    #selectionMode = signal<SelectionMode>(SelectionMode.Debt);

    displayedColumns = ['customerCode', 'agentDescription', 'payment', 'amount', 'date', 'chkNumber', 'bankDescription', 'document'];
    childColumns = ['date', 'invoiceNumber', 'customerCode', 'customerName', 'ftt', 'payment', 'paid'];
    childPaginator = PaginationModel.newInstance({ page: 1, pageSize: 5, elementCount: 0 });
    childData: Debt[] = [];
    selectedChild = signal(0);
    searchField = new FormControl<string>('');

    constructor(
        public override entitySrv: SsDirectPaymentService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override router: Router,
        public override defReportSrv: DefaultReportService,
        public override confirmationSrv: ConfirmationDialogService,
        public override pagPersistSrv: PaginatorPersistenceService) {
        super(entitySrv,
            shellSrv,
            snackBarSrv,
            route,
            router,
            confirmationSrv,
            defReportSrv,
            pagPersistSrv,
            'COMMON_PAYMENTS');
        this.pagination.pageSize = 5;
        this.childPaginator.onChange = () => this.refreshChild();
    }

    protected override preInit(): Observable<unknown> {
        return super.preInit()
            .pipe(tap(() => {
                this.addButton.visible = false;
                this.editButton.visible = false;
                this.deleteButton.visible = false;
            }));
    }

    override selectRow(row: Payment) {
        super.selectRow(row);
        this.refreshChild();
    }

    private refreshChild() {
        const params = new HttpParams();
        const params1 =
            ((this.#selectionMode() === SelectionMode.Debt)?
            params.set('agent', this.selectedRow?.agentId || -1) :
            params.set('payment', this.selected)).set('filter', this.searchField.value);
        this.#debtsSrv
            .getList(this.childPaginator.page - 1, this.childPaginator.pageSize, null, null, params1)
            .subscribe(res => {
                this.childData = res.body;
                this.childPaginator.elementCount = res.itemCount;
                this.selectedChild.set(0);
            });
    }

    selectChildRow(row: Debt) {
        this.selectedChild.set( row?.id ||0);
    }

    joinOrFree(row: Debt) {
        if (this.#selectionMode() === SelectionMode.Debt) {
            this.join(row);
        } else {
            this.free(row);
        }
    }

    private join(row: Debt) {
        const joint: Joint = { salesId: row.id, paymentId: this.selected, agentId: row.agentId };
        const selectedRow = this.selectedRow;
        this.entitySrv.join(joint)
            .subscribe(() => {
                this.refreshChild();
                this.refresh(() => this.selectRow(selectedRow));
            });
    }
    private free(row: Debt) {
        const joint: Joint = { salesId: row.id, paymentId: this.selected, agentId: row.agentId };
        const selectedRow = this.selectedRow;
        this.entitySrv.free(joint)
            .subscribe(() => {
                this.refreshChild();
                this.refresh(() => this.selectRow(selectedRow));
            });
    }

    onChange(e: MatRadioChange) {
        this.#selectionMode.set(+e.value === 1? SelectionMode.Debt : SelectionMode.Payment);
        this.refreshChild();
    }

    protected override canShowProcessingStatus(): boolean {
        return false;
    }

    sortChild(event: Sort) {
        this.#debtsSrv.sortColumn = event;
        this.refreshChild();
    }

    override refresh(callback?: () => void) {
        super.refresh(callback);
        this.selectRow(null);
    }

    override ngOnInit() {
        super.ngOnInit();
        this.searchField
            .valueChanges
            .pipe(
                takeUntilDestroyed(this.#destroyRef),
                debounceTime(300),
                distinctUntilChanged(),
            )
            .subscribe(() => this.refreshChild());
    }
}
