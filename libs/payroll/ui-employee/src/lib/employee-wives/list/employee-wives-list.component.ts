import { Component, Input } from '@angular/core';
import { BaseChildEntityListComponent } from '@ss/common/ui-base-entity';
import { EmployeeWivesService, Wife } from '@ss/payroll/api-employee';
import { MatMiniFabButton } from '@angular/material/button';
import { MatTooltip } from '@angular/material/tooltip';
import { MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatCellDef, MatCell, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow } from '@angular/material/table';
import { TranslateDirective } from '../../../../../../common/ui-lang/src/lib/translate.directive';
import { PaginationComponent } from '../../../../../../common/ui-pagination/src/lib/pagination.component';
import { AsyncPipe } from '@angular/common';
import { TranslatePipe } from '../../../../../../common/ui-lang/src/lib/translate.pipe';

@Component({
    selector: 'ss-employee-wives',
    templateUrl: './employee-wives-list.component.html',
    styleUrls: ['./employee-wives-list.component.scss'],
    standalone: true,
    imports: [MatMiniFabButton, MatTooltip, MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, TranslateDirective, MatCellDef, MatCell, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow, PaginationComponent, AsyncPipe, TranslatePipe]
})
export class EmployeeWivesListComponent extends BaseChildEntityListComponent<Wife> {
    @Input() editable = true;

    public displayedColumns = [
        //        'notDivorced',
        'name',
        'birthdate',
        'birthPlace',
        'father',
        'mother'
    ];

    constructor(public entitySrv: EmployeeWivesService) {
        super(entitySrv, 'Wife');
    }
}
