import { Component} from '@angular/core';
import {BaseEntityListComponent} from '@ss/common/ui-base-entity';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute, Router} from '@angular/router';
import {DefaultReportService} from '@ss/common/ui-default-report-component';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {IsParamService, PaginationModel, PaginatorPersistenceService} from '@ss/common/api-common';
import {Asset, AssetReception} from '../assets-api';
import {AssetReceptionService} from '../asset-reception.service';
import {tap} from 'rxjs/operators';

@Component({
  selector: 'ss-asset-receptions',
  templateUrl: './asset-receptions.component.html',
  styleUrls: ['./asset-receptions.component.scss']
})
export class AssetReceptionsComponent extends BaseEntityListComponent<AssetReception> {
    private DEF_COLS = [
        'reference',
        'description',
        'accountno',
        'acquisitionDate',
        'serviceDate',
        'acquisitionValue',
        'key'
    ];

    private AQS_COLS = [
        'reference',
        'description',
        'accountno',
        'acquisitionDate',
        'serviceDate',
        'acquisitionValue',
        'geolocation',
        'beneficiary',
        'serial_no',
        'key'
    ];

    detailColumns = this.DEF_COLS;

    displayedColumns = [
        'serialNumber',
        'receptionDate',
        'supplierName',
        'count',
        'amount',
        'creatorName',
        'status'
    ];
    detail: Asset[] = [];
    detailPagination = PaginationModel.newInstance();

    constructor(
        public override entitySrv: AssetReceptionService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override router: Router,
        public override defReportSrv: DefaultReportService,
        public override confirmationSrv: ConfirmationDialogService,
        public override pagPersistSrv: PaginatorPersistenceService,
        private isParamSrv: IsParamService) {
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
        // this.editButton.visible = false;
        // this.deleteButton.visible = false;
        this.shellSrv.updateShell();
        this.isParamSrv
            .is('AQS')
            .pipe(tap(res => res? this.detailColumns = this.AQS_COLS : this.DEF_COLS))
    }

    override select(id: number) {
        super.select(id);
        this.entitySrv.getAssets(id || 0).subscribe(res => this.detail = res);
    }

    openAsset(id: number) {
        if (id > 0) {
            console.log('id: ', id);
            this.router.navigate(['../assets', id], { relativeTo: this.route });
        }
    }
}
