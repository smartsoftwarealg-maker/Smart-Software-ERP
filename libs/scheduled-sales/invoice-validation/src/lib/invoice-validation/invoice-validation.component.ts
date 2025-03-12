import { Component, ElementRef, inject, QueryList, signal, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseEntityListComponent } from '@ss/common/ui-base-entity';
import { Bank, BankService } from '@ss/administration/api-bank';
import { ValidatedSale } from '@ss/scheduled-sales/api-scheduled-sales';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { ActivatedRoute, Router } from '@angular/router';
import { DefaultReportService } from '@ss/common/ui-default-report-component';
import { ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { dateToYmdStr, MaterialModule, PaginatorPersistenceService } from '@ss/common/api-common';
import { InvoiceValidationService } from './invoice-validation.service';
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
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCard } from '@angular/material/card';
import { DatePickerComponent } from '@ss/common/ui-datepicker';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs';
import { isContentEditable } from '@angular-eslint/eslint-plugin-template/dist/utils/is-content-editable';

@Component({
    selector: 'ss-invoice-validation',
    imports: [CommonModule, MaterialModule, MatCell, MatCellDef, MatColumnDef, MatHeaderCell, MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef, MatSort, MatSortHeader, MatTable, PaginationComponent, TranslateDirective, MatHeaderCellDef, MatCard, ReactiveFormsModule, DatePickerComponent, MatError, MatFormField, MatLabel, MatInput],
    templateUrl: './invoice-validation.component.html',
    standalone: true,
    styleUrl: './invoice-validation.component.scss'
})
export class InvoiceValidationComponent extends BaseEntityListComponent<ValidatedSale> {
    #formBuilder = inject(FormBuilder);

    showCheckMark = signal(0);


    form = this.#formBuilder.group({
        date: [new Date(), Validators.required],
        number: [0]
    });

    @ViewChild('number') inputEl!: ElementRef;

    displayedColumns = [
        'serialNumber',
        'date',
        'customerCode',
        'denomination',
        // 'reference',
        'description',
        'quantity',
        'validationTime',
        'receiverDescription'
    ];

    constructor(
        public override entitySrv: InvoiceValidationService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override router: Router,
        public override defReportSrv: DefaultReportService,
        public override confirmationSrv: ConfirmationDialogService,
        public override pagPersistSrv: PaginatorPersistenceService) {
        super(
            entitySrv,
            shellSrv,
            snackBarSrv,
            route,
            router,
            confirmationSrv,
            defReportSrv,
            pagPersistSrv,
            'SCH_SHIPPING');
        this.pagination.pageSize = 15;
    }

    validate() {
        this.entitySrv
            .validate(this.form.controls.number.value)
            .subscribe(res => {
                console.log(res);
                if (res.count > 0) {
                    this.refresh();
                    this.snackBarSrv.showSuccessMessage();
                    this.showCheckMark.set(1);
                    setTimeout(() => this.showCheckMark.set(0),3000);
                } else {
                    this.showCheckMark.set(2);
                    setTimeout(() => this.showCheckMark.set(0),3000);
                }
            });
    }

    override ngOnInit() {
        this.deleteButton.visible = this.addButton.visible = this.editButton.visible = false;
        super.ngOnInit();

        const today = dateToYmdStr(new Date());

        this.form
            .controls
            .date
            .valueChanges
            .pipe(
                tap(d => {
                    if (dateToYmdStr(d) === today) {
                        this.form.controls.number.enable();
                        setTimeout(() => this.inputEl.nativeElement.focus());
                    } else {
                        this.form.controls.number.disable();
                    }
                }),
                debounceTime(300),
                distinctUntilChanged()
            )
            .subscribe(res => {
                this.entitySrv.date = res;
                this.refresh();
            });
    }
}
