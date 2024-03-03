import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonUiLangModule } from '@ss/common/ui-lang';
import {
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatHeaderCell, MatHeaderCellDef,
    MatHeaderRow,
    MatHeaderRowDef, MatRow, MatRowDef, MatTable
} from '@angular/material/table';
import { MatSort, MatSortHeader, Sort } from '@angular/material/sort';
import { UiPaginationModule } from '@ss/common/ui-pagination';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatCard, MatCardContent } from '@angular/material/card';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { ReportService } from '../services/report.service';
import { map, Observable, of, switchMap } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { Report } from '../gica-careers-api';
import { MatButton } from '@angular/material/button';
import { PaginationModel } from '@ss/common/api-common';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { ActivatedRoute } from '@angular/router';
import { ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';

@Component({
    selector: 'ss-gica-constant-detail',
    standalone: true,
    imports: [CommonModule,
        CommonUiLangModule,
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
        UiPaginationModule,
        MatCard,
        MatCardContent,
        MatError,
        MatFormField,
        MatInput,
        MatLabel,
        ReactiveFormsModule,
        MatButton, MatHeaderCellDef],
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

    paginator = PaginationModel.newInstance();
    displayedColumns = [
        'id',
        'firstName',
        'lastName',
        'age',
        'rate',
    ];
    selectedReport: Report | null = null;

    data$:Observable<Report[]> | null = null;
    year = new FormControl<number>(this.today.getFullYear());

    refresh() {
        const params = new HttpParams().set('year', this.year.value);
        const params1 = this.reportSrv.sortColumn? params.set('orderBy', this.reportSrv.sortColumn) : params;
        this.data$ = this.reportSrv
            .getList(1, 9999, null, this.reportSrv.sortColumn, params1)
            .pipe(map(res => res.body));
    }

    sort(event: Sort) {
        this.reportSrv.sortColumn = event;
        this.refresh();
    }

    selectRow(report: Report) {
        this.selectedReport = report;
    }

    ngOnInit() {
        this.shellSrv.setTitle('COMMON_UPDATE');
        this.shellSrv.setGoBackPath('..', this.route);
    }

    apply() {
        this.confirmationSrv
            .confirm('PAYROLL_GICA_CAREER', 'PAYROLL_CONFIRM_APPLY')
            .pipe(switchMap(res => res? this.reportSrv.apply(this.year.value) : of({count: 0})))
            .subscribe(res => {
                if (res?.count) {
                    this.snackBarSrv.showSuccessMessage();
                }
                this.refresh();
            });
    }

    delete() {
        this.confirmationSrv
            .confirmDelete()
            .pipe(switchMap(res => res? this.reportSrv.delete(this.year.value) : of({count: 0})))
            .subscribe(res => {
                if (res?.count) {
                    this.snackBarSrv.showSuccessMessage();
                }
                this.refresh();
            });
    }
}
