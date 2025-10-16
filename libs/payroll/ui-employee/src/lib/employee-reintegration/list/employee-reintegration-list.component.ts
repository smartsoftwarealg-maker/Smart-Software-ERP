import { Component, inject } from '@angular/core';
import { BaseChildEntityListComponent } from '@ss/common/ui-base-entity';
import {
    Reintegration,
    EmployeeReintegrationService,
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
    templateUrl: './employee-reintegration-list.component.html',
    styleUrls: ['./employee-reintegration-list.component.scss'],
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
export class EmployeeReintegrationListComponent extends BaseChildEntityListComponent<Reintegration> {
    // @Input() editable = true;

    public override displayedColumns = [
        'reference',
        'refDate',
        'department',
        'post',
        'service',
        'fromDate',
        'motive',
    ];

    activePersonnelSrv = inject(ActivePersonnelService);

    constructor(public entitySrv: EmployeeReintegrationService) {
        super(entitySrv, 'Reintegration');
    }
}
