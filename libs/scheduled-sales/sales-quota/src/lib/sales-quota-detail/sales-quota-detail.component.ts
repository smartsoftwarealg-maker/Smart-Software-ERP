import {Component} from '@angular/core';
import {BaseEntityDetailComponent} from '@ss/common/ui-base-entity';
import {Quota, SSArticleService, SSQuotaService} from '@ss/scheduled-sales/api-scheduled-sales';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute} from '@angular/router';
import {UntypedFormBuilder, Validators} from '@angular/forms';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {DiscountService, LookupsService} from '@ss/common/api-lookup';
import {DefaultAutoCompleteModel} from '@ss/common/ui-auto-complete';
import {Agent, CustomerService} from '@ss/logistics/api-agent';
import {LoginService} from '@ss/common/api-common';

@Component({
    selector: 'ss-sales-quota-detail',
    templateUrl: './sales-quota-detail.component.html',
    styleUrls: ['./sales-quota-detail.component.scss'],
})
export class SalesQuotaDetailComponent extends BaseEntityDetailComponent<Quota> {
    customerLookup = new DefaultAutoCompleteModel<Agent>(this.customerSrv, 'id', 'denomination')
    articleLookup  = new DefaultAutoCompleteModel(this.articleSrv, 'id', 'description2');
    discountLookup = new DefaultAutoCompleteModel(this.discountSrv);

    constructor(
        public override entitySrv: SSQuotaService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override formBuilder: UntypedFormBuilder,
        public override confirmationSrv: ConfirmationDialogService,
        public lookupsSrv: LookupsService,
        private customerSrv: CustomerService,
        private articleSrv: SSArticleService,
        private loginSrv: LoginService,
        private discountSrv: DiscountService) {
        super(entitySrv, shellSrv, snackBarSrv, route, formBuilder, confirmationSrv, 'SCH_QUOTAS');
    }

    public setupForm(b: Quota) {
        // Make sure to update the template if you edit the configuration here
        return this.formBuilder.group({
            id: [b.id],
            salesDate: [b.salesDate || new Date(0), Validators.required],
            description: [b.description, Validators.required],
            agentId: [b.agentId, Validators.required],
            productId: [b.productId, Validators.required],
            exworks: [b.exworks, Validators.required],
            qty: [b.qty, Validators.required],
            discountType: [b.discountType],
            discount: [b.discount, Validators.required],
            discount_2: [b.discount_2, Validators.required],
            discount_3: [b.discount_3, Validators.required],
        });
    }

    override readForm(): Quota {
        const quota = super.readForm();
        quota.centerId = this.loginSrv.appCtx.center;
        return quota;
    }
}
