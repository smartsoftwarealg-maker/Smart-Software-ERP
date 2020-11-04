import { Component } from '@angular/core';
import { Currency, CurrencyService } from '@ss/common/api-lookup';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { ActivatedRoute, Router } from '@angular/router';
import {BaseEntityDetailComponent, BaseEntityListComponent} from '@ss/common/api-base-entity';
import {ConfirmationDialogService} from "@ss/common/ui-confirmation-dialog";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";


@Component({
    selector: 'ss-currency-list',
    templateUrl: './base-templates/list-template.html',
    styleUrls: ['./base-templates/list-template.scss']
})
export class CurrencyListComponent extends BaseEntityListComponent<Currency> {

    displayedColumns = ['description'];

    constructor(
        public currencySrv: CurrencyService,
        public shellSrv: ShellService,
        public snackBarSrv: SnackBarService,
        public route: ActivatedRoute,
        public confirmationSrv: ConfirmationDialogService,
        public router: Router) {
        super(currencySrv, shellSrv, snackBarSrv, route, router, confirmationSrv, 'COMMON_CURRENCIES');
    }

}


@Component({
    selector: 'ss-currency-detail',
    templateUrl: './base-templates/detail-template.html',
    styleUrls: ['./base-templates/detail-template.scss']
})
export class CurrencyDetailComponent extends BaseEntityDetailComponent<Currency> {

    constructor(
        public currencySrv: CurrencyService,
        public shellSrv: ShellService,
        public snackBarSrv: SnackBarService,
        public route: ActivatedRoute,
        public confirmationSrv: ConfirmationDialogService,
        public formBuilder: FormBuilder) {
        super(currencySrv, shellSrv, snackBarSrv, route, formBuilder, confirmationSrv, 'COMMON_EDIT_CURRENCY');
    }

    public setupForm(e: Currency): FormGroup {
        return this.formBuilder.group({
            id: e.id,
            description: [e.description, Validators.required]
        });
    }
}
