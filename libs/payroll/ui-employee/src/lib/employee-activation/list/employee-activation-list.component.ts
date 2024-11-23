import { Component } from '@angular/core';
import { EmployeeActivationService, EmployeeActivation } from '@ss/payroll/api-employee';
import { BaseChildEntityListComponent } from '@ss/common/ui-base-entity';
import { MatMiniFabButton } from '@angular/material/button';
import { MatTooltip } from '@angular/material/tooltip';
import { MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatCellDef, MatCell, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow } from '@angular/material/table';
import { TranslateDirective } from '../../../../../../common/ui-lang/src/lib/translate.directive';
import { MatCheckbox } from '@angular/material/checkbox';
import { PaginationComponent } from '../../../../../../common/ui-pagination/src/lib/pagination.component';
import { AsyncPipe, DatePipe } from '@angular/common';
import { TranslatePipe } from '../../../../../../common/ui-lang/src/lib/translate.pipe';

@Component({
    selector: 'ss-emp-act-history',
    templateUrl: './employee-activation-list.component.html',
    styleUrls: ['./employee-activation-list.component.scss'],
    standalone: true,
    imports: [MatMiniFabButton, MatTooltip, MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, TranslateDirective, MatCellDef, MatCell, MatCheckbox, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow, PaginationComponent, AsyncPipe, DatePipe, TranslatePipe]
})
export class EmployeeActivationListComponent extends BaseChildEntityListComponent<EmployeeActivation> {
    foreignRecord = false;
    public displayedColumns = [
        'centerName',
        'hireDate',
        'empTypeDescription',
        'suspended',
        'suspensionDate',
        'suspendReasonDescription',
        'inConflict',
        'isFinal'
    ];
    // public readonly pagination = PaginationModel.newInstance();
    // public employmentTypes: { [id: number]: string; };

    constructor(public entitySrv: EmployeeActivationService) {
        super(entitySrv, 'Activation');
    }

    selectRow(row: EmployeeActivation) {
        super.selectRow(row);
        this.foreignRecord = row?.centerId !== this.loginSrv.appCtx.center;
    }
}
