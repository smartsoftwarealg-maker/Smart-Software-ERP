import {Component} from '@angular/core';
import {ServiceService, Service} from '@ss/common/api-lookup';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute, Router} from '@angular/router';
import {BaseEntityDetailComponent, BaseEntityListComponent} from '@ss/common/api-base-entity';
import {ConfirmationDialogService} from "@ss/common/ui-confirmation-dialog";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";


@Component({
    selector: 'ss-service-list',
    templateUrl: './base-templates/list-template.html',
    styleUrls: ['./base-templates/list-template.scss']
})
export class ServiceListComponent extends BaseEntityListComponent<Service> {

    displayedColumns = ['description'];

    constructor(
        public serviceSrv: ServiceService,
        public shellSrv: ShellService,
        public snackBarSrv: SnackBarService,
        public route: ActivatedRoute,
        public confirmationSrv: ConfirmationDialogService,
        public router: Router) {
        super(serviceSrv, shellSrv, snackBarSrv, route, router, confirmationSrv, 'COMMON_SERVICES');
    }

}


@Component({
    selector: 'ss-service-detail',
    templateUrl: './base-templates/detail-template.html',
    styleUrls: ['./base-templates/detail-template.scss']
})
export class ServiceDetailComponent extends BaseEntityDetailComponent<Service> {

    constructor(
        public serviceSrv: ServiceService,
        public shellSrv: ShellService,
        public snackBarSrv: SnackBarService,
        public route: ActivatedRoute,
        public confirmationSrv: ConfirmationDialogService,
        public formBuilder: FormBuilder) {
        super(serviceSrv, shellSrv, snackBarSrv, route, formBuilder, confirmationSrv, 'COMMON_EDIT_SERVICE');
    }

    public setupForm(e: Service): FormGroup {
        return this.formBuilder.group({
            id: e.id,
            description: [e.description, Validators.required]
        });
    }
}
