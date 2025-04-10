import { Component, inject, OnInit } from '@angular/core';
import {Career, EmployeeCareerService} from '@ss/payroll/api-employee';
import { BaseChildEntityListComponent } from '@ss/common/ui-base-entity';
import { MatMiniFabButton } from '@angular/material/button';
import { MatTooltip } from '@angular/material/tooltip';
import { NgIf, AsyncPipe, DatePipe } from '@angular/common';
import { MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatCellDef, MatCell, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow } from '@angular/material/table';
import { TranslateDirective } from '@ss/common/ui-lang';
import { PaginationComponent } from '@ss/common/ui-pagination';
import { TranslatePipe } from '@ss/common/ui-lang';
import { ActivePersonnelService } from '../../active-personnel.service';

@Component({
    selector: 'ss-employee-career',
    templateUrl: './employee-career-list.component.html',
    styleUrls: ['./employee-career-list.component.scss'],
    standalone: true,
    imports: [MatMiniFabButton, MatTooltip, NgIf, MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, TranslateDirective, MatCellDef, MatCell, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow, PaginationComponent, AsyncPipe, TranslatePipe, DatePipe]
})
export class EmployeeCareerListComponent extends BaseChildEntityListComponent<Career> implements OnInit {

    public displayedColumns = [
        'paymonth',
        'decision',
        'decision_date',
        'postDescription',
        'gridCategory',
        'salary_rank',
        'from_date',
        'to_date',
        'divDescription',
        'deptDescription',
        'srvDescription',
        'profCategory',
        'trial_period',
        'wrkDescription',
    ];

    activePersonnelSrv = inject(ActivePersonnelService);

    constructor(public entitySrv: EmployeeCareerService) {
        super(entitySrv, 'Career');
    }


    reorder() {
        this.entitySrv
            .reorder(this.entitySrv.getParentId())
            .subscribe(res => {
                if (res.count > 0) {
                    this.snackBarSrv.showSuccessMessage();
                    this.refresh();
                } else {
                    this.snackBarSrv.showFailureMessage();
                }
            });
    }
}
