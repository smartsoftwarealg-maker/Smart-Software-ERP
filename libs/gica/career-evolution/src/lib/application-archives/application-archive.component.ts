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
import { map, Observable, of, switchMap, tap } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { Application, Report } from '../gica-careers-api';
import { MatButton } from '@angular/material/button';
import { PaginationModel } from '@ss/common/api-common';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { ActivatedRoute } from '@angular/router';
import { ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { ArchiveService } from '../services/archive.service';

@Component({
    selector: 'ss-gica-application-archives',
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
    templateUrl: './application-archive.component.html',
    styleUrl: './application-archive.component.css'
})
export class ApplicationArchiveComponent implements OnInit {
    private confirmationSrv = inject(ConfirmationDialogService);
    private snackBarSrv = inject(SnackBarService);
    private route = inject(ActivatedRoute);
    private shellSrv = inject(ShellService);
    private today = new Date();
    private archiveSrv = inject(ArchiveService);

    paginator = PaginationModel.newInstance( { page: 1, pageSize: 15, elementCount: 0 });
    displayedColumns = [
        'id',
        'firstName',
        'lastName',
        'from',
        'to',
        'rate'
    ];
    selectedReport: Report | null = null;

    data$:Observable<Application[]> | null = null;
    year = new FormControl<number>(this.today.getFullYear());

    refresh() {
        this.data$ = null;
        const yyyy = this.year.value;
        this.archiveSrv.setParentId(yyyy);
        const params = new HttpParams().set('year', yyyy);
        const params1 = this.archiveSrv.sortColumn? params.set('orderBy', this.archiveSrv.sortColumn) : params;
        this.data$ = this
            .archiveSrv
            .getList(this.paginator.page - 1, this.paginator.pageSize, null, this.archiveSrv.sortColumn, params1)
            .pipe(
                tap(res => this.paginator.elementCount = res.itemCount),
                map(res => res.body));
    }

    sort(event: Sort) {
        this.archiveSrv.sortColumn = event;
        this.refresh();
    }

    selectRow(report: Report) {
        this.selectedReport = report;
    }

    ngOnInit() {
        this.paginator.onChange = () => this.refresh();
        this.shellSrv.setTitle('COMMON_HISTORY');
        this.shellSrv.setGoBackPath('..', this.route);
    }

    delete() {
        this.confirmationSrv
            .confirmDelete()
            .pipe(switchMap(res => res? this.archiveSrv.delete(this.year.value) : of({count: 0})))
            .subscribe(res => {
                if (res?.count) {
                    this.snackBarSrv.showSuccessMessage();
                }
                this.refresh();
            });
    }
}
