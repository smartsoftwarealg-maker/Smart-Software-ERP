import { Component } from '@angular/core';
import { CMMSWorkDetail } from '@ss/cmms/cmms-api';
import { UntypedFormBuilder } from '@angular/forms';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { ActivatedRoute } from '@angular/router';
import { ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { CMMSWorkRequestService } from '../c-m-m-s-work-request.service';
import { DOC_WORK_REQUEST } from '@ss/logistics/api-transaction';

@Component({
    selector: 'ss-work-request-detail',
    templateUrl: './work-request-detail.component.html',
    styleUrls: ['./work-request-detail.component.css'],
})
export class WorkRequestDetailComponent extends CMMSWorkDetail {
    constructor(
        public override entitySrv: CMMSWorkRequestService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override formBuilder: UntypedFormBuilder,
        public override confirmationSrv: ConfirmationDialogService) {
        super(entitySrv, shellSrv, snackBarSrv, route, formBuilder, confirmationSrv, DOC_WORK_REQUEST, 'CMMS_PREV_WORK_ORDER');
    }

}
