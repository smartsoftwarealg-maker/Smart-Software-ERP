import { Component } from '@angular/core';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { ActivatedRoute } from '@angular/router';
import { ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { UntypedFormBuilder } from '@angular/forms';
import { BaseLookupDetailClass } from "../lookup-detail-template/base-lookup-detail.class";
import { LtmTestTypeService } from "../services/ltm-test-type.service";

@Component({
    selector: 'ss-cmms-fault-detail',
    templateUrl: '../lookup-detail-template/base-lookup-detail.component.html',
    styleUrls: ['../lookup-detail-template/base-lookup-detail.component.css'],
})
export class LtmTestTypeDetailComponent extends BaseLookupDetailClass {
    constructor(
        public override entitySrv: LtmTestTypeService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override confirmationSrv: ConfirmationDialogService,
        public override formBuilder: UntypedFormBuilder) {
        super(entitySrv, shellSrv, snackBarSrv, route, formBuilder, confirmationSrv, 'LTM_TEST_TYPE');
    }
}
