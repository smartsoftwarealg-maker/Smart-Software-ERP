import { Component } from '@angular/core';
import {BaseEntityListComponent} from '@ss/common/ui-base-entity';
import {SalesMode, SalesModeService} from '@ss/scheduled-sales/api-scheduled-sales';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute, Router} from '@angular/router';
import {DefaultReportService} from '@ss/common/ui-default-report-component';
import {  ConfirmationDialogService } from "@ss/common/ui-confirmation-dialog";
import { MaterialModule, PaginatorPersistenceService } from "@ss/common/api-common";
import { CommonModule } from "@angular/common";


import { ReactiveFormsModule } from "@angular/forms";
import { CommonUiDatepickerModule } from "@ss/common/ui-datepicker";
import { CommonUiAutoCompleteModule } from "@ss/common/ui-auto-complete";
import { PaginationComponent } from '@ss/common/ui-pagination';

@Component({
    selector: 'ss-sales-mode-list',
    templateUrl: './sales-mode-list.component.html',
    styleUrls: ['./sales-mode-list.component.scss'],
    standalone: true,
    imports: [
        CommonModule,
        MaterialModule,


        ReactiveFormsModule,

        CommonUiDatepickerModule,
        CommonUiAutoCompleteModule,
        PaginationComponent
    ]
})
export class SalesModeListComponent extends BaseEntityListComponent<SalesMode> {

    displayedColumns = [
        'id',
        'description',
        'daysAhead',
    ];

    constructor(
        public override entitySrv: SalesModeService,
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
            'SCH_SALES_MODES');
    }

    override ngOnInit() {
        this.deleteButton.visible = false;
        this.addButton.visible = false;
        super.ngOnInit();
    }
}
