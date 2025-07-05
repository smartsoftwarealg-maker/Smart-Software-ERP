import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConsolidationCenterService } from '../services/consolidation-center.service';
import { BaseEntityListComponent } from '@ss/common/ui-base-entity';
import { ConsolidationCenter } from '../services/consolidation-api';
import { KeepOnToolbar, ShellService, SnackBarService, ToolbarButton } from '@ss/common/ui-shell';
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
} from '@angular/material/table';
import { MatSort, MatSortHeader } from '@angular/material/sort';
import { PaginationComponent } from '@ss/common/ui-pagination';
import { TranslateDirective } from '@ss/common/ui-lang';
import { MatCheckbox } from '@angular/material/checkbox';
import { of, switchMap } from 'rxjs';

@Component({
    selector: 'ss-consolidation-centers-list',
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
        PaginationComponent,
        TranslateDirective,
        MatHeaderCellDef,
        MatCheckbox],
    templateUrl: './consolidation-centers-list.component.html',
    styleUrl: './consolidation-centers-list.component.scss',
    providers: [ConsolidationCenterService]
})
export class ConsolidationCentersListComponent extends BaseEntityListComponent<ConsolidationCenter> {
    #generateAllButton: ToolbarButton = {
        icon: 'fa-solid fa-check-double',
        label: 'COMMON_EDIT_SELECTED',
        disabled: false,
        visible: true,
        keepOnToolbar: KeepOnToolbar.DYNAMIC,
        click: () => this.generateAll()
    };

    displayedColumns = ['centerDescription', 'percentage', 'headquarter'];


    constructor(
        public override entitySrv: ConsolidationCenterService,
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
            'ACC_CONSOLIDATION_CENTERS');
        this.pagination.pageSize = 15;
    }

    override ngOnInit() {
        super.ngOnInit();
        this.shellSrv.addButton(this.#generateAllButton);
    }

    private generateAll() {
        this.confirmationSrv
            .confirm('ACC_GENERATION', 'ACC_GENERATE_CONSOLIDATION_CENTERS')
            .pipe(switchMap(res => res? this.entitySrv.generateAll() : of({count: 0})))
            .subscribe(res => {
                if (res?.count) {
                    this.snackBarSrv.showSuccessMessage();
                    this.refresh();
                }
            });
    }
}
