import { Component, OnInit } from '@angular/core';
import {BaseEntityListComponent} from '@ss/common/ui-base-entity';
import {VacationPlanning} from '../vacation-planning-api';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute, Router} from '@angular/router';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {DefaultReportService} from '@ss/common/ui-default-report-component';
import {PaginatorPersistenceService} from '@ss/common/api-common';
import {VacationPlanningService} from '../vacation-planning.service';
import { UntypedFormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectChange, MatSelect } from '@angular/material/select';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { TranslateDirective } from '@ss/common/ui-lang';
import { NgFor, DecimalPipe } from '@angular/common';
import { MatOption } from '@angular/material/core';
import { MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { MatTooltip } from '@angular/material/tooltip';
import { MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatCellDef, MatCell, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow } from '@angular/material/table';
import { PaginationComponent } from '@ss/common/ui-pagination';
import { TranslatePipe } from '@ss/common/ui-lang';

@Component({
    selector: 'ss-vacation-planning-list',
    templateUrl: './vacation-planning-list.component.html',
    styleUrls: ['./vacation-planning-list.component.scss'],
    standalone: true,
    imports: [MatFormField, MatLabel, TranslateDirective, MatSelect, FormsModule, ReactiveFormsModule, NgFor, MatOption, MatInput, MatButton, MatTooltip, MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatCellDef, MatCell, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow, PaginationComponent, DecimalPipe, TranslatePipe]
})
export class VacationPlanningListComponent extends BaseEntityListComponent<VacationPlanning> {
    private readonly THIS_YEAR = new Date().getFullYear();
    period  = new UntypedFormControl(  this.THIS_YEAR - 1);
    rate    = new UntypedFormControl(173.34);
    defYear = new Date().getFullYear() - 1;
    periods = [
        this.THIS_YEAR - 10,
        this.THIS_YEAR - 9,
        this.THIS_YEAR - 8,
        this.THIS_YEAR - 7,
        this.THIS_YEAR - 6,
        this.THIS_YEAR - 5,
        this.THIS_YEAR - 4,
        this.THIS_YEAR - 3,
        this.THIS_YEAR - 2,
        this.THIS_YEAR - 1,
        this.THIS_YEAR];

    displayedColumns = [
        'employee',
        'lastName',
        'firstName',
        'acquired',
        'taken',
        'rest'
    ];

    constructor(
        public infoSrv: VacationPlanningService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override confirmationSrv: ConfirmationDialogService,
        public override defReportSrv: DefaultReportService,
        public override router: Router,
        public override pagPersistSrv: PaginatorPersistenceService) {
        super(infoSrv, shellSrv, snackBarSrv, route, router, confirmationSrv, defReportSrv, pagPersistSrv,'REMUN_VACATION_PLANNING');
        this.pagination.pageSize = 10;
    }

    onPeriod(event: MatSelectChange) {
        this.infoSrv.year = +event.value;
        this.refresh();
    }

    override ngOnInit() {
        this.addButton.visible = false;
        this.deleteButton.visible = false;
        super.ngOnInit();
    }

    updatePlanning() {
        this.shellSrv.setLoading(true);
        this.infoSrv
            .updatePlanning(this.period.value, this.rate.value)
            .subscribe(res => {
                this.shellSrv.setLoading(false);
                this.snackBarSrv.showSuccessMessage();
            });
    }
}
