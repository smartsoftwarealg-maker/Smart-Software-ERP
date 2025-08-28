import { Component, inject } from '@angular/core';
import { EmployeeChildrenService, Child } from '@ss/payroll/api-employee';
import { BaseChildEntityListComponent } from '@ss/common/ui-base-entity';
import { AsyncPipe } from '@angular/common';
import { MatMiniFabButton } from '@angular/material/button';
import { MatTooltip } from '@angular/material/tooltip';
import { MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatCellDef, MatCell, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow } from '@angular/material/table';
import { TranslateDirective } from '@ss/common/ui-lang';
import { PaginationComponent } from '@ss/common/ui-pagination';
import { TranslatePipe } from '@ss/common/ui-lang';
import { MaterialModule } from '@ss/common/api-common';
import { ActivePersonnelService } from '../../active-personnel.service';

@Component({
    selector: 'ss-employee-children',
    templateUrl: './employee-children-list.component.html',
    styleUrls: ['./employee-children-list.component.scss'],
    standalone: true,
    imports: [MaterialModule, MatMiniFabButton, MatTooltip, MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, TranslateDirective, MatCellDef, MatCell, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow, PaginationComponent, AsyncPipe, TranslatePipe]
})
export class EmployeeChildrenListComponent extends BaseChildEntityListComponent<Child> {
    public displayedColumns = [
        'name',
        'birthDate',
        'birthPlace',
        'sex'
    ];

    activePersonnelSrv = inject(ActivePersonnelService);

    constructor(public entitySrv: EmployeeChildrenService) {
        super(entitySrv, 'Child');
    }
}
