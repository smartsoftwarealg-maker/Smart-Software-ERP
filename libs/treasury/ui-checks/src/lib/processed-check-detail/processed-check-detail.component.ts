import { Component, OnInit } from '@angular/core';
import {BaseEntityDetailComponent} from '@ss/common/ui-base-entity';
import {ProcessedCheck, ProcessedCheckService} from '@ss/treasury/api-checks';
import {HttpService, LoginService} from '@ss/common/api-common';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, Validators} from '@angular/forms';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {BankService} from '@ss/administration/api-bank';
import {DefaultAutoCompleteModel} from '@ss/common/ui-auto-complete';

@Component({
    selector: 'ss-processed-check-detail',
    templateUrl: './processed-check-detail.component.html',
    styleUrls: ['./processed-check-detail.component.scss'],
})
export class ProcessedCheckDetailComponent extends BaseEntityDetailComponent<ProcessedCheck> implements OnInit {
    aid = 0;
    bankLookUp = new DefaultAutoCompleteModel(this.bankSrv);

    constructor(
        private loginSrv: LoginService,
        private bankSrv:  BankService,
        public checkSrv: ProcessedCheckService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override formBuilder: FormBuilder,
        public override confirmationSrv: ConfirmationDialogService,
        public httpSrv: HttpService,
        public router: Router) {
        super(checkSrv, shellSrv, snackBarSrv, route, formBuilder, confirmationSrv, 'TRS_CHECKS');
    }


    public override setupForm(a: ProcessedCheck) {
        this.aid = a.id;
        return this.formBuilder.group({
            id:        [a.id],
            company:   [a.company || this.loginSrv.appCtx.center],
            number:    [a.number, Validators.required],
            checkDate: [a.checkDate, Validators.required],
            amount:    [a.amount, Validators.required],
            bankId:    [a.bankId, Validators.required],
        });
    }


    override readForm(): ProcessedCheck {
        const check = this.form.getRawValue();
        check.company = this.loginSrv.appCtx.center;
        return check;
    }
}
