import { Component } from '@angular/core';
import { City, CityService } from '@ss/common/api-lookup';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { ActivatedRoute, Router } from '@angular/router';
import {BaseEntityDetailComponent, BaseEntityListComponent} from '@ss/common/api-base-entity';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DepositType, DepositTypeService} from '@ss/exchange/api-currency-deposit';


@Component({
    selector: 'ss-deposit-type-list',
    templateUrl: '../../../../common/ui-lookup/src/lib/base-templates/list-template.html',
    styleUrls: ['../../../../common/ui-lookup/src/lib/base-templates/list-template.scss']
})
export class DepositTypeListComponent extends BaseEntityListComponent<DepositType> {

    displayedColumns = ['description'];

    constructor(
        public depositTypeSrv: DepositTypeService,
        public shellSrv: ShellService,
        public snackBarSrv: SnackBarService,
        public route: ActivatedRoute,
        public confirmationSrv: ConfirmationDialogService,
        public router: Router) {
        super(depositTypeSrv, shellSrv, snackBarSrv, route, router, confirmationSrv, 'EXCHANGE_DEPOSIT_TYPES');
    }

}


@Component({
    selector: 'ss-deposit-type-detail',
    templateUrl: '../../../../common/ui-lookup/src/lib/base-templates/detail-template.html',
    styleUrls: ['../../../../common/ui-lookup/src/lib/base-templates/detail-template.scss']
})
export class DepositTypeDetailComponent extends BaseEntityDetailComponent<DepositType> {

    constructor(
        public depositTypeSrv: DepositTypeService,
        public shellSrv: ShellService,
        public snackBarSrv: SnackBarService,
        public route: ActivatedRoute,
        public confirmationSrv: ConfirmationDialogService,
        public formBuilder: FormBuilder) {
        super(depositTypeSrv, shellSrv, snackBarSrv, route, formBuilder, confirmationSrv, 'EXCHANGE_EDIT_TYPE');
    }

    public setupForm(e: City): FormGroup {
        return this.formBuilder.group({
            id: e.id,
            description: [e.description, Validators.required]
        });
    }
}
