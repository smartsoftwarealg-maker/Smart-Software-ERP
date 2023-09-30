import { Component } from '@angular/core';
import { CMMSWorkDetail, IS_NOT_INSPECTION } from '@ss/cmms/cmms-api';
import { UntypedFormBuilder } from '@angular/forms';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { ActivatedRoute } from '@angular/router';
import { ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { CMMSPrevWorkOrderService } from '../c-m-m-s-prev-work-order.service';
import { DOC_WORK_REQUEST } from '@ss/logistics/api-transaction';

@Component({
    selector: 'ss-prev-work-order-detail',
    templateUrl: './prev-work-order-detail.component.html',
    styleUrls: ['./prev-work-order-detail.component.css'],
})
export class PrevWorkOrderDetailComponent extends CMMSWorkDetail {
    constructor(
        public override entitySrv: CMMSPrevWorkOrderService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override formBuilder: UntypedFormBuilder,
        public override confirmationSrv: ConfirmationDialogService) {
        super(entitySrv, shellSrv, snackBarSrv, route, formBuilder, confirmationSrv, DOC_WORK_REQUEST, 'CMMS_PREV_WORK_ORDER', IS_NOT_INSPECTION);
    }

}
