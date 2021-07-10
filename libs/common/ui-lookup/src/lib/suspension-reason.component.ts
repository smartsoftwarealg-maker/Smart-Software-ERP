import { Component } from '@angular/core';
import { SuspensionReason, SuspensionReasonService } from '@ss/common/api-lookup';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { ActivatedRoute, Router } from '@angular/router';
import {BaseEntityDetailComponent, BaseEntityListComponent} from '@ss/common/ui-base-entity';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DefaultReportService} from '@ss/common/ui-default-report-component';


@Component({
    selector: 'ss-suspension-reason-list',
    templateUrl: './base-templates/list-template.html',
    styleUrls: ['./base-templates/list-template.scss']
})
export class SuspensionReasonListComponent extends BaseEntityListComponent<SuspensionReason> {

    displayedColumns = ['description'];

    constructor(
        public suspensionReasonSrv: SuspensionReasonService,
        public shellSrv: ShellService,
        public snackBarSrv: SnackBarService,
        public route: ActivatedRoute,
        public confirmationSrv: ConfirmationDialogService,
        public defReportSrv: DefaultReportService,
        public router: Router) {
        super(suspensionReasonSrv, shellSrv, snackBarSrv, route, router, confirmationSrv, defReportSrv, 'COMMON_SUSPENSION_REASONS');
    }

}


@Component({
    selector: 'ss-suspension-reason-detail',
    templateUrl: './base-templates/detail-template.html',
    styleUrls: ['./base-templates/detail-template.scss']
})
export class SuspensionReasonDetailComponent extends BaseEntityDetailComponent<SuspensionReason> {

    constructor(
        public suspensionReasonSrv: SuspensionReasonService,
        public shellSrv: ShellService,
        public snackBarSrv: SnackBarService,
        public route: ActivatedRoute,
        public confirmationSrv: ConfirmationDialogService,
        public formBuilder: FormBuilder) {
        super(suspensionReasonSrv, shellSrv, snackBarSrv, route, formBuilder, confirmationSrv, 'COMMON_EDIT_SUSPENSION_REASON');
    }

    public setupForm(e: SuspensionReason): FormGroup {
        return this.formBuilder.group({
            id: e.id,
            description: [e.description, Validators.required]
        });
    }
}
