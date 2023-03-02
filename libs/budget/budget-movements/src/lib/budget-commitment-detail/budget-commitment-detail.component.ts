import { Component } from '@angular/core';
import {BaseEntityDetailComponent} from '@ss/common/ui-base-entity';
import {BudgetCommitment, PlanningInfo} from '../budget-movement-api';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute, Router} from '@angular/router';
import {UntypedFormBuilder, Validators} from '@angular/forms';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {BudgetCommitmentService} from '../budget-commitment.service';
import {DefaultAutoCompleteModel} from '@ss/common/ui-auto-complete';
import {Agent, SupplierService} from '@ss/logistics/api-agent';
import {DecimalPipe} from '@angular/common';
import {LanguageService} from '@ss/common/api-common';

@Component({
    selector: 'ss-budget-commitment-detail',
    templateUrl: './budget-commitment-detail.component.html',
    styleUrls: ['./budget-commitment-detail.component.scss'],
})
export class BudgetCommitmentDetailComponent extends BaseEntityDetailComponent<BudgetCommitment> {
    private numberPipe: DecimalPipe = new DecimalPipe(this.langSrv.defaultLanguage);
    private planningInfo: PlanningInfo = null;
    public supplierLookup = new DefaultAutoCompleteModel<Agent>(this.supplierSrv, 'id', 'denomination');


    constructor(
        public override entitySrv: BudgetCommitmentService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override formBuilder: UntypedFormBuilder,
        public override confirmationSrv: ConfirmationDialogService,
        public supplierSrv: SupplierService,
        private activatedRoute: ActivatedRoute,
        private langSrv: LanguageService,
        private router: Router) {
        super(entitySrv, shellSrv, snackBarSrv, route, formBuilder, confirmationSrv, 'BUD_COMMITMENTS');
    }


    override finishLoading(e: BudgetCommitment) {
        this.entitySrv
            .getInfo(e.parentId || this.entitySrv.getParentId())
            .subscribe({
                next: res => {
                    this.planningInfo = res;
                    super.finishLoading(e);
                },
                error: e => super.finishLoading(e)
            });
    }

    public override setupForm(b: BudgetCommitment) {
        return this.formBuilder.group({
            id:          [b.id, Validators.required],
            description: [b.description, Validators.required],
            parentId:    [b.parentId || this.entitySrv.getParentId(), Validators.required],
            date:        [b.date, Validators.required],
            amount:      [b.amount, Validators.required],
            decision:    [b.decision],
            orderNo:     [b.orderNo],
            supplier:    [b.supplier],
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
