import { Component, OnInit } from '@angular/core';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { CheckService, Check } from '@ss/treasury/api-checks';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { BaseEntityDetailComponent } from '@ss/common/ui-base-entity';
import { ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { HttpService } from '@ss/common/api-common';
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
        public checkSrv: CheckService,
        public agentSrv: AgentService,
        public shellSrv: ShellService,
        public snackBarSrv: SnackBarService,
        public route: ActivatedRoute,
        public formBuilder: FormBuilder,
        public confirmationSrv: ConfirmationDialogService,
        public httpSrv: HttpService,
        public router: Router) {
        super(checkSrv, shellSrv, snackBarSrv, route, formBuilder, confirmationSrv, 'TRS_EDIT_CHECKS');
        this.agentAutoCompleteModel = new AgentLookupModel(this.agentSrv);
    }

    finishLoading(e: Check) {
        super.finishLoading(e);
    }

    public setupForm(a: Check) {
        this.aid = a.id;
        return this.formBuilder.group({
            id: [a.id],
            number: [a.number, Validators.required],
            center: a.center,
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
            amount: [a.amount, Validators.required],
            mode: a.mode,
            canceled: a.canceled,
            memo: a.memo,
            bookId: a.bookId
        });
    }

}
