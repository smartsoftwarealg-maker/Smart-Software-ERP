import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { LoginService, MaterialModule } from '@ss/common/api-common';
import { TranslateDirective, TranslatePipe } from '@ss/common/ui-lang';
import {
    DefaultAutoCompleteModel, UiAutoCompleteComponent,
    UserLookup,
} from '@ss/common/ui-auto-complete';
import { BaseChildEntityDetailComponent } from '@ss/common/ui-base-entity';
import { CostCenterService } from '@ss/logistics/api-cost-center';
import { CurrencyService } from '@ss/common/api-lookup';
import { UserListService } from '@ss/common/api-users';
import {
    CONSUMPTION_POINT,
    CONSUMPTION_TYPE,
    RoutingMaterial,
} from '../production-routing-services/production-routing-api';
import { ArticleService } from '@ss/master-data/api-article';
import { RoutingMaterialService } from '../production-routing-services/routing-material.service';
import { BomService } from '@ss/master-data/ui-article';

@Component({
    selector: 'ss-product-line-detail',
    templateUrl: './routing-material-line-detail.component.html',
    styleUrl: './routing-material-line-detail.component.scss',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [
        MaterialModule,
        TranslateDirective,
        TranslatePipe,
        UiAutoCompleteComponent,
    ],
})
export class RoutingMaterialLineDetailComponent extends BaseChildEntityDetailComponent<RoutingMaterial> {
    private fb = inject(FormBuilder);

    constructor(protected override entitySrv: RoutingMaterialService) {
        super(entitySrv, 'PRODUCTION_ROUTING_OPERATION_DETAIL');
    }

    #costCenterSrv = inject(CostCenterService);
    #currencySrv = inject(CurrencyService);
    #userSrv = inject(UserListService);
    #loginSrv = inject(LoginService);
    #articleSrv = inject(ArticleService);
    #bomSrv = inject(BomService);

    cCenterLookup = new DefaultAutoCompleteModel(this.#costCenterSrv);
    currencyLookup = new DefaultAutoCompleteModel(this.#currencySrv);
    articleLookup = new DefaultAutoCompleteModel(
        this.#articleSrv,
        'id',
        'description2',
    );
    userLookup = new UserLookup(this.#userSrv);
    bomLookup = new DefaultAutoCompleteModel(this.#bomSrv);

    override setupForm(o: RoutingMaterial): UntypedFormGroup {
        return this.fb.group({
            id: [o.id],
            parentId: [o.parentId || this.entitySrv.getParentId()],
            bomItemId: [o.bomItemId, Validators.required],
            consumptionType: [o.consumptionType || 'VARIABLE'],
            quantityPer: [o.quantityPer, Validators.required],
            scrapPercentage: [o.scrapPercentage],
            consumptionPoint: [o.consumptionPoint || 'START'],
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
        });
    }

    protected readonly CONSUMPTION_TYPE = CONSUMPTION_TYPE;
    protected readonly CONSUMPTION_POINT = CONSUMPTION_POINT;
}
