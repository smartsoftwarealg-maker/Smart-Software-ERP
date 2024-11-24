import { Component } from '@angular/core';
import { EmployeeChildrenService, Child } from '@ss/payroll/api-employee';
import { BaseChildEntityListComponent } from '@ss/common/ui-base-entity';
import { NgIf, AsyncPipe } from '@angular/common';
import { MatMiniFabButton } from '@angular/material/button';
import { MatTooltip } from '@angular/material/tooltip';
import { MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatCellDef, MatCell, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow } from '@angular/material/table';
import { TranslateDirective } from '../../../../../../common/ui-lang/src/lib/translate.directive';
import { PaginationComponent } from '../../../../../../common/ui-pagination/src/lib/pagination.component';
import { TranslatePipe } from '../../../../../../common/ui-lang/src/lib/translate.pipe';

@Component({
    selector: 'ss-employee-children',
    templateUrl: './employee-children-list.component.html',
    styleUrls: ['./employee-children-list.component.scss'],
    standalone: true,
    imports: [NgIf, MatMiniFabButton, MatTooltip, MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, TranslateDirective, MatCellDef, MatCell, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow, PaginationComponent, AsyncPipe, TranslatePipe]
})
export class EmployeeChildrenListComponent extends BaseChildEntityListComponent<Child> {
    public displayedColumns = [
        'name',
        'birthDate',
        'birthPlace',
        'sex'
    ];

    constructor(public entitySrv: EmployeeChildrenService) {
        super(entitySrv, 'Child');
    }
}
