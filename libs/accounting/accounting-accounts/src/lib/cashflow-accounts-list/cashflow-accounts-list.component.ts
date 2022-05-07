import { Component, OnInit } from '@angular/core';
import {BaseEntityListComponent} from '@ss/common/ui-base-entity';
import {AnnexCode, AnnexCodeService} from '@ss/accounting/accounting-api';
import {BankService} from '@ss/administration/api-bank';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute, Router} from '@angular/router';
import {DefaultReportService} from '@ss/common/ui-default-report-component';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {PaginatorPersistenceService} from '@ss/common/api-common';

@Component({
  selector: 'ss-cashflow-accounts-list',
  templateUrl: './cashflow-accounts-list.component.html',
  styleUrls: ['./cashflow-accounts-list.component.scss']
})
export class CashflowAccountsListComponent extends BaseEntityListComponent<AnnexCode> {
    selectedId = 0;

    constructor(
        public override entitySrv: AnnexCodeService,
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
            'ADMINISTRATION_BANK');
        this.pagination.pageSize = 50;
    }

    selectItem(annex: AnnexCode) {
        this.selectedId = annex?.id;
        console.log(annex, this.selectedId);
    }
}
