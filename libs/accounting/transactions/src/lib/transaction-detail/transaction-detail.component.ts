import {Component, Output} from '@angular/core';
import {AccPoliciesService, ACCPolicy, ACCTransaction, AccTransactionService} from '@ss/accounting/accounting-api';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute, Router} from '@angular/router';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {Lookup, LookupsService} from '@ss/common/api-lookup';
import {LoginService} from '@ss/common/api-common';
import {Observable, of} from 'rxjs';
import {switchMap, tap} from 'rxjs/operators';
import {BaseEntityDetailComponent} from '@ss/common/ui-base-entity';
import {maxDate, minDate} from '@ss/common/ui-datepicker';

@Component({
  selector: 'ss-transaction-detail',
  templateUrl: './transaction-detail.component.html',
  styleUrls: ['./transaction-detail.component.scss']
})
export class TransactionDetailComponent extends BaseEntityDetailComponent<ACCTransaction> {
    minDate: Date = new Date();
    maxDate: Date = new Date();
    projects: Lookup[] = [];
    accPolicy: ACCPolicy = null;
    journalId = 0;

    constructor(
        private router: Router,
        public override entitySrv: AccTransactionService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override formBuilder: FormBuilder,
        public override confirmationSrv: ConfirmationDialogService,
        public lookupsSrv: LookupsService,
        private loginSrv: LoginService,
        private accPolicySrv: AccPoliciesService) {
        super(entitySrv,
            shellSrv,
            snackBarSrv,
            route,
            formBuilder,
            confirmationSrv,
            'ACC_TRANSACTIONS');
    }

    override ngOnInit() {
        super.ngOnInit();
        this.shellSrv.setGoBackFn(null);
    }

    override preload(): Observable<any> {
        this.journalId = +this.entitySrv.getParentId();
        return this.loginSrv.loadContext()
                .pipe(tap(_ => {
                        this.minDate = new Date(this.loginSrv.appCtx?.accYear, this.loginSrv.appCtx.accPeriod - 1, 1);
                        const nextMonth = new Date(this.loginSrv.appCtx.accYear, this.loginSrv.appCtx.accPeriod, 1);
                        this.maxDate = nextMonth;
                        this.maxDate.setDate(0);
                    }),
                    switchMap(_ => this.accPolicySrv.get(this.loginSrv.appCtx.center)),
                    tap(res => this.accPolicy = res),
                    switchMap(_ => this.entitySrv.getProjects()),
                    tap(res => this.projects = res));
    }

    setupForm(e: ACCTransaction): FormGroup {
        e.journalno = e.journalno || this.journalId;
        e.fileId = e.fileId || this.loginSrv.appCtx?.accFile;
        e.id = e.fileId * 10000 + (e.oid || 0);
        return this.formBuilder.group({
            id: [e.id],
            oid: [e.oid || 0],
            pieceDate: [e.pieceDate, [Validators.required, maxDate(this.maxDate), minDate(this.minDate)]],
            pieceNo: [e.pieceNo || 0, Validators.required],
            folio: [e.folio],
            projectId: [e.projectId],
            piecemonth: [e.pieceMonth || this.loginSrv.appCtx.accPeriod],
            journalno: [e.journalno || this.journalId],
            isBudget: [e.isBudget],
            fileId: [e.fileId],
        });
    }


    cancel() {
        this.router.navigate(['/app/accounting/transactions']).then();
    }

    protected override goBack() {
        this.cancel();
    }
}
