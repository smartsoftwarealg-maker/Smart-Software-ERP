import { Component, Input } from '@angular/core';
import { EmployeeLanguagesService, PersonLanguage } from '@ss/payroll/api-employee';
import { BaseChildEntityListComponent } from '@ss/common/ui-base-entity';
import { NgIf, AsyncPipe } from '@angular/common';
import { MatMiniFabButton } from '@angular/material/button';
import { MatTooltip } from '@angular/material/tooltip';
import { MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatCellDef, MatCell, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow } from '@angular/material/table';
import { TranslateDirective } from '@ss/common/ui-lang';
import { PaginationComponent } from '@ss/common/ui-pagination';
import { TranslatePipe } from '@ss/common/ui-lang';
import { MaterialModule } from '@ss/common/api-common';

@Component({
    selector: 'ss-employee-languages',
    templateUrl: './employee-languages-list.component.html',
    styleUrls: ['./employee-languages-list.component.scss'],
    standalone: true,
    imports: [NgIf, MaterialModule, MatMiniFabButton, MatTooltip, MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, TranslateDirective, MatCellDef, MatCell, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow, PaginationComponent, AsyncPipe, TranslatePipe]
})
export class EmployeeLanguagesListComponent extends BaseChildEntityListComponent<PersonLanguage>{
    @Input() editable = true;

    public displayedColumns = [
        'languageId',
        'readLevel',
        'writeLevel'
    ];

    constructor(public entitySrv: EmployeeLanguagesService) {
        super(entitySrv, 'PersonLanguage');
    }
}
