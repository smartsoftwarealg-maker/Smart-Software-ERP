import { Component, inject, OnInit, signal } from '@angular/core';
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
import { map, Observable, tap } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { Deduction, Report } from '../gica-careers-api';
import { MatButton } from '@angular/material/button';
import { PaginationModel } from '@ss/common/api-common';
import { ShellService } from '@ss/common/ui-shell';
import { ActivatedRoute } from '@angular/router';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { DeductionService } from '../services/deduction.service';

@Component({
    selector: 'ss-gica-deduction-report',
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
        MatButton, MatHeaderCellDef, MatProgressSpinner],
    templateUrl: './deduction-report.component.html',
    styleUrl: './deduction-report.component.css'
})
export class DeductionReportComponent implements OnInit {
    private route = inject(ActivatedRoute);
    private shellSrv = inject(ShellService);
    private today = new Date();
    private deductionSrv = inject(DeductionService);

    paginator = PaginationModel.newInstance({page: 1, pageSize: 10, elementCount: 0});
    displayedColumns = [
        'id',
        'firstName',
        'lastName',
        'deduction',
    ];
    selectedReport: Report | null = null;

    processing = signal(false);
    dataLength = signal(0);

    data$:Observable<Deduction[]> | null = null;
    year = new FormControl<number>(this.today.getFullYear());

    refresh() {
        const params = new HttpParams().set('year', this.year.value);
        this.data$ = this.deductionSrv
            .getList(this.paginator.page - 1, this.paginator.pageSize, null, this.deductionSrv.sortColumn, params)
            .pipe(
                tap(res => {
                    this.paginator.elementCount = res.itemCount;
                    this.dataLength.set(this.paginator.elementCount);
                }),
                map(res => res.body));
    }

    sort(event: Sort) {
        this.deductionSrv.sortColumn = event;
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
        console.log('Applying...............');
    }

    delete() {
        console.log('Deleting...............');

    }
}
