import { Component } from '@angular/core';
import {BaseEntityListComponent} from '@ss/common/ui-base-entity';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute, Router} from '@angular/router';
import {DefaultReportService} from '@ss/common/ui-default-report-component';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {PaginationModel, PaginatorPersistenceService} from '@ss/common/api-common';
import {AssetAppointmentDocService} from '../asset-appointment-doc.service';
import {ASSAppointmentHeader, AssetAppointmentLine} from '../assets-api';
import {AssetAppointmentLineService} from '../asset-appointment-line.service';

@Component({
  selector: 'ss-asset-appointment-doc-list',
  templateUrl: './asset-appointment-doc-list.component.html',
  styleUrls: ['./asset-appointment-doc-list.component.scss']
})
export class AssetAppointmentDocListComponent extends BaseEntityListComponent<ASSAppointmentHeader> {
    detailData: AssetAppointmentLine[] = [];
    detailPagination = PaginationModel.newInstance();
    private DEF_COLS = [
        'reference',
        'description',
        'accountno',
        'acquisitionDate',
        'serviceDate',
        'acquisitionValue',
        'depreciationRate',
        'useful_life',
        'residualValue',
        'key'
    ];

    private AQS_COLS = [
        'reference',
        'description',
        'acquisitionDate',
        'serviceDate',
        'acquisitionValue',
        // 'officeDescription',
        'beneficiary',
        'serial_no',
        // 'depreciationRate',
        // 'useful_life',
        // 'residualValue',
        'key'
    ];

    detailColumns = this.AQS_COLS;

    displayedColumns = [
        'serialNumber',
        'date',
        'officeName',
        'beneficiary',
        'requestNumber',
        'requestDate',
        'reappointment',
        'creatorName'
    ];

    constructor(
        public override entitySrv: AssetAppointmentDocService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override router: Router,
        public override defReportSrv: DefaultReportService,
        public override confirmationSrv: ConfirmationDialogService,
        public override pagPersistSrv: PaginatorPersistenceService,
        private detailSrv: AssetAppointmentLineService) {
        super(entitySrv,
            shellSrv,
            snackBarSrv,
            route,
            router,
            confirmationSrv,
            defReportSrv,
            pagPersistSrv,
            'ASSET_APPOINTMENTS');
    }

    override select(id: number) {
        super.select(id);
        this.detailSrv.setParentId(id || 0);
        this.detailSrv
            .getList(0, this.detailPagination.pageSize)
            .subscribe(res => {
                this.detailData = res.body;
                this.detailPagination.elementCount = res.itemCount;
            });
    }
    openAsset(id: number) {
        if (id > 0) {
            this.router.navigate(['../assets', id], { relativeTo: this.route });
        }
    }
}
