import { Component } from '@angular/core';
import {BaseEntityDetailComponent} from '@ss/common/ui-base-entity';
import {BudgetTransfer, PlanningInfo} from '../budget-movement-api';
import {DecimalPipe} from '@angular/common';
import {DefaultAutoCompleteModel} from '@ss/common/ui-auto-complete';
import {Agent, SupplierService} from '@ss/logistics/api-agent';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute, Router} from '@angular/router';
import {UntypedFormBuilder, Validators} from '@angular/forms';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {LanguageService, LoginService} from '@ss/common/api-common';
import {BudgetTransferService} from '../budget-transfer.service';
import {BudgetPlanningService} from '@ss/budget/budget-planning';
import {BudgetService} from '@ss/budget/budget';

@Component({
    selector: 'ss-budget-transfer-detail',
    templateUrl: './budget-transfer-detail.component.html',
    styleUrls: ['./budget-transfer-detail.component.scss'],
})
export class BudgetTransferDetailComponent extends BaseEntityDetailComponent<BudgetTransfer> {
    private numberPipe: DecimalPipe = new DecimalPipe(this.langSrv.defaultLanguage);
    private planningInfo: PlanningInfo = null;
    public supplierLookup = new DefaultAutoCompleteModel<Agent>(this.supplierSrv, 'id', 'denomination');


    constructor(
        public override entitySrv: BudgetTransferService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override formBuilder: UntypedFormBuilder,
        public override confirmationSrv: ConfirmationDialogService,
        public supplierSrv: SupplierService,
        private activatedRoute: ActivatedRoute,
        private langSrv: LanguageService,
        private router: Router,
        private planningSrv: BudgetPlanningService,
        private budgetSrv: BudgetService,
        private loginSrv: LoginService) {
        super(entitySrv, shellSrv, snackBarSrv, route, formBuilder, confirmationSrv, 'BUD_TRANSFERS');
    }


    override finishLoading(e: BudgetTransfer) {
        this.entitySrv
            .getInfo(e.planningId || this.entitySrv.getParentId())
            .subscribe({
                next: res => {
                    this.planningInfo = res;
                    super.finishLoading(e);
                },
                error: e => super.finishLoading(e)
            });
    }

    public override setupForm(b: BudgetTransfer) {
        return this.formBuilder.group({
            id:          [b.id, Validators.required],
            description: [b.description, Validators.required],
            budgetId:    [b.budgetId || this.budgetSrv.budget?.id, Validators.required],
            planningId:  [b.planningId || this.entitySrv.getParentId(), Validators.required],
            transferDate:[b.transferDate, Validators.required],
            amount:      [b.amount, Validators.required],
            userId:      [b.userId || this.loginSrv.appCtx.id, Validators.required],
            decisionInfo:[b.decisionInfo],
            planning:    [{ value: this.numberPipe.transform(this.planningInfo?.amount||0, '1.2-2'), disabled: true}],
            complement:  [{ value: this.numberPipe.transform(this.planningInfo?.complement||0, '1.2-2'), disabled: true}],
            transfer:    [{ value: this.numberPipe.transform(this.planningInfo?.transfer||0, '1.2-2'), disabled: true}],
            commitment:  [{ value: this.numberPipe.transform(this.planningInfo?.commitment||0, '1.2-2'), disabled: true}],
            balance:     [{ value: this.numberPipe.transform(this.planningInfo?.balance||0, '1.2-2'), disabled: true}],
        });
    }

    override ngOnInit() {
        super.ngOnInit();
        if (this.entitySrv.getParentId() < 1) {
            this.router.navigate(['..'], {relativeTo: this.activatedRoute});
        }
    }
}
