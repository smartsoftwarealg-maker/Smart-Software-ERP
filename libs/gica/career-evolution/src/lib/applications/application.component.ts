import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatHeaderCell, MatHeaderCellDef,
    MatHeaderRow,
    MatHeaderRowDef, MatRow, MatRowDef, MatTable
} from '@angular/material/table';
import { MatSort, MatSortHeader, Sort } from '@angular/material/sort';

import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { ReportService } from '../services/report.service';
import { map, Observable, of, switchMap, tap } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { Report } from '../gica-careers-api';
import { MatButton } from '@angular/material/button';
import { MaterialModule, PaginationModel } from '@ss/common/api-common';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { ActivatedRoute } from '@angular/router';
import { ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { TranslateDirective, TranslatePipe } from '@ss/common/ui-lang';

@Component({
    selector: 'ss-gica-applications',
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
        TranslateDirective,
        TranslatePipe,
        MatFormField,
        MatInput,
        MatLabel,
        ReactiveFormsModule,
        MatButton,
        MatProgressSpinner],
    templateUrl: './application.component.html',
    styleUrl: './application.component.css'
})
export class ApplicationComponent implements OnInit {
    private confirmationSrv = inject(ConfirmationDialogService);
    private snackBarSrv = inject(SnackBarService);
    private route = inject(ActivatedRoute);
    private shellSrv = inject(ShellService);
    private today = new Date();
    private reportSrv = inject(ReportService);

    paginator = PaginationModel.newInstance({page: 1, pageSize: 10, elementCount: 0});
    dataLength = signal(0);
    displayedColumns = [
        'id',
        'firstName',
        'lastName',
        'age',
        'rate',
    ];
    selectedReport: Report | null = null;

    processing = signal(false);

    data$:Observable<Report[]> | null = null;
    year = new FormControl<number>(this.today.getFullYear());

    refresh() {
        const params = new HttpParams().set('year', this.year.value);
        const params1 = this.reportSrv.sortColumn? params.set('orderBy', this.reportSrv.sortColumn) : params;
        this.data$ = this.reportSrv
            .getList(this.paginator.page - 1, this.paginator.pageSize, null, this.reportSrv.sortColumn, params1)
            .pipe(
                tap(res => {
                    this.paginator.elementCount = res.itemCount;
                    this.dataLength.set(res.itemCount);
                }),
                map(res => res.body));
    }

    sort(event: Sort) {
        this.reportSrv.sortColumn = event;
        this.refresh();
    }

    selectRow(report: Report) {
        this.selectedReport = report;
    }

    ngOnInit() {
        this.paginator.onChange = () => this.refresh();
        this.shellSrv.setTitle('COMMON_UPDATE');
        this.shellSrv.setGoBackPath('..', this.route);
    }

    apply() {
        this.confirmationSrv
            .confirm('PAYROLL_GICA_CAREER', 'PAYROLL_CONFIRM_APPLY')
            .pipe(
                tap(res => this.processing.set(res)),
                switchMap(res => res? this.reportSrv.apply(this.year.value) : of({count: 0})))
            .subscribe(res => {
                if (res?.count) {
                    this.snackBarSrv.showSuccessMessage();
                }
                this.processing.set(false);
                this.refresh();
            });
    }

    delete() {
        this.confirmationSrv
            .confirmDelete()
            .pipe(tap(res => this.processing.set(res)),
                switchMap(res => res? this.reportSrv.delete(this.year.value) : of({count: 0})))
            .subscribe(res => {
                if (res?.count) {
                    this.snackBarSrv.showSuccessMessage();
                }
                this.processing.set(false);
                this.refresh();
            });
    }
}
