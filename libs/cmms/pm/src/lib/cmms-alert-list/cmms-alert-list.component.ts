import { Component, OnInit } from '@angular/core';
import { BaseEntityListComponent } from '@ss/common/ui-base-entity';
import { PM } from '@ss/cmms/cmms-api';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { ActivatedRoute, Router } from '@angular/router';
import { DefaultReportService } from '@ss/common/ui-default-report-component';
import { ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { MaterialModule, PaginatorPersistenceService } from '@ss/common/api-common';
import { CMMSAlertService } from '../services/cmms-alert.service';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { TranslateDirective } from '@ss/common/ui-lang';
import { DatePickerComponent } from '@ss/common/ui-datepicker';
import { MatButton } from '@angular/material/button';
import { MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatCellDef, MatCell, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow } from '@angular/material/table';
import { MatSort, MatSortHeader } from '@angular/material/sort';
import { PaginationComponent } from '@ss/common/ui-pagination';
import { DatePipe } from '@angular/common';
import { TranslatePipe } from '@ss/common/ui-lang';

@Component({
    selector: 'ss-cmms-alert-list',
    templateUrl: './cmms-alert-list.component.html',
    styleUrls: [
        '../pm-list/pm-list.component.css',
        './cmms-alert-list.component.css'
    ],
    standalone: true,
    imports: [
        MatFormField,
        MaterialModule,
        MatLabel,
        TranslateDirective,
        DatePickerComponent,
        FormsModule,
        ReactiveFormsModule,
        MatButton,
        MatTable,
        MatSort,
        MatColumnDef,
        MatHeaderCellDef,
        MatHeaderCell,
        MatSortHeader,
        MatCellDef,
        MatCell,
        MatHeaderRowDef,
        MatHeaderRow,
        MatRowDef,
        MatRow,
        PaginationComponent,
        DatePipe,
        TranslatePipe,
        TranslateDirective
    ],
})
export class CmmsAlertListComponent extends BaseEntityListComponent<PM> implements OnInit {
    dateControl = new FormControl<Date>(new Date());

    displayedColumns = [
        // 'reference',
        'selection',
        'description',
        'assetDescription',
        'planDescription',
        'lastReleased',
        'nextDue',
        'daysAhead'
    ];

    constructor(
        public override entitySrv: CMMSAlertService,
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
            'CMMS_ALERTS');
        this.pagination.pageSize = 15;
    }

    protected override preInit(): Observable<unknown> {
        return super.preInit()
            .pipe(tap(() => {
                this.addButton.visible = false;
                this.editButton.visible = false;
                this.deleteButton.visible = false;
            }));
    }

    override ngOnInit() {
        super.ngOnInit();

        this.subscriptions.push(
            this.dateControl
                .valueChanges
                .pipe(
                    debounceTime(300),
                    distinctUntilChanged()
                ).subscribe(date => {
                    const d = typeof date === 'string' ? new Date(date) : date;
                    if (d) {
                        this.entitySrv.date = d;
                        this.refresh();
                    }
                }));
    }

    generate() {
        this.shellSrv.setLoading(true);
        this.confirmationSrv
            .confirm('CMMS_WORK_GENERATION', 'COMMON_GENERATE')
            .pipe(switchMap(answer => answer?
                this.entitySrv.generate(this.dateControl.value, this.shellSrv.getSearchText()):
                of({count: 0}))
            ).subscribe({
                next: res => {
                    if (res?.count) {
                        this.snackBarSrv.showSuccessMessage();
                        this.data = [];
                    }
                    this.shellSrv.setLoading(false);
                },
                error: err => {
                    this.shellSrv.setLoading(false);
                    throw err;
                }
            });
    }
}
