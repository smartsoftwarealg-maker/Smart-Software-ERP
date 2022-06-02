import { Component} from '@angular/core';
import {BaseEntityListComponent} from '@ss/common/ui-base-entity';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute, Router} from '@angular/router';
import {DefaultReportService} from '@ss/common/ui-default-report-component';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {PaginatorPersistenceService} from '@ss/common/api-common';
import {AssetReception} from '../assets-api';
import {AssetReceptionService} from '../asset-reception.service';

@Component({
  selector: 'ss-asset-receptions',
  templateUrl: './asset-receptions.component.html',
  styleUrls: ['./asset-receptions.component.scss']
})
export class AssetReceptionsComponent extends BaseEntityListComponent<AssetReception> {

    displayedColumns = [
        'acquisition_Date',
        'invoice_Number',
        'supplier',
    ];

    constructor(
        public override entitySrv: AssetReceptionService,
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
            'ASSET_RECEPTIONS');
        this.pagination.pageSize = 10;
    }

    override ngOnInit() {
        super.ngOnInit();
        this.editButton.visible = false;
        this.deleteButton.visible = false;
        this.shellSrv.updateShell();
    }
}
