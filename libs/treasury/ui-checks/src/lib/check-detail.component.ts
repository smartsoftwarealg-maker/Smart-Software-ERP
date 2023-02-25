import { Component, OnInit } from '@angular/core';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { CheckService, Check } from '@ss/treasury/api-checks';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { BaseEntityDetailComponent } from '@ss/common/ui-base-entity';
import { ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { HttpService, LoginService } from '@ss/common/api-common';
import { AgentLookupModel, AgentService } from '@ss/logistics/api-agent';

@Component({
    selector: 'ss-check-detail',
    styleUrls: ['./check-detail.component.scss'],
    templateUrl: './check-detail.component.html'
})
export class CheckDetailComponent extends BaseEntityDetailComponent<Check> implements OnInit {

    public agentAutoCompleteModel: AgentLookupModel;
    aid = 0;

    constructor(
        private agentSrv: AgentService,
        public checkSrv: CheckService,
        private loginSrv: LoginService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override formBuilder: FormBuilder,
        public override confirmationSrv: ConfirmationDialogService,
        public httpSrv: HttpService,
        public  router: Router) {
        super(checkSrv, shellSrv, snackBarSrv, route, formBuilder, confirmationSrv, 'TRS_CHECKS');
        this.agentAutoCompleteModel = new AgentLookupModel(this.agentSrv);
    }

    override finishLoading(e: Check) {
        super.finishLoading(e);
    }

    public override setupForm(a: Check) {
        this.aid = a.id;
        return this.formBuilder.group({
            id: [a.id],
            number: [a.number, Validators.required],
            center: a.center || this.loginSrv.appCtx.center,
            bankId: [a.bankId],
            bank: a.bank,
            deposited: a.deposited,
            depositDate: a.depositDate,
            depositNumber: a.depositNumber,
            processDate: a.processDate,
            description: a.description,
            date: [a.date, Validators.required],
            due_days: [a.due_days, Validators.required],
            agent: [a.agent, Validators.required],
            debit: [{value: Math.max(a.amount, 0), disabled: this.form?.controls['credit'].value > 0}, Validators.required],
            credit: [{value: Math.max(-a.amount, 0), disabled: this.form?.controls['debit'].value > 0}, Validators.required],
            mode: [a.mode || 2],
            canceled: a.canceled,
            memo: a.memo,
            bookId: a.bookId // todo: add this to detail
        });
    }

    onAmount() {
        const debit = +this.form.value['debit'] || 0;
        const credit = +this.form.value['credit'] || 0;
        this.form.controls['debit'].enable({ onlySelf: true });
        this.form.controls['credit'].enable({ onlySelf: true });
        if (debit - credit > 0.0) {
            this.form.controls['debit'].enable({ onlySelf: true });
            this.form.controls['credit'].disable({ onlySelf: true });
        } else if (debit - credit < 0) {
            this.form.controls['credit'].enable({ onlySelf: true });
            this.form.controls['debit'].disable({ onlySelf: true });
        }
    }

    override readForm(): Check {
        const check = this.form.getRawValue();
        check.amount = (this.form.controls['debit'].value || 0) - (this.form.controls['credit'].value ||0);
        return check;
    }
}
