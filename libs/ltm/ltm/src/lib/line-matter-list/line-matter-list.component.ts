import { Component, inject } from '@angular/core';
import { LTMLineMatter } from '@ltm/ltm-api';
import { KeepOnToolbar, ShellService, SnackBarService, ToolbarButton } from '@ss/common/ui-shell';
import { ActivatedRoute, Router, RouterOutlet } from "@angular/router";
import {  ConfirmationDialogService } from "@ss/common/ui-confirmation-dialog";
import { MaterialModule, PaginatorPersistenceService } from "@ss/common/api-common";
import {LtmLineMatterService} from '@ltm/ltm-api';
import { BaseEntityListComponent } from '@ss/common/ui-base-entity';
import { DefaultReportService } from '@ss/common/ui-default-report-component';
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";

import { DatePickerComponent } from "@ss/common/ui-datepicker";
import { LtmMatterDuplicateComponent } from '../ltm-matter-duplicate/ltm-matter-duplicate.component';
import { MatDialog } from '@angular/material/dialog';
import { PaginationComponent } from '@ss/common/ui-pagination';
import { TranslateDirective } from '@ss/common/ui-lang';

@Component({
    selector: 'ss-line-matter-list',
    templateUrl: './line-matter-list.component.html',
    styleUrls: ['./line-matter-list.component.scss'],
    standalone: true,
    imports: [
        CommonModule,
        MaterialModule,
        PaginationComponent,
        ReactiveFormsModule,
        TranslateDirective,
    ],
})
export class LineMatterListComponent extends BaseEntityListComponent<LTMLineMatter> {
    private dialog = inject(MatDialog);
    private duplicateButton: ToolbarButton = {
        icon: 'fa-solid fa-copy',
        label: 'COMMON_DUPLICATE',
        disabled: true,
        visible: true,
        keepOnToolbar: KeepOnToolbar.ALWAYS,
        click: () => this.duplicate()
    };

    displayedColumns = [
        'matterDescription',
        'normDescription'
    ];

    constructor(
        public override entitySrv: LtmLineMatterService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override confirmationSrv: ConfirmationDialogService,
        public override defReportSrv: DefaultReportService,
        public override router: Router,
        public override pagPersistSrv: PaginatorPersistenceService) {
        super(entitySrv, shellSrv, snackBarSrv, route, router, confirmationSrv, defReportSrv, pagPersistSrv, 'LTM_LINE_MATTERS');
        this.pagination.pageSize = 15;
    }

    override ngOnInit() {
        super.ngOnInit();
        if (this.editButton.visible) {
            this.shellSrv.addButton(this.duplicateButton);
        }
    }

    private duplicate() {
        if (!!this.selected) {
            const dialogRef = this.dialog.open(LtmMatterDuplicateComponent, {
                disableClose: true,
                width: '450px',
                height: '160px',
                data: this.selectedRow
            });
            dialogRef
                .afterClosed()
                .subscribe(res => {
                    if (res['success'] === true) {
                        this.snackBarSrv.showSuccessMessage();
                        this.refresh();
                    }
                });
        }
    }

    override selectRow(row: LTMLineMatter) {
        super.selectRow(row);
        this.duplicateButton.disabled = this.editButton.disabled;
    }
}
