import { Component, inject } from '@angular/core';
import { BaseChildEntityListComponent } from '@ss/common/ui-base-entity';
import {
    Questioning,
    EmployeeQuestioningService,
} from '@ss/payroll/api-employee';
import { MatMiniFabButton } from '@angular/material/button';
import { MatTooltip } from '@angular/material/tooltip';
import {
    MatTable,
    MatColumnDef,
    MatHeaderCellDef,
    MatHeaderCell,
    MatCellDef,
    MatCell,
    MatHeaderRowDef,
    MatHeaderRow,
    MatRowDef,
    MatRow,
} from '@angular/material/table';
import { TranslateDirective } from '@ss/common/ui-lang';
import { PaginationComponent } from '@ss/common/ui-pagination';
import { AsyncPipe, DatePipe } from '@angular/common';
import { TranslatePipe } from '@ss/common/ui-lang';
import { ActivePersonnelService } from '../../active-personnel.service';

@Component({
    selector: 'ss-employee-suspension',
    templateUrl: './employee-questioning-list.component.html',
    styleUrls: ['./employee-questioning-list.component.scss'],
    standalone: true,
    imports: [
        MatMiniFabButton,
        MatTooltip,
        MatTable,
        MatColumnDef,
        MatHeaderCellDef,
        MatHeaderCell,
        TranslateDirective,
        MatCellDef,
        MatCell,
        MatHeaderRowDef,
        MatHeaderRow,
        MatRowDef,
        MatRow,
        PaginationComponent,
        AsyncPipe,
        TranslatePipe,
        DatePipe,
    ],
})
export class EmployeeQuestioningListComponent extends BaseChildEntityListComponent<Questioning> {
    // @Input() editable = true;

    public displayedColumns = [
        'reference',
        'refDate',
        'question',
        'answer',
        'motive',
    ];

    activePersonnelSrv = inject(ActivePersonnelService);

    constructor(public entitySrv: EmployeeQuestioningService) {
        super(entitySrv, 'Questioning');
    }
}
