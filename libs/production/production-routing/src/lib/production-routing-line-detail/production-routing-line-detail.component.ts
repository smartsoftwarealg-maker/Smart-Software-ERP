import { Component, inject } from '@angular/core';
import { FormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { LoginService, MaterialModule } from '@ss/common/api-common';
import { TranslateDirective, TranslatePipe } from '@ss/common/ui-lang';
import { DatePickerComponent } from '@ss/common/ui-datepicker';
import {
    DefaultAutoCompleteModel,
    UiAutoCompleteComponent,
    UserLookup,
} from '@ss/common/ui-auto-complete';
import { BaseChildEntityDetailComponent } from '@ss/common/ui-base-entity';
import { CostCenterService } from '@ss/logistics/api-cost-center';
import { CurrencyService } from '@ss/common/api-lookup';
import { UserListService } from '@ss/common/api-users';
import {
    OPERATION_TYPE,
    Routing,
    RoutingOperation,
} from '../production-routing-services/production-routing-api';
import { ArticleService } from '@ss/master-data/api-article';
import { ProductionRoutingOperationService } from '../production-routing-services/production-routing-operation.service';
import { WorkCenterService } from '@ss/production/work-center';

@Component({
    selector: 'ss-product-line-detail',
    templateUrl: './production-routing-line-detail.component.html',
    styleUrl: './production-routing-line-detail.component.scss',
    standalone: true,
    imports: [
        MaterialModule,
        TranslateDirective,
        UiAutoCompleteComponent,
        DatePickerComponent,
        TranslatePipe,
    ],
})
export class ProductionRoutingLineDetailComponent extends BaseChildEntityDetailComponent<RoutingOperation> {
    private fb = inject(FormBuilder);

    constructor(
        protected override entitySrv: ProductionRoutingOperationService,
    ) {
        super(entitySrv, 'PRODUCTION_ROUTING_OPERATION_DETAIL');
    }

    #costCenterSrv = inject(CostCenterService);
    #currencySrv = inject(CurrencyService);
    #userSrv = inject(UserListService);
    #loginSrv = inject(LoginService);
    #articleSrv = inject(ArticleService);
    #workCenterSrv = inject(WorkCenterService);

    cCenterLookup = new DefaultAutoCompleteModel(this.#costCenterSrv);
    currencyLookup = new DefaultAutoCompleteModel(this.#currencySrv);
    workCenterLookup = new DefaultAutoCompleteModel(this.#workCenterSrv);
    articleLookup = new DefaultAutoCompleteModel(
        this.#articleSrv,
        'id',
        'description2',
    );
    userLookup = new UserLookup(this.#userSrv);

    override setupForm(o: RoutingOperation): UntypedFormGroup {
        return this.fb.group({
            id: [o.id],
            routingId: [o.parentId || this.entitySrv.getParentId()],
            operationSequence: [o.operationSequence, Validators.required],
            operationNumber: [o.operationNumber],
            operationName: [o.operationName],
            workCenterId: [o.workCenterId, Validators.required],
            setupTime: [o.setupTime || 0.0],
            runTimePerUnit: [o.runTimePerUnit || 0.0],
            teardownTime: [o.teardownTime || 0.0],
            queueTime: [o.queueTime || 0.0],
            moveTime: [o.moveTime || 0.0],
            waitTime: [o.waitTime || 0.0],
            operationType: [o.operationType],
            isMilestone: [o.isMilestone || 0],
            isCritical: [o.isCritical || 0],
            requiresInspection: [o.requiresInspection || 0],
            allowsBackflush: [o.allowsBackflush || 0],
            laborCrewSize: [o.laborCrewSize || 1],
            machineCount: [o.machineCount || 1],
            instructionText: [o.instructionText],
            setupInstruction: [o.setupInstruction],
            createdAt: [{ value: o.createdAt || new Date(), disabled: true }],
            updatedAt: [{ value: o.updatedAt || new Date(), disabled: true }],
            createdBy: [
                {
                    value: o.createdBy || this.#loginSrv.appCtx.id,
                    disabled: true,
                },
            ],
            updatedBy: [
                {
                    value: o.updatedBy || this.#loginSrv.appCtx.id,
                    disabled: true,
                },
            ],
            deletedAt: [{ value: o.deletedAt || new Date(), disabled: true }],
        });
    }

    override readForm(): RoutingOperation {
        const formValue = this.form.getRawValue();
        formValue.isMilestone = formValue.isMilestone ? 1 : 0;
        formValue.isCritical = formValue.isCritical ? 1 : 0;
        return formValue;
    }

    protected readonly OPERATION_TYPE = OPERATION_TYPE;
}
