import { Component } from "@angular/core";
import { BaseEntityListComponent } from "@ss/common/ui-base-entity";
import { ShellService, SnackBarService } from "@ss/common/ui-shell";
import { ActivatedRoute, Router } from "@angular/router";
import { DefaultReportService } from "@ss/common/ui-default-report-component";
import { ConfirmationDialogService } from "@ss/common/ui-confirmation-dialog";
import { MaterialModule, PaginatorPersistenceService } from "@ss/common/api-common";

import { TranslateDirective } from '@ss/common/ui-lang';
import { Fund } from '../fund.api';
import { FundService } from '../funds.service';

@Component({
    selector: "ss-payroll-funds-list",
    templateUrl: "./funds-list.component.html",
    styleUrls: ["./funds-list.component.scss"],
    standalone: true,
    imports: [
    MaterialModule,
    TranslateDirective
]
})
export class FundsListComponent extends BaseEntityListComponent<Fund> {
    displayedColumns = [
        "description",
        "accountNo"
    ];

    constructor(
        public gridSrv: FundService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override router: Router,
        public override defReportSrv: DefaultReportService,
        public override confirmationSrv: ConfirmationDialogService,
        pagPersistSrv: PaginatorPersistenceService) {
        super(gridSrv,
            shellSrv,
            snackBarSrv,
            route,
            router,
            confirmationSrv,
            defReportSrv,
            pagPersistSrv,
            "PAYROLL_FUNDS");
        this.pagPersistSrv = pagPersistSrv;
        this.pagination.pageSize = 15;
    }

}
