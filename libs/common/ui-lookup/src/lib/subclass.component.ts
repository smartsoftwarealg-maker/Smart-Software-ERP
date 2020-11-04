import { Component } from '@angular/core';
import { Subclass, SubclassService } from '@ss/common/api-lookup';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { ActivatedRoute, Router } from '@angular/router';
import {BaseEntityDetailComponent, BaseEntityListComponent} from '@ss/common/api-base-entity';
import {ConfirmationDialogService} from "@ss/common/ui-confirmation-dialog";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";


@Component({
    selector: 'ss-subclass-list',
    templateUrl: './base-templates/list-template.html',
    styleUrls: ['./base-templates/list-template.scss']
})
export class SubclassListComponent extends BaseEntityListComponent<Subclass> {

    displayedColumns = ['description'];

    constructor(
        public subclassSrv: SubclassService,
        public shellSrv: ShellService,
        public snackBarSrv: SnackBarService,
        public route: ActivatedRoute,
        public confirmationSrv: ConfirmationDialogService,
        public router: Router) {
        super(subclassSrv, shellSrv, snackBarSrv, route, router, confirmationSrv, 'COMMON_SUBCLASSES');
    }

}


@Component({
    selector: 'ss-subclass-detail',
    templateUrl: './base-templates/detail-template.html',
    styleUrls: ['./base-templates/detail-template.scss']
})
export class SubclassDetailComponent extends BaseEntityDetailComponent<Subclass> {

    constructor(
        public subclassSrv: SubclassService,
        public shellSrv: ShellService,
        public snackBarSrv: SnackBarService,
        public route: ActivatedRoute,
        public confirmationSrv: ConfirmationDialogService,
        public formBuilder: FormBuilder) {
        super(subclassSrv, shellSrv, snackBarSrv, route, formBuilder, confirmationSrv, 'COMMON_EDIT_SUBCLASS');
    }

    public setupForm(e: Subclass): FormGroup {
        return this.formBuilder.group({
            id: e.id,
            description: [e.description, Validators.required]
        });
    }
}

