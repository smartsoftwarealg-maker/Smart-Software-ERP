import { Component, inject } from '@angular/core';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { ActivatedRoute, Router } from '@angular/router';
import { TaxPayment } from '../tax-payment.api';
import { TaxPaymentService } from '../tax-payment.service';
import {
    LoginService,
    PaginatorPersistenceService,
} from '@ss/common/api-common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormField, MatInput, MatLabel } from '@angular/material/input';
import { TranslateDirective } from '@ss/common/ui-lang';
import {
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderCellDef,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRow,
    MatRowDef,
    MatTable,
} from '@angular/material/table';
import { MatSort, MatSortHeader } from '@angular/material/sort';
import { PaginationComponent } from '@ss/common/ui-pagination';
import { BaseEntityListComponent } from '@ss/common/ui-base-entity';
import { ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { DefaultReportService } from '@ss/common/ui-default-report-component';
import { debounceTime } from 'rxjs/operators';

@Component({
    selector: 'ss-tax-payment-list',
    imports: [
        MatFormField,
        MatLabel,
        ReactiveFormsModule,
        TranslateDirective,
        MatCell,
        MatCellDef,
        MatColumnDef,
        MatHeaderCell,
        MatHeaderRow,
        MatHeaderRowDef,
        MatRow,
        MatRowDef,
        MatSort,
        MatSortHeader,
        MatTable,
        PaginationComponent,
        MatHeaderCellDef,
        MatInput,
    ],
    templateUrl: './tax-payment-list.component.html',
    styleUrl: './tax-payment-list.component.scss',
})
export class TaxPaymentListComponent extends BaseEntityListComponent<TaxPayment> {
    yearCtrl = new FormControl<number>(null);
    private loginSrv = inject(LoginService);
    displayedColumns = ['date', 'base', 'irg'];
    constructor(
        public override entitySrv: TaxPaymentService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override confirmationSrv: ConfirmationDialogService,
        public override defReportSrv: DefaultReportService,
        public override router: Router,
        public override pagPersistSrv: PaginatorPersistenceService,
    ) {
        super(
            entitySrv,
            shellSrv,
            snackBarSrv,
            route,
            router,
            confirmationSrv,
            defReportSrv,
            pagPersistSrv,
            'PAYROLL_TAX_PAYMENTS',
        );
    }

    override ngOnInit() {
        const year = new Date().getFullYear();
        this.yearCtrl.setValue(year);
        this.entitySrv.setParentId(year);
        super.ngOnInit();
        this.yearCtrl.valueChanges
            .pipe(debounceTime(500))
            .subscribe((value) => {
                this.entitySrv.setParentId(value);
                this.refresh();
            });
    }
}
