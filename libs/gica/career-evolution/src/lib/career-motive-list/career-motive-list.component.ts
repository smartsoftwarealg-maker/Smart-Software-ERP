import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseEntityListComponent } from '@ss/common/ui-base-entity';
import { CareerMotive } from '../gica-careers-api';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { ActivatedRoute, Router } from '@angular/router';
import { DefaultReportService } from '@ss/common/ui-default-report-component';
import { ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { PaginatorPersistenceService } from '@ss/common/api-common';

import {
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatHeaderCell, MatHeaderCellDef,
    MatHeaderRow,
    MatHeaderRowDef, MatRow, MatRowDef, MatTable
} from "@angular/material/table";
import { MatSort, MatSortHeader } from '@angular/material/sort';
import { PaginationComponent } from '@ss/common/ui-pagination';
import { CareerMotiveService } from '../services/career-motive.service';
import { MatCheckbox } from '@angular/material/checkbox';
import { TranslateDirective } from '@ss/common/ui-lang';


@Component({
    selector: 'ss-gica-career-motive-list',
    standalone: true,
    imports: [CommonModule,
        MatCell,
        MatCellDef,
        MatColumnDef,
        MatHeaderCell,
        MatHeaderRow,
        MatHeaderRowDef,
        MatRow,
        MatRowDef,
        MatSort,
        MatSortHeader,
        MatTable,
        MatHeaderCellDef,
        PaginationComponent,
        MatCheckbox,
        TranslateDirective],
    templateUrl: './career-motive-list.component.html',
    styleUrl: './career-motive-list.component.css',
})
export class CareerMotiveListComponent extends BaseEntityListComponent<CareerMotive> {
    displayedColumns = [
        'description',
        'isPromotion'
    ];

    constructor(
        public override entitySrv: CareerMotiveService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override router: Router,
        public override defReportSrv: DefaultReportService,
        public override confirmationSrv: ConfirmationDialogService,
        public override pagPersistSrv: PaginatorPersistenceService) {
        super(entitySrv,
            shellSrv,
            snackBarSrv,
            route,
            router,
            confirmationSrv,
            defReportSrv,
            pagPersistSrv,
            'COMMON_MOTIVES');
        this.pagination.pageSize = 15;
    }

    override ngOnInit() {
        this.deleteButton.visible = this.addButton.visible =this.editButton.visible = false;
        super.ngOnInit();
    }

    updateMotive(m: CareerMotive) {
        m.isPromotion = !m.isPromotion;
        this.entitySrv
            .update(m)
            .subscribe(res => {
                if (res) {
                    this.snackBarSrv.showSuccessMessage();
                }
            });
    }
}
