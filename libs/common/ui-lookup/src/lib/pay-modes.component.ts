import {Component} from '@angular/core';
import {PayMode, PayModeService} from '@ss/common/api-lookup';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute, Router} from '@angular/router';
import {BaseEntityDetailComponent, BaseEntityListComponent} from '@ss/common/api-base-entity';
import {ConfirmationDialogService} from "@ss/common/ui-confirmation-dialog";
import {FormBuilder, FormGroup, Validators} from '@angular/forms';


@Component({
    selector: 'ss-pay-mode-list',
    templateUrl: './base-templates/list-template.html',
    styleUrls: ['./base-templates/list-template.scss']
})
export class PayModeListComponent extends BaseEntityListComponent<PayMode> {

    displayedColumns = ['description'];

    constructor(
        public payModeSrv: PayModeService,
        public shellSrv: ShellService,
        public snackBarSrv: SnackBarService,
        public route: ActivatedRoute,
        public confirmationSrv: ConfirmationDialogService,
        public router: Router) {
        super(payModeSrv, shellSrv, snackBarSrv, route, router, confirmationSrv, 'COMMON_PAY_MODES');
    }

}


@Component({
    selector: 'ss-pay-mode-detail',
    templateUrl: './base-templates/detail-template.html',
    styleUrls: ['./base-templates/detail-template.scss']
})
export class PayModeDetailComponent extends BaseEntityDetailComponent<PayMode> {

    constructor(
        public payModeServ: PayModeService,
        public shellSrv: ShellService,
        public snackBarSrv: SnackBarService,
        public route: ActivatedRoute,
        public confirmationSrv: ConfirmationDialogService,
        public formBuilder: FormBuilder) {
        super(payModeServ, shellSrv, snackBarSrv, route, formBuilder, confirmationSrv, 'COMMON_EDIT_PAY_MODE');
    }

    public setupForm(e: PayMode): FormGroup {
        return this.formBuilder.group({
            id: e.id,
            description: [e.description, Validators.required]
        });
    }
}
