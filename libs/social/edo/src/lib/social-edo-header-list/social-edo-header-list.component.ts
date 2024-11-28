import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseEntityListComponent } from '@ss/common/ui-base-entity';
import { EDOHeader } from '@social/social-api';
import { KeepOnToolbar, ShellService, SnackBarService, ToolbarButton } from '@ss/common/ui-shell';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { DefaultReportService } from '@ss/common/ui-default-report-component';
import { PaginatorPersistenceService } from '@ss/common/api-common';

import {
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatHeaderCell, MatHeaderCellDef,
    MatHeaderRow,
    MatHeaderRowDef, MatRow, MatRowDef, MatTable
} from '@angular/material/table';

import { EdoHeaderService } from '@social/social-api';
import { PaginationComponent } from '@ss/common/ui-pagination';

@Component({
    selector: 'ss-social-edo-header-list',
    standalone: true,
    imports: [CommonModule, MatCell, MatCellDef, MatColumnDef, MatHeaderCell, MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef, MatTable, MatHeaderCellDef, PaginationComponent],
    templateUrl: './social-edo-header-list.component.html',
    styleUrl: './social-edo-header-list.component.scss',
})
export class SocialEdoHeaderListComponent extends BaseEntityListComponent<EDOHeader> {
    public edoButton: ToolbarButton = {
        icon: 'fa-solid fa-money-check-dollar-pen',
        label: 'REMUN_EDO',
        disabled: true,
        visible: true,
        keepOnToolbar: KeepOnToolbar.DYNAMIC,
        click: () => this.openEDO()
    };

    displayedColumns = [
        'number',
        'date',
        'description'
    ];
    constructor(
        public override entitySrv: EdoHeaderService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override confirmationSrv: ConfirmationDialogService,
        public override defReportSrv: DefaultReportService,
        public override router: Router,
        public override pagPersistSrv: PaginatorPersistenceService) {
        super(entitySrv, shellSrv, snackBarSrv, route, router, confirmationSrv, defReportSrv, pagPersistSrv,'SOCIAL_EDO_LIST');
        this.pagination.pageSize = 15;
    }

    override ngOnInit() {
        super.ngOnInit();
        this.shellSrv.addButton(this.edoButton);
    }

    private openEDO() {
        this.router.navigate(['/app/social/edo'], { queryParams: { edoId: this.selected||0 } }).then();
    }

    override select(id: number) {
        super.select(id);
        this.edoButton.disabled = !this.selected;
    }
}

