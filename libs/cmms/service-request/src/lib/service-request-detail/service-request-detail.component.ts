import { Component } from '@angular/core';
import { CMMSWorkDetail, INSPECTION, IS_NOT_INSPECTION, WORK_TYPES } from "@ss/cmms/cmms-api";
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { ActivatedRoute } from '@angular/router';
import { UntypedFormBuilder } from '@angular/forms';
import { ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { DOC_WORK_ORDER } from '@ss/logistics/api-transaction';
import { CMMSServiceRequestService } from '../c-m-m-s-service-request.service';

@Component({
    selector: 'ss-service-request-detail',
    templateUrl: './service-request-detail.component.html',
    styleUrls: ['./service-request-detail.component.css'],
})
export class ServiceRequestDetailComponent extends CMMSWorkDetail {
    cmmsTypes = WORK_TYPES.filter(e => e.id !== INSPECTION);

    constructor(
        public override entitySrv: CMMSServiceRequestService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override formBuilder: UntypedFormBuilder,
        public override confirmationSrv: ConfirmationDialogService) {
        super(entitySrv, shellSrv, snackBarSrv, route, formBuilder, confirmationSrv, DOC_WORK_ORDER, 'CMMS_SERVICE_REQUEST', IS_NOT_INSPECTION);
    }

}


