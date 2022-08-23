import { Component } from '@angular/core';
import {BaseEntityListComponent} from '@ss/common/ui-base-entity';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute, Router} from '@angular/router';
import {DefaultReportService} from '@ss/common/ui-default-report-component';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {PaginatorPersistenceService} from '@ss/common/api-common';
import {AssetAppointmentDocService} from '../asset-appointment-doc.service';
import {ASSAppointmentHeader} from '../assets-api';

@Component({
  selector: 'ss-asset-appointment-doc-list',
  templateUrl: './asset-appointment-doc-list.component.html',
  styleUrls: ['./asset-appointment-doc-list.component.scss']
})
export class AssetAppointmentDocListComponent extends BaseEntityListComponent<ASSAppointmentHeader> {

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
        public override pagPersistSrv: PaginatorPersistenceService) {
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
}
