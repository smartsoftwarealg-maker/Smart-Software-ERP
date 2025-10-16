import { Component, DestroyRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseEntityListComponent } from '@ss/common/ui-base-entity';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { ActivatedRoute, Router } from '@angular/router';
import { LookupsService } from '@ss/common/api-lookup';
import {
    HttpService,
    LanguageService,
    LoginService,
    MaterialModule,
    PaginatorPersistenceService
} from '@ss/common/api-common';
import { ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { DefaultReportService } from '@ss/common/ui-default-report-component';
import { Payment, SSPaymentService } from '@ss/scheduled-sales/api-scheduled-sales';

import {
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatHeaderCell, MatHeaderCellDef,
    MatHeaderRow,
    MatHeaderRowDef, MatRow, MatRowDef, MatTable
} from '@angular/material/table';
import { MatSort, MatSortHeader } from '@angular/material/sort';

import { MatCheckbox } from '@angular/material/checkbox';
import { PaginationComponent } from '@ss/common/ui-pagination';
import { TranslateDirective } from '@ss/common/ui-lang';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormField, MatInput, MatLabel } from '@angular/material/input';
import { DatePickerComponent } from '@ss/common/ui-datepicker';
import { callback } from 'chart.js/helpers';
import { Observable, takeUntil } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
    selector: 'ss-payments-list',
    standalone: true,
    imports: [
        CommonModule,
        MaterialModule,
        MatCell,
        MatColumnDef,
        MatHeaderCell,
        MatHeaderRow,
        MatRow,
        MatSort,
        MatSortHeader,
        MatTable,
        MatCheckbox,
        PaginationComponent,
        MatCellDef,
        MatHeaderCellDef,
        MatRowDef,
        MatHeaderRowDef,
        TranslateDirective,
        FormsModule,
        MatFormField,
        MatLabel,
        ReactiveFormsModule,
        DatePickerComponent,
        MatFormField
    ],
    templateUrl: './payments-list.component.html',
    styleUrl: './payments-list.component.css',
})
export class PaymentsListComponent extends BaseEntityListComponent<Payment> {
    private destroyRef = inject(DestroyRef);
    private loginSrv = inject(LoginService);
    private NOW = new Date();

    from = new FormControl<Date>(new Date(this.NOW.getTime() - 365 * 24 * 60 * 60 * 1000));
    to = new FormControl<Date>(this.NOW);

    public override displayedColumns = [
        'date',
        'payMethodDescription',
        'chkDate',
        'chkNumber',
        'bankDescription',
        'amount',
        'memo',
        'validated'
    ];

    constructor(
        public override entitySrv: SSPaymentService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override router: Router,
        public lookupsSrv: LookupsService,
        public langSrv: LanguageService,
        public override confirmationSrv: ConfirmationDialogService,
        public override defReportSrv: DefaultReportService,
        public httpSrv: HttpService,
        public override pagPersistSrv: PaginatorPersistenceService) {
        super(entitySrv, shellSrv, snackBarSrv, route, router, confirmationSrv, defReportSrv, pagPersistSrv, 'COMMON_PAYMENTS');
        this.pagination.pageSize = 15;
    }

    override ngOnInit() {
         this.editButton.visible = this.addButton.visible = this.deleteButton.visible = !this.loginSrv.appCtx.agentId;
         super.ngOnInit();
         this.refresh();
         this.from
             .valueChanges
             .pipe(
                 debounceTime(300),
                 distinctUntilChanged(),
                 takeUntilDestroyed(this.destroyRef))
             .subscribe(value => this.refresh());
         this.to
             .valueChanges
             .pipe(
                 debounceTime(300),
                 distinctUntilChanged(),
                 takeUntilDestroyed(this.destroyRef))
             .subscribe(value => this.refresh());
    }

    override getPage(): Observable<Payment[]> {
        return this.entitySrv.getPeriodicPage(this.pagination, this.from.value, this.to.value, this.filter, this.sortBy);
    }
}
