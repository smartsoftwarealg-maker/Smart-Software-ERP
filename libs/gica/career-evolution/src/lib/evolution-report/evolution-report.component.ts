import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRow,
    MatRowDef,
    MatTable
} from '@angular/material/table';
import { MatSort, MatSortHeader, Sort } from '@angular/material/sort';

import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { map, Observable, of, switchMap, tap } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { Deduction, Report } from '../gica-careers-api';
import { MatButton } from '@angular/material/button';
import { MaterialModule, PaginationModel } from '@ss/common/api-common';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { ActivatedRoute } from '@angular/router';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { DeductionService } from '../services/deduction.service';
import { ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { TranslateDirective, TranslatePipe } from '@ss/common/ui-lang';
import { PaginationComponent } from '@ss/common/ui-pagination';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
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
        MatFormField,
        MatInput,
        MatLabel,
        ReactiveFormsModule,
        MatButton,
        TranslatePipe,
        TranslateDirective,
        PaginationComponent
    ],
    selector: 'ss-gica-deduction-report',
    standalone: true,
    styleUrl: './evolution-report.component.css',
    templateUrl: './evolution-report.component.html'
})
export class EvolutionReportComponent implements OnInit {
    #confirmationSrv = inject(ConfirmationDialogService);
    #snackBarSrv = inject(SnackBarService);
    #destroyRef = inject(DestroyRef);
    #route = inject(ActivatedRoute);
    #shellSrv = inject(ShellService);
    #today = new Date();
    #deductionSrv = inject(DeductionService);

    paginator = PaginationModel.newInstance({page: 1, pageSize: 10, elementCount: 0});
    displayedColumns = [
        'id',
        'firstName',
        'lastName',
        'grade',
        'deduction',
        'oldRate',
        'rate',
        'hireDate'
    ];
    selectedReport: Report | null = null;

    processing = signal(false);
    dataLength = signal(0);

    data$:Observable<Deduction[]> | null = null;
    year = new FormControl<number>({ value: this.#today.getFullYear(), disabled: false });
    month = new FormControl<number>({ value: this.#today.getMonth() + 1, disabled: false }, [Validators.required, Validators.max(12), Validators.min(1)]);

    refresh() {
        const params = new HttpParams()
            .set('year', this.year.value)
            .set('month', this.month.value);
        this.data$ = this
            .#deductionSrv
            .getList(this.paginator.page - 1, this.paginator.pageSize, null, this.#deductionSrv.sortColumn, params)
            .pipe(
                tap(res => {
                    this.paginator.elementCount = res.itemCount;
                    this.dataLength.set(this.paginator.elementCount);
                }),
                map(res => res.body),
                tap(() => this.processing.set(false)));
    }

    sort(event: Sort) {
        this.#deductionSrv.sortColumn = event;
        this.refresh();
    }

    selectRow(report: Report) {
        this.selectedReport = report;
    }

    ngOnInit() {
        this.paginator.onChange = () => this.refresh();
        this.#shellSrv.setTitle('PAYROLL_EVOLUTION_REPORT');
        this.#shellSrv.setGoBackPath('..', this.#route);
        this.year
            .valueChanges
            .pipe(takeUntilDestroyed(this.#destroyRef),
                  distinctUntilChanged(),
                  debounceTime(300))
            .subscribe(() => this.refresh());
        this.month
            .valueChanges
            .pipe(takeUntilDestroyed(this.#destroyRef),
                  distinctUntilChanged(),
                  debounceTime(300))
            .subscribe(() => this.refresh());
        this.refresh();
    }

    // apply() {
    //     this.processing.set(true);
    //     this.deductionSrv.generate(this.year.value)
    //         .subscribe({
    //             next: res => {
    //                 if (res.count) {
    //                     this.snackBarSrv.showSuccessMessage();
    //                     this.refresh();
    //                 }
    //                 this.processing.set(false);
    //             },
    //             error: err => {
    //                 this.processing.set(false);
    //                 this.snackBarSrv.showFailureMessage();
    //                 //this.shellSrv.setLoading(false);
    //                 throw err;
    //             }
    //         });
    // }
    //
    // delete() {
    //     this.processing.set(true);
    //     this.confirmationSrv
    //         .confirmDelete()
    //         .pipe(switchMap(yes => yes? this.deductionSrv.remove(this.year.value) : of({count: 0 })))
    //         .subscribe({
    //             next: res => {
    //                 this.processing.set(false);
    //                 if (res.count) {
    //                     this.snackBarSrv.showSuccessMessage();
    //                     this.refresh();
    //                 }
    //             },
    //             error: err => {
    //                 this.processing.set(false);
    //                 this.snackBarSrv.showFailureMessage();
    //                 //this.shellSrv.setLoading(false);
    //                 throw err;
    //             }
    //         });
    // }

    generate() {
        this.#confirmationSrv
            .confirm('PAYROLL_GICA_CAREER', 'PAYROLL_GENERATE')
            .pipe(tap(yes => this.processing.set(yes)),
                  switchMap(yes => yes? this.#deductionSrv.generate(this.year.value) : of({count: 0 })))
            .subscribe({
                next: res => {
                    this.processing.set(false);
                    if (res.count) {
                        this.#snackBarSrv.showSuccessMessage();
                        this.refresh();
                    }
                },
                error: err => {
                    this.processing.set(false);
                    this.#snackBarSrv.showFailureMessage();
                    //this.shellSrv.setLoading(false);
                    throw err;
                }
            });
    }
}
