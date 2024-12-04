import { Component, inject, OnInit } from '@angular/core';
import {BaseEntityListComponent} from '@ss/common/ui-base-entity';
import {HolidayRequest} from '@ss/payroll/api-employee';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute, Router} from '@angular/router';
import {DefaultReportService} from '@ss/common/ui-default-report-component';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import { LoginService, PaginatorPersistenceService } from '@ss/common/api-common';
import {HolidayRequestService} from '../holiday-request.service';
import { DefaultAutoCompleteModel } from '@ss/common/ui-auto-complete';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HolidayTypeService } from '../holiday-type.service';
import { Lookup } from '@ss/common/api-lookup';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { TranslateDirective } from '@ss/common/ui-lang';
import { UiAutoCompleteComponent } from '@ss/common/ui-auto-complete';
import { MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatCellDef, MatCell, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow } from '@angular/material/table';
import { MatSort, MatSortHeader } from '@angular/material/sort';
import { PaginationComponent } from '@ss/common/ui-pagination';
import { DatePipe } from '@angular/common';

@Component({
    selector: 'ss-holiday-request-list',
    templateUrl: './holiday-request-list.component.html',
    styleUrls: ['./holiday-request-list.component.scss'],
    standalone: true,
    imports: [
        MatFormField,
        MatLabel,
        TranslateDirective,
        UiAutoCompleteComponent,
        FormsModule,
        ReactiveFormsModule,
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
    ],
})
export class HolidayRequestListComponent extends BaseEntityListComponent<HolidayRequest> implements OnInit {
    private loginSrv = inject(LoginService);
    private vacationType = inject(HolidayTypeService);

    absenceMotiveLookup = new DefaultAutoCompleteModel(this.vacationType);
    absenceMotiveCtrl = new FormControl<number>(0);

    private userColumns = [
        'personId',
        'firstName',
        'lastName',
        'typeDescription',
        'creationTime',
        'from',
        'to',
        'docDescription'
    ];
    private personColumns = [
        'creationTime',
        'typeDescription',
        'from',
        'to',
        'docDescription'
    ];
    displayedColumns = this.loginSrv.appCtx.id? this.userColumns : this.personColumns;

    constructor(
        public override entitySrv: HolidayRequestService,
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
            'ATT_HOLIDAY_REQUEST');
        this.pagination.pageSize = 10;
        this.absenceMotiveLookup.onObjectSelected = (lookup) => this.onType(lookup);
    }


    onType(lookup: Lookup) {
        this.entitySrv.absenceMotive = lookup?.id || 0;
        this.refresh();
    }
}
