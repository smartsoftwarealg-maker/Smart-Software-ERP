import { Component, OnInit } from '@angular/core';
import {BaseEntityListComponent} from '@ss/common/ui-base-entity';
import {LTMMatter} from '../ltm-api';
import { KeepOnToolbar, ShellService, SnackBarService, ToolbarButton } from "@ss/common/ui-shell";
import { ActivatedRoute, Router, RouterOutlet } from "@angular/router";
import {DefaultReportService} from '@ss/common/ui-default-report-component';
import { CommonUiConfirmationDialogModule, ConfirmationDialogService } from "@ss/common/ui-confirmation-dialog";
import { MaterialModule, PaginatorPersistenceService } from "@ss/common/api-common";
import {LtmMatterService} from '../services/ltm-matter.service';
import { CommonModule } from "@angular/common";
import { CommonUiLangModule } from "@ss/common/ui-lang";
import { UiPaginationModule } from "@ss/common/ui-pagination";
import { ReactiveFormsModule } from "@angular/forms";

import { AppArchiveModule } from "@ss/common/app-archive";
import { CommonUiAutoCompleteModule } from "@ss/common/ui-auto-complete";
import { CommonUiDatepickerModule } from "@ss/common/ui-datepicker";
import { CommonUiHourPickerModule } from "@ss/common/ui-hour-picker";
import { MatDialog } from "@angular/material/dialog";
import { LtmMatterDuplicateComponent } from "../ltm-matter-duplicate/ltm-matter-duplicate.component";

@Component({
    selector: 'ss-ltm-matter-list',
    templateUrl: './ltm-matter-list.component.html',
    styleUrls: ['./ltm-matter-list.component.scss'],
    standalone: true,
    imports: [
        CommonModule,
        MaterialModule,
        CommonUiLangModule,
        UiPaginationModule,
        ReactiveFormsModule,
        CommonUiConfirmationDialogModule,

        AppArchiveModule,
        CommonUiAutoCompleteModule,
        CommonUiDatepickerModule,
        RouterOutlet,
        CommonUiHourPickerModule
    ],
})
export class LtmMatterListComponent  extends BaseEntityListComponent<LTMMatter> implements OnInit {
    // public duplicateButton: ToolbarButton = {
    //     icon: 'fa-solid fa-copy',
    //     label: 'COMMON_DUPLICATE',
    //     disabled: true,
    //     visible: true,
    //     keepOnToolbar: KeepOnToolbar.ALWAYS,
    //     click: () => this.duplicate()
    // };

    displayedColumns = [
        'id',
        'description',
        'code',
        'name'
    ];

    constructor(
        public override entitySrv: LtmMatterService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override router: Router,
        public override defReportSrv: DefaultReportService,
        public override confirmationSrv: ConfirmationDialogService,
        public override pagPersistSrv: PaginatorPersistenceService,
        private dialog: MatDialog) {
        super(entitySrv,
            shellSrv,
            snackBarSrv,
            route,
            router,
            confirmationSrv,
            defReportSrv,
            pagPersistSrv,
            'LTM_MATTERS');
        this.pagination.pageSize = 15;
    }

    // override ngOnInit() {
    //     super.ngOnInit();
    //     if (this.editButton.visible) {
    //         this.shellSrv.addButton(this.duplicateButton);
    //     }
    // }

    // private duplicate() {
    //     if (!!this.selected) {
    //         const dialogRef = this.dialog.open(LtmMatterDuplicateComponent, {
    //             disableClose: true,
    //             width: '450px',
    //             height: '160px',
    //             data: this.selectedRow
    //         });
    //         dialogRef
    //             .afterClosed()
    //             .subscribe(res => {
    //                 if (res['success'] === true) {
    //                     this.snackBarSrv.showSuccessMessage();
    //                     this.refresh();
    //                 }
    //             });
    //     }
    // }
    //
    // override selectRow(row: LTMMatter) {
    //     super.selectRow(row);
    //     this.duplicateButton.disabled = this.editButton.disabled;
    // }
}
