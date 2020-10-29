import {Component} from '@angular/core';
import {BaseEntityDetailComponent} from '@ss/common/api-base-entity';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Nationality, NationalityService} from "@ss/common/api-lookup";
import {ConfirmationDialogService} from "@ss/common/ui-confirmation-dialog";


@Component({
    selector: 'ss-nationality-detail',
    templateUrl: '../base-templates/detail-template.html',
    styleUrls: ['../base-templates/detail-template.scss']
})
export class NationalityDetailComponent extends BaseEntityDetailComponent<Nationality> {

    constructor(
        public nationalitySrv: NationalityService,
        public shellSrv: ShellService,
        public snackBarSrv: SnackBarService,
        public route: ActivatedRoute,
        public confirmationSrv: ConfirmationDialogService,
        public formBuilder: FormBuilder) {
        super(nationalitySrv, shellSrv, snackBarSrv, route, formBuilder, confirmationSrv, 'EDIT_NATIONALITY');
    }

    public setupForm(e: Nationality): FormGroup {
        return this.formBuilder.group({
            id: e.id,
            description: [e.description, Validators.required]
        });
    }
}
