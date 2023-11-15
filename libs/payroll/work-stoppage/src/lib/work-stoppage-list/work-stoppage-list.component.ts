import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseEntityListComponent } from '@ss/common/ui-base-entity';
import { Accident } from '../api-work-stoppage';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { ActivatedRoute, Router } from '@angular/router';
import { DefaultReportService } from '@ss/common/ui-default-report-component';
import { ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { MaterialModule, PaginatorPersistenceService } from '@ss/common/api-common';
import { WorkStoppageService } from '../services/work-stoppage.service';
import { CommonUiLangModule } from '@ss/common/ui-lang';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { UiPaginationModule } from '@ss/common/ui-pagination';
import { Lookup } from '@ss/common/api-lookup';
import { FormControl, FormsModule } from '@angular/forms';

@Component({
    selector: 'ss-work-stoppage-list',
    standalone: true,
    imports: [CommonModule, CommonUiLangModule, MatSortModule, MatTableModule, UiPaginationModule, FormsModule, MaterialModule],
    templateUrl: './work-stoppage-list.component.html',
    styleUrls: ['./work-stoppage-list.component.css']
})
export class WorkStoppageListComponent extends BaseEntityListComponent<Accident> implements OnInit {
    absenceTypes: Lookup[] = [
        { id: 1, description: 'PAYROLL_ILLNESS'},
        { id: 2, description: 'PAYROLL_ACCIDENT'},
        { id: 3, description: 'PAYROLL_LONG_ILLNESS'},
        { id: 4, description: 'PAYROLL_MOTHERHOOD'},
    ];

    absenceType = new FormControl<number>(0);
    displayedColumns = [
        'firstName',
        'lastName',
        'motiveDescription',
        'date',
        'duration',
        'dateBack',
        'pickDate',
        'certificationNumber',
        'certificationRef'
    ];

    constructor(
    public override entitySrv: WorkStoppageService,
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
            'PAYROLL_WORK_STOPPAGES');
        this.absenceType.setValue(this.entitySrv?.getParentId() || 0);
        this.pagination.pageSize = 15;
        if (!this.entitySrv.getParentId()) {
            this.entitySrv.setParentId(0);
        }
    }

    onAbsence(id: number) {
        this.entitySrv.setParentId(id || 0);
        this.addButton.disabled = !id;
        this.refresh();
    }

    override ngOnInit() {
        this.addButton.disabled = !this.entitySrv.getParentId();
        this.absenceType.setValue(this.entitySrv.getParentId() || 0, { onlySelf: true, emitEvent: true});
        super.ngOnInit();
    }
}
