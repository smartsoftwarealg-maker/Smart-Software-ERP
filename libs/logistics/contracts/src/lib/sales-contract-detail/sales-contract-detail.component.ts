import { Component, OnInit } from '@angular/core';
import {BaseEntityDetailComponent} from '@ss/common/ui-base-entity';
import {Project} from '../contract-api.class';
import {Bank, BankService} from '@ss/administration/api-bank';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute} from '@angular/router';
import {UntypedFormBuilder, Validators} from '@angular/forms';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {LookupsService} from '@ss/common/api-lookup';
import {SalesContractService} from '../sales-contract.service';
import {DefaultAutoCompleteModel} from '@ss/common/ui-auto-complete';
import {AgentService} from '@ss/logistics/api-agent';
import {ProjectTypeService} from '../../../../../common/api-lookup/src/lib/project-type.service';
import {LoginService} from '@ss/common/api-common';

@Component({
    selector: 'ss-sales-contract-detail',
    templateUrl: './sales-contract-detail.component.html',
    styleUrls: ['./sales-contract-detail.component.scss'],
})
export class SalesContractDetailComponent extends BaseEntityDetailComponent<Project> {
    customerLookupModel = new DefaultAutoCompleteModel(this.customerSrv, 'id', 'denomination');
    typeLookup = new DefaultAutoCompleteModel(this.typeSrv);

    constructor(
        public override entitySrv: SalesContractService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override formBuilder: UntypedFormBuilder,
        public override confirmationSrv: ConfirmationDialogService,
        public lookupsSrv: LookupsService,
        private customerSrv: AgentService,
        private typeSrv: ProjectTypeService,
        private loginSrv: LoginService) {
        super(entitySrv, shellSrv, snackBarSrv, route, formBuilder, confirmationSrv, 'COMMON_CONTRACTS');
    }

    public setupForm(b: Project) {
        const today = new Date();
        return this.formBuilder.group({
            id:             [b.id],
            centerId:       [b.centerId || this.loginSrv.appCtx.center, Validators.required],
            contractNo:     [b.contractNo, Validators.required],
            projDate:       [b.projDate, Validators.required],
            description:    [b.description, Validators.required],
            customer:       [b.customer, Validators.required],
            fromDate:       [b.fromDate  || today, Validators.required],
            toDate:         [b.toDate  || today, Validators.required],
            amount:         [b.amount || 0],
            advancePayment: [b.advancePayment || 0],
            advanceRate:    [b.advanceRate || 0],
            projType:       [b.projType, Validators.required],
        });
    }

    override readForm(): Project {
        return this.form.getRawValue();
    }
}
