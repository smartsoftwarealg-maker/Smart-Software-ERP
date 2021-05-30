import { Component } from '@angular/core';
import { City, CityService } from '@ss/common/api-lookup';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { ActivatedRoute, Router } from '@angular/router';
import {BaseEntityDetailComponent, BaseEntityListComponent} from '@ss/common/api-base-entity';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DepositType, DepositTypeService} from '@ss/exchange/api-currency-deposit';
import {DefaultReportService} from '@ss/common/ui-default-report-component';


@Component({
    selector: 'ss-deposit-type-list',
    templateUrl: './list-template.html',
    styleUrls: ['./list-template.scss']
})
export class DepositTypeListComponent extends BaseEntityListComponent<DepositType> {

    displayedColumns = ['description', 'commissioned'];

    constructor(
        public depositTypeSrv: DepositTypeService,
        public shellSrv: ShellService,
        public snackBarSrv: SnackBarService,
        public route: ActivatedRoute,
        public confirmationSrv: ConfirmationDialogService,
        public defReportSrv: DefaultReportService,
        public router: Router) {
        super(depositTypeSrv, shellSrv, snackBarSrv, route, router, confirmationSrv, defReportSrv, 'EXCHANGE_DEPOSIT_TYPES');
        this.pagination.pageSize = 20;
    }
}


@Component({
    selector: 'ss-deposit-type-detail',
    templateUrl: './detail-template.html',
    styleUrls: ['./detail-template.scss']
})
export class DepositTypeDetailComponent extends BaseEntityDetailComponent<DepositType> {

    constructor(
        public depositTypeSrv: DepositTypeService,
        public shellSrv: ShellService,
        public snackBarSrv: SnackBarService,
        public route: ActivatedRoute,
        public confirmationSrv: ConfirmationDialogService,
        public formBuilder: FormBuilder) {
        super(depositTypeSrv, shellSrv, snackBarSrv, route, formBuilder, confirmationSrv, 'EXCHANGE_DEPOSIT_TYPES');
    }

    public setupForm(e: DepositType): FormGroup {
        return this.formBuilder.group({
            id: e.id,
            description: [e.description, Validators.required],
            commissioned: [e.commissioned, Validators.required]
        });
    }
}
