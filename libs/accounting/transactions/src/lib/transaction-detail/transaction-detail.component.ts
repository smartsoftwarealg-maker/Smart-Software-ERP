import { Component, OnInit } from '@angular/core';
import {BaseEntityDetailComponent} from '@ss/common/ui-base-entity';
import {ACCTransaction, AccTransactionService} from '@ss/accounting/accounting-api';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute} from '@angular/router';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {LookupsService} from '@ss/common/api-lookup';
import {LoginService} from '@ss/common/api-common';

@Component({
  selector: 'ss-transaction-detail',
  templateUrl: './transaction-detail.component.html',
  styleUrls: ['./transaction-detail.component.scss']
})
export class TransactionDetailComponent extends BaseEntityDetailComponent<ACCTransaction> {
    constructor(
        public override entitySrv: AccTransactionService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override formBuilder: FormBuilder,
        public override confirmationSrv: ConfirmationDialogService,
        public lookupsSrv: LookupsService,
        private loginSrv: LoginService) {
        super(entitySrv, shellSrv, snackBarSrv, route, formBuilder, confirmationSrv, 'ADMINISTRATION_EDIT_BANK');
        console.log('*********************************************************detail')
    }

    setupForm(e: ACCTransaction): FormGroup {
        return this.formBuilder.group({
            id: [e.id],
            oid: [e.oid],
            piecedate: [e.piecedate, Validators.required],
            pieceno: [e.pieceno, Validators.required],
            folio: [e.folio],
            piecemonth: [e.piecemonth],
            journalno: [e.journalno],
            fileId: [e.fileId || this.loginSrv.appCtx.accYear]
        });
    }
}
