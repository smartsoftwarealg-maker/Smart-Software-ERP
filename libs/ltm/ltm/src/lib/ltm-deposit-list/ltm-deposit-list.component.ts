import { Component } from '@angular/core';
import {BaseEntityListComponent} from '@ss/common/ui-base-entity';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import { ActivatedRoute, Router, RouterOutlet } from "@angular/router";
import {  ConfirmationDialogService } from "@ss/common/ui-confirmation-dialog";
import {DefaultReportService} from '@ss/common/ui-default-report-component';
import { MaterialModule, PaginatorPersistenceService } from "@ss/common/api-common";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { CommonUiAutoCompleteModule } from "@ss/common/ui-auto-complete";
import { CommonUiDatepickerModule } from "@ss/common/ui-datepicker";
import { CommonUiHourPickerModule } from "@ss/common/ui-hour-picker";
import { Lookup } from '@ss/common/api-lookup';
import { LtmDepositService } from '@ltm/ltm-api';
import { PaginationComponent } from '@ss/common/ui-pagination';

@Component({
    selector: 'ss-ltm-deposit-list',
    templateUrl: './ltm-deposit-list.component.html',
    styleUrls: ['./ltm-deposit-list.component.scss'],
    standalone: true,
    imports: [
        CommonModule,
        MaterialModule,
        PaginationComponent,
        ReactiveFormsModule,
        CommonUiAutoCompleteModule,
        CommonUiDatepickerModule,
        CommonUiHourPickerModule
    ],
})
export class LtmDepositListComponent extends BaseEntityListComponent<Lookup> {
    displayedColumns = ['description'];

    constructor(
        public override entitySrv: LtmDepositService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override confirmationSrv: ConfirmationDialogService,
        public override defReportSrv: DefaultReportService,
        public override router: Router,
        public override pagPersistSrv: PaginatorPersistenceService) {
        super(entitySrv, shellSrv, snackBarSrv, route, router, confirmationSrv, defReportSrv, pagPersistSrv, 'LTM_DEPOSITS');
        this.pagination.pageSize = 15;
    }
}
