import { Component } from '@angular/core';
import { CMMSWorkDetail } from '@ss/cmms/cmms-api';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { ActivatedRoute } from '@angular/router';
import { UntypedFormBuilder } from '@angular/forms';
import { ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { CMMSWorkOrderService } from '../c-m-m-s-work-order.service';
import { DOC_WORK_ORDER } from '@ss/logistics/api-transaction';

@Component({
    selector: 'ss-work-order-detail',
    templateUrl: './work-order-detail.component.html',
    styleUrls: ['./work-order-detail.component.css'],
})
export class WorkOrderDetailComponent extends CMMSWorkDetail {

    constructor(
        public override entitySrv: CMMSWorkOrderService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override formBuilder: UntypedFormBuilder,
        public override confirmationSrv: ConfirmationDialogService) {
        super(entitySrv, shellSrv, snackBarSrv, route, formBuilder, confirmationSrv, DOC_WORK_ORDER, 'CMMS_CUR_WORK_ORDER');
    }

}

