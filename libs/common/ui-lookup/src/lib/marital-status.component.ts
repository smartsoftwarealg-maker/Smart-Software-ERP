import {Component} from '@angular/core';
import {MaritalStatus, MaritalStatusService} from '@ss/common/api-lookup';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute, Router} from '@angular/router';
import {BaseEntityDetailComponent, BaseEntityListComponent} from '@ss/common/ui-base-entity';
import {ConfirmationDialogService} from "@ss/common/ui-confirmation-dialog";
import {UntypedFormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import {DefaultReportService} from '@ss/common/ui-default-report-component';
import {PaginatorPersistenceService} from '@ss/common/api-common';


@Component({
    selector: 'ss-marital-status-list',
    templateUrl: './base-templates/list-template.html',
    styleUrls: ['./base-templates/list-template.scss']
})
export class MaritalStatusListComponent extends BaseEntityListComponent<MaritalStatus> {

    displayedColumns = ['description', 'descriptionAr'];

    constructor(
        public maritalStatusSrv: MaritalStatusService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override confirmationSrv: ConfirmationDialogService,
        public override defReportSrv: DefaultReportService,
        public override router: Router,
        public override pagPersistSrv: PaginatorPersistenceService) {
        super(maritalStatusSrv, shellSrv, snackBarSrv, route, router, confirmationSrv,  defReportSrv, pagPersistSrv,'COMMON_MARITAL_STATUS');
    }

}


@Component({
    selector: 'ss-marital-status-detail',
    templateUrl: './base-templates/detail-template.html',
    styleUrls: ['./base-templates/detail-template.scss']
})
export class MaritalStatusDetailComponent extends BaseEntityDetailComponent<MaritalStatus> {

    constructor(
        public maritalStatusSrv: MaritalStatusService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override confirmationSrv: ConfirmationDialogService,
        public override formBuilder: UntypedFormBuilder) {
        super(maritalStatusSrv, shellSrv, snackBarSrv, route, formBuilder, confirmationSrv, 'COMMON_EDIT_MARITAL_STATUS');
    }

    public override setupForm(e: MaritalStatus): UntypedFormGroup {
        return this.formBuilder.group({
            id: e.id,
            description:  [e.description, Validators.required],
            descriptionAr: [e.descriptionAr]
        });
    }
}
