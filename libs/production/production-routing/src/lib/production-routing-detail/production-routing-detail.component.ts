import { Component, inject } from '@angular/core';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { LoginService, MaterialModule } from '@ss/common/api-common';
import { TranslateDirective } from '@ss/common/ui-lang';
import { DatePickerComponent } from '@ss/common/ui-datepicker';
import {
    DefaultAutoCompleteModel,
    UiAutoCompleteComponent,
    UserLookup,
} from '@ss/common/ui-auto-complete';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { BaseEntityDetailComponent } from '@ss/common/ui-base-entity';
import { CostCenterService } from '@ss/logistics/api-cost-center';
import { CurrencyService } from '@ss/common/api-lookup';
import { UserListService } from '@ss/common/api-users';
import {
    Routing,
    ROUTING_STATUS,
} from '../production-routing-services/production-routing-api';
import { ProductionRoutingService } from '../production-routing-services/production-routing.service';
import {
    ArticleAutoCompleteModel,
    ArticleService,
} from '@ss/master-data/api-article';

@Component({
    selector: 'ss-product-detail',
    templateUrl: './production-routing-detail.component.html',
    styleUrl: './production-routing-detail.component.scss',
    standalone: true,
    imports: [
        MaterialModule,
        TranslateDirective,
        CdkTextareaAutosize,
        UiAutoCompleteComponent,
        DatePickerComponent,
    ],
})
export class ProductionRoutingDetailComponent extends BaseEntityDetailComponent<Routing> {
    constructor(
        public override entitySrv: ProductionRoutingService,
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
            'PROD_PRODUCTION_ROUTING',
        );
        this.routingLookup = new DefaultAutoCompleteModel(
            this.entitySrv,
            'id',
            'description',
        );
    }

    #costCenterSrv = inject(CostCenterService);
    #currencySrv = inject(CurrencyService);
    #userSrv = inject(UserListService);
    #loginSrv = inject(LoginService);
    #articleSrv = inject(ArticleService);

    cCenterLookup = new DefaultAutoCompleteModel(this.#costCenterSrv);
    currencyLookup = new DefaultAutoCompleteModel(this.#currencySrv);
    articleLookup = new DefaultAutoCompleteModel(
        this.#articleSrv,
        'id',
        'description2',
    );
    routingLookup: DefaultAutoCompleteModel<Routing>
    userLookup = new UserLookup(this.#userSrv);
    override setupForm(r: Routing): FormGroup {
        return this.formBuilder.group({
            id: [r.id],
            productId: [r.productId],
            routingNumber: [r.routingNumber, Validators.required],
            revision: [r.revision || '1.0', Validators.required],
            description: [r.description],
            status: [r.status || 'DRAFT'],
            isDefault: [r.isDefault],
            isActive: [r.isActive],
            validFrom: [r.validFrom || new Date()],
            validTo: [r.validTo || new Date()],
            lotSizeFrom: [r.lotSizeFrom || 1],
            lotSizeTo: [r.lotSizeTo || 999999.0],
            previousVersionId: [r.previousVersionId],
            supersededById: [r.supersededById],
            createdAt: [{ value: r.createdAt || new Date(), disabled: true }],
            updatedAt: [{ value: r.updatedAt || new Date(), disabled: true }],
            createdBy: [
                {
                    value: r.createdBy || this.#loginSrv.appCtx.id,
                    disabled: true,
                },
            ],
            updatedBy: [
                {
                    value: r.updatedBy || this.#loginSrv.appCtx.id,
                    disabled: true,
                },
            ],
            deletedAt: [{ value: r.deletedAt || new Date(), disabled: true }],
        });
    }

    protected readonly ROUTING_STATUS = ROUTING_STATUS;

    override readForm(): Routing {
        const formValue = this.form.getRawValue();
        formValue.isActive = formValue.isActive ? 1 : 0;
        formValue.isDefault = formValue.isDefault ? 1 : 0;
        return formValue;
    }
}
