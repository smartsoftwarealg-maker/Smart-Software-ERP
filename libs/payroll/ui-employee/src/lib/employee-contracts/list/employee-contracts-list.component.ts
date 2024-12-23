import { Component } from '@angular/core';
import { EmployeeContractService, Contract } from '@ss/payroll/api-employee';
import { PaginationModel } from '@ss/common/api-common';
import { BaseChildEntityListComponent } from '@ss/common/ui-base-entity';
import { MatMiniFabButton } from '@angular/material/button';
import { MatTooltip } from '@angular/material/tooltip';
import { MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatCellDef, MatCell, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow } from '@angular/material/table';
import { TranslateDirective } from '@ss/common/ui-lang';
import { MatCheckbox } from '@angular/material/checkbox';
import { PaginationComponent } from '@ss/common/ui-pagination';
import { AsyncPipe, DecimalPipe, DatePipe } from '@angular/common';
import { TranslatePipe } from '@ss/common/ui-lang';

@Component({
    selector: 'ss-employee-contracts',
    templateUrl: './employee-contracts-list.component.html',
    styleUrls: ['./employee-contracts-list.component.scss'],
    standalone: true,
    imports: [MatMiniFabButton, MatTooltip, MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, TranslateDirective, MatCellDef, MatCell, MatCheckbox, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow, PaginationComponent, AsyncPipe, DecimalPipe, DatePipe, TranslatePipe]
})
export class EmployeeContractListComponent extends BaseChildEntityListComponent<Contract> {
    editable = true;

    public displayedColumns = [
        'number',
        'recordNumber',
        'date',
        'fromdate',
        'todate',
        'valid_date',
        'post',
        'division',
        'department',
        'service',
        'salarygrid', // todo: add lookup
        'salary_rank',
        'basesalary',
        'notes',
        'motive', // todo: add lookup
        'cost_center', // todo: add lookup
        'confirmed',
        'trial_period'
    ];

    public readonly pagination = PaginationModel.newInstance();
    public data: Contract[] = [];

    constructor(public entitySrv: EmployeeContractService) {
        super(entitySrv, 'Contract');
    }
}
