import { Component } from '@angular/core';
import {BaseEntityListComponent} from '@ss/common/ui-base-entity';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import {DefaultReportService} from '@ss/common/ui-default-report-component';
import { CommonUiConfirmationDialogModule, ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { MaterialModule, PaginationModel, PaginatorPersistenceService } from '@ss/common/api-common';
import {AssetAppointmentDocService} from '../services/asset-appointment-doc.service';
import {ASSAppointmentHeader, AssetAppointmentLine} from '../assets-api';
import {AssetAppointmentLineService} from '../services/asset-appointment-line.service';
import { CommonModule } from '@angular/common';
import { CommonUiLangModule } from '@ss/common/ui-lang';
import { CommonUiImageInputModule } from '@ss/common/ui-image-input';
import { UiPaginationModule } from '@ss/common/ui-pagination';
import { CommonUiAutoCompleteModule } from '@ss/common/ui-auto-complete';
import { CommonUiDatepickerModule } from '@ss/common/ui-datepicker';
import { CustomAttributesModule } from '@ss/custom-attributes';
import { AppArchiveModule } from '@ss/common/app-archive';
import { QRCodeModule } from 'angularx-qrcode';

@Component({
  selector: 'ss-asset-appointment-doc-list',
  templateUrl: './asset-appointment-doc-list.component.html',
  styleUrls: ['./asset-appointment-doc-list.component.scss'],
  standalone: true,
    imports: [
        CommonModule,
        MaterialModule,
        CommonUiLangModule,
        CommonUiImageInputModule,
        UiPaginationModule,
        CommonUiConfirmationDialogModule,
        CommonUiAutoCompleteModule,
        CommonUiDatepickerModule,
        RouterModule,
        CustomAttributesModule,
        AppArchiveModule,
        QRCodeModule
    ]})
export class AssetAppointmentDocListComponent extends BaseEntityListComponent<ASSAppointmentHeader> {
    detailData: AssetAppointmentLine[] = [];
    detailPagination = PaginationModel.newInstance( {pageSize: 5, elementCount: 0, page: 1});
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
        'status',
        'creatorName',
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
        this.detailPagination.onChange = () => this.refreshDetail();
    }

    override select(id: number) {
        super.select(id);
        this.detailSrv.setParentId(id || 0);
        this.refreshDetail();
    }
    openAsset(id: number) {
        if (id > 0) {
            this.router.navigate(['../assets', id], { relativeTo: this.route }).then();
        }
    }

    private refreshDetail() {
        this.detailSrv
            .getList(this.detailPagination.page - 1, this.detailPagination.pageSize)
            .subscribe(res => {
                this.detailData = res.body;
                this.detailPagination.elementCount = res.itemCount;
            });
    }
}
