import { Component } from '@angular/core';
import {Activity, ActivityService, RoleService} from '@ss/common/api-lookup';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { ActivatedRoute, Router } from '@angular/router';
import {BaseEntityDetailComponent, BaseEntityListComponent} from '@ss/common/ui-base-entity';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import {PaginatorPersistenceService, Role} from '@ss/common/api-common';
import {DefaultReportService} from '@ss/common/ui-default-report-component';


@Component({
    selector: 'ss-role-list',
    templateUrl: '../base-templates/list-template.html',
    styleUrls: ['../base-templates/list-template.scss']
})
export class RoleListComponent extends BaseEntityListComponent<Role> {

    displayedColumns = ['description'];

    constructor(
        public roleSrv: RoleService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override confirmationSrv: ConfirmationDialogService,
        public override defReportSrv: DefaultReportService,
        public override router: Router,
        public override pagPersistSrv: PaginatorPersistenceService) {
        super(roleSrv, shellSrv, snackBarSrv, route, router, confirmationSrv, defReportSrv, pagPersistSrv,'COMMON_ROLES');
    }

}


@Component({
    selector: 'ss-role-detail',
    templateUrl: '../base-templates/detail-template.html',
    styleUrls: ['../base-templates/detail-template.scss']
})
export class RoleDetailComponent extends BaseEntityDetailComponent<Role> {

    constructor(
        public roleSrv: RoleService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override confirmationSrv: ConfirmationDialogService,
        public override formBuilder: UntypedFormBuilder) {
        super(roleSrv, shellSrv, snackBarSrv, route, formBuilder, confirmationSrv, 'COMMON_ROLES');
    }

    public override setupForm(e: Activity): UntypedFormGroup {
        return this.formBuilder.group({
            id: e.id,
            description:   [e.description, Validators.required],
            descriptionAr: [e.descriptionAr]
        });
    }
}
