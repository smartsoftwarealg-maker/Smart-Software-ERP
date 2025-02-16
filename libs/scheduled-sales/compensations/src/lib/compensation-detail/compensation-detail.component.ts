import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    BaseChildEntityDetailComponent,
    BaseChildEntityListComponent,
    BaseEntityListComponent
} from '@ss/common/ui-base-entity';
import { Compensation, Debt, InvoicePayment } from '../services/compensation-api';
import { BankService } from '@ss/administration/api-bank';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { ActivatedRoute, Router } from '@angular/router';
import { DefaultReportService } from '@ss/common/ui-default-report-component';
import { ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { MaterialModule, PaginatorPersistenceService } from '@ss/common/api-common';
import { DebtService } from '../services/debt.service';
import {
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatHeaderCell, MatHeaderCellDef,
    MatHeaderRow,
    MatHeaderRowDef, MatRow, MatRowDef, MatTable
} from '@angular/material/table';
import { MatSort, MatSortHeader } from '@angular/material/sort';
import { PaginationComponent } from '@ss/common/ui-pagination';
import { TranslateDirective } from '@ss/common/ui-lang';
import { InvoicePaymentService } from '../services/invoice-payment.service';
import { FormsModule, ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatCard, MatCardContent } from '@angular/material/card';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { DatePickerComponent } from '@ss/common/ui-datepicker';
import { MatMiniFabButton } from '@angular/material/button';
import { UiAutoCompleteComponent } from '@ss/common/ui-auto-complete';
import { CompensationService } from '../services/compensation.service';

@Component({
    selector: 'ss-invoice-payments',
    imports: [
        CommonModule,
        MaterialModule,
        TranslateDirective,
        FormsModule,
        DatePickerComponent
    ],
    templateUrl: './compensation-detail.component.html',
    styleUrl: './compensation-detail.component.scss',
})
export class CompensationDetailComponent extends BaseChildEntityDetailComponent<Compensation> {
    #formBuilder = inject(UntypedFormBuilder);

    constructor(entitySrv: CompensationService) {
        super(entitySrv, 'InvoicePayment');
    }

    override setupForm(a: InvoicePayment): UntypedFormGroup {
        return this.form = this.#formBuilder.group({
            id:           [a.id],
            parentId:     [a.parentId || this.entitySrv.getParentId(), Validators.required],
            description:  [a.description, Validators.required],
            creationTime: [a.creationTime || new Date(), Validators.required],
            amount:       [a.amount, Validators.required],
        });
    }
}
