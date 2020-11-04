import { Component } from '@angular/core';
import { Activity, ActivityService } from '@ss/common/api-lookup';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { ActivatedRoute, Router } from '@angular/router';
import {BaseEntityDetailComponent, BaseEntityListComponent} from '@ss/common/api-base-entity';
import {ConfirmationDialogService} from "@ss/common/ui-confirmation-dialog";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";


@Component({
    selector: 'ss-activity-list',
    templateUrl: './base-templates/list-template.html',
    styleUrls: ['./base-templates/list-template.scss']
})
export class ActivityListComponent extends BaseEntityListComponent<Activity> {

    displayedColumns = ['description'];

    constructor(
        public activitySrv: ActivityService,
        public shellSrv: ShellService,
        public snackBarSrv: SnackBarService,
        public route: ActivatedRoute,
        public confirmationSrv: ConfirmationDialogService,
        public router: Router) {
        super(activitySrv, shellSrv, snackBarSrv, route, router, confirmationSrv, 'COMMON_ACTIVITIES');
    }

}


@Component({
    selector: 'ss-activity-detail',
    templateUrl: './base-templates/detail-template.html',
    styleUrls: ['./base-templates/detail-template.scss']
})
export class ActivityDetailComponent extends BaseEntityDetailComponent<Activity> {

    constructor(
        public activitySrv: ActivityService,
        public shellSrv: ShellService,
        public snackBarSrv: SnackBarService,
        public route: ActivatedRoute,
        public confirmationSrv: ConfirmationDialogService,
        public formBuilder: FormBuilder) {
        super(activitySrv, shellSrv, snackBarSrv, route, formBuilder, confirmationSrv, 'COMMON_EDIT_ACTIVITY');
    }

    public setupForm(e: Activity): FormGroup {
        return this.formBuilder.group({
            id: e.id,
            description: [e.description, Validators.required]
        });
    }
}
