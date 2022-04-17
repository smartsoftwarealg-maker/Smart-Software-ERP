import {Component} from '@angular/core';
import {ACCTransaction, AccTransactionService} from '@ss/accounting/accounting-api';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute} from '@angular/router';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {LookupsService} from '@ss/common/api-lookup';
import {LoginService} from '@ss/common/api-common';
import {Observable, of} from 'rxjs';
import {switchMap, tap} from 'rxjs/operators';

@Component({
  selector: 'ss-transaction-detail',
  templateUrl: './transaction-detail.component.html',
  styleUrls: ['./transaction-detail.component.scss']
})
export class TransactionDetailComponent  {
    public form: FormGroup = null;
    id = 0;

    constructor(
        public entitySrv: AccTransactionService,
        public shellSrv: ShellService,
        public snackBarSrv: SnackBarService,
        public route: ActivatedRoute,
        public formBuilder: FormBuilder,
        public confirmationSrv: ConfirmationDialogService,
        public lookupsSrv: LookupsService,
        private loginSrv: LoginService) {  }

    setupForm(e: ACCTransaction): FormGroup {
        return this.formBuilder.group({
            id: [e.fileId * 10000 + e.oid || 0],
            oid: [e.oid],
            piecedate: [e.piecedate, Validators.required],
            pieceno: [e.pieceno, Validators.required],
            folio: [e.folio],
            piecemonth: [e.piecemonth],
            journalno: [e.journalno],
            isBudget: [e.isBudget],
            fileId: [e.fileId || this.loginSrv.appCtx?.accYear],
        });
    }

     ngOnInit() {
        this.loginSrv.loadContext();
         this.shellSrv.setGoBackPath('..', this.route);
         this.load();
    }

    public loadEntity(id: number): Observable<ACCTransaction> {
        if (id == null) {
            this.shellSrv.goBack();
            return of(null);
        }
        if (id === 0) {
            const a: any = {
                id: 0
            };
            return of(a);
        }
        return this.entitySrv.get(id);
    }

    public finishLoading(e: ACCTransaction) {
        this.shellSrv.setLoading(false);
        this.form = this.setupForm(e);
    }

    public load() {
        this.shellSrv.setLoading(true);
        this.route.params
            .pipe(
                switchMap(p => {
                    this.id = +p['id'];
                    return this.loadEntity(this.id || 0);
                })
            ).subscribe({
            next: entity => {
                if (entity) {
                    this.finishLoading(entity);
                }
            },
            error: error => {
                this.shellSrv.showRetry(() => this.load());
                throw error;
            }
        });
    }

    cancel() {
        this.shellSrv.goBack();
    }

    save() {
        const val = this.form.value;
        console.log(this.entitySrv.getParentId(), val.journalno, this.entitySrv.getParentId() == +val.journalno)
        if (this.entitySrv.getParentId() == +val.journalno) {
            val.id = this.id;
            let obs: Observable<any> = val.id === 0
                ? this.entitySrv.add(val).pipe(tap(i => {
                    this.id = i;
                    val.id = i;
                }))
                : this.entitySrv.update(val);
            obs.subscribe({
                next: () => {
                    this.form.markAsUntouched();
                    this.snackBarSrv.showSuccessMessage();
                    this.shellSrv.goBack();
                },
                error: err => {
                    this.snackBarSrv.showFailureMessage();
                    throw err;
                }
            })
        } else {
            this.snackBarSrv.showFailureMessage('COMMON_INVALID_SELECTION');
        }
    }
}
