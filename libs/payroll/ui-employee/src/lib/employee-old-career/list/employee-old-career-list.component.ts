import { Component } from '@angular/core';
import { EmployeeOldCareerService, OldCareer } from '@ss/payroll/api-employee';
import { BaseChildEntityListComponent } from '@ss/common/ui-base-entity';
import { NgIf, AsyncPipe, DatePipe } from '@angular/common';
import { MatMiniFabButton } from '@angular/material/button';
import { MatTooltip } from '@angular/material/tooltip';
import { MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatCellDef, MatCell, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow } from '@angular/material/table';
import { TranslateDirective } from '../../../../../../common/ui-lang/src/lib/translate.directive';
import { PaginationComponent } from '../../../../../../common/ui-pagination/src/lib/pagination.component';
import { TranslatePipe } from '../../../../../../common/ui-lang/src/lib/translate.pipe';

@Component({
    selector: 'ss-employee-old-career-list',
    templateUrl: './employee-old-career-list.component.html',
    styleUrls: ['./employee-old-career-list.component.scss'],
    standalone: true,
    imports: [NgIf, MatMiniFabButton, MatTooltip, MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, TranslateDirective, MatCellDef, MatCell, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow, PaginationComponent, AsyncPipe, DatePipe, TranslatePipe]
})
export class EmployeeOldCareerListComponent extends BaseChildEntityListComponent<OldCareer> {
    private _hrMode = true;
    activePersonnel = true;
    editable = true;

    public displayedColumns = [
        'post',
        'rate',
        //        'ctype',
        'from_date',
        'to_date',
    ];


    constructor(public entitySrv: EmployeeOldCareerService) {
        super(entitySrv, 'OldCareer');
    }

    get hrMode() {
        return this._hrMode;
    }
}
