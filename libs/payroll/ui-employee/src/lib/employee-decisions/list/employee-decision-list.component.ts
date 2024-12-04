import { Component, Input } from '@angular/core';
import { EmployeeDecisionService, Decision } from '@ss/payroll/api-employee';
import { BaseChildEntityListComponent } from '@ss/common/ui-base-entity';
import { MatMiniFabButton } from '@angular/material/button';
import { MatTooltip } from '@angular/material/tooltip';
import { NgIf, AsyncPipe } from '@angular/common';
import { MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatCellDef, MatCell, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow } from '@angular/material/table';
import { TranslateDirective } from '@ss/common/ui-lang';
import { PaginationComponent } from '../../../../../../common/ui-pagination/src/lib/pagination.component';
import { TranslatePipe } from '../../../../../../common/ui-lang/src/lib/translate.pipe';

@Component({
    selector: 'ss-employee-decision-list',
    templateUrl: './employee-decision-list.component.html',
    styleUrls: ['./employee-decision-list.component.scss'],
    standalone: true,
    imports: [MatMiniFabButton, MatTooltip, NgIf, MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, TranslateDirective, MatCellDef, MatCell, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow, PaginationComponent, AsyncPipe, TranslatePipe]
})
export class EmployeeDecisionListComponent extends BaseChildEntityListComponent<Decision> {
    @Input() editable = true;

    public displayedColumns = [
        'dec_reference',
        'dec_date',
        'application_date',
        'motiveName',
        'application_period',
        'dec_header'
    ];

    constructor(public entitySrv: EmployeeDecisionService) {
        super(entitySrv, 'Decision');
    }
}
