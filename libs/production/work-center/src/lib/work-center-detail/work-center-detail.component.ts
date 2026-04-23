import { Component, inject } from '@angular/core';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { LoginService, MaterialModule } from '@ss/common/api-common';
import { MatError } from '@angular/material/form-field';
import { TranslateDirective } from '@ss/common/ui-lang';
import { DatePickerComponent } from '@ss/common/ui-datepicker';
import {
    DefaultAutoCompleteModel,
    UiAutoCompleteComponent, UserLookup,
} from '@ss/common/ui-auto-complete';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { BaseEntityDetailComponent } from '@ss/common/ui-base-entity';
import {
    WORK_CENTER_TYPES,
    WorkCenter,
} from '../work-center-services/work-center-api';
import { WorkCenterService } from '../work-center-services/work-center.service';
import { CostCenterService } from '@ss/logistics/api-cost-center';
import { CurrencyService } from '@ss/common/api-lookup';
import { UserListService } from '@ss/common/api-users';

@Component({
    selector: 'ss-product-detail',
    templateUrl: './work-center-detail.component.html',
    styleUrl: './work-center-detail.component.scss',
    standalone: true,
    imports: [
        MaterialModule,
        TranslateDirective,
        CdkTextareaAutosize,
        UiAutoCompleteComponent,
        DatePickerComponent,
    ],
})
export class WorkCenterDetailComponent extends BaseEntityDetailComponent<WorkCenter> {
    constructor(
        public override entitySrv: WorkCenterService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override confirmationSrv: ConfirmationDialogService,
        public override formBuilder: UntypedFormBuilder,
    ) {
        super(
            entitySrv,
            shellSrv,
            snackBarSrv,
            route,
            formBuilder,
            confirmationSrv,
            'PROD_WORK_CENTER',
        );
    }

    #costCenterSrv = inject(CostCenterService);
    #currencySrv = inject(CurrencyService);
    #userSrv = inject(UserListService);
    #loginSrv = inject(LoginService);

    cCenterLookup = new DefaultAutoCompleteModel(this.#costCenterSrv);
    currencyLookup = new DefaultAutoCompleteModel(this.#currencySrv);
    userLookup = new UserLookup(this.#userSrv);
    override setupForm(w: WorkCenter): FormGroup {
        return this.formBuilder.group({
            id: [w.id],
            code: [w.code],
            name: [w.name, Validators.required],
            description: [w.description],
            costCenterId: [w.costCenterId, Validators.required],
            workCenterType: [w.workCenterType],
            location: [w.location],
            building: [w.building],
            floor: [w.floor],
            capacityCapacity: [w.capacityCapacity],
            capacityUsed: [w.capacityUsed],
            efficiencyFactor: [w.efficiencyFactor],
            utilizationFactor: [w.utilizationFactor],
            queueTime: [w.queueTime],
            moveTime: [w.moveTime],
            waitTime: [w.waitTime],
            isActive: [w.isActive],
            isBottleneck: [w.isBottleneck],
            requiresSetup: [w.requiresSetup],
            allowsParallel: [w.allowsParallel],
            currencyId: [w.currencyId],
            createdAt: [{ value: w.createdAt || new Date(), disabled: true }],
            updatedAt: [{ value: w.updatedAt || new Date(), disabled: true }],
            createdBy: [{ value: w.createdBy || this.#loginSrv.appCtx.id, disabled: true }],
            updatedBy: [{ value: w.updatedBy || this.#loginSrv.appCtx.id, disabled: true }],
            deletedAt: [{ value: w.deletedAt || new Date(), disabled: true }],
            ccDescription: [w.ccDescription],
        });
    }

    protected readonly WORK_CENTER_TYPES = WORK_CENTER_TYPES;
}
