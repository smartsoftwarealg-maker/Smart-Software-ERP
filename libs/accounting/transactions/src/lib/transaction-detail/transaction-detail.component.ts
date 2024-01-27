import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import {
    AccFileService,
    AccPoliciesService,
    ACCPolicy,
    ACCTransaction, AccTransactionLineService,
    AccTransactionService,
    SCALE
} from '@ss/accounting/accounting-api';
import { ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from "@angular/forms";
import {SnackBarService} from '@ss/common/ui-shell';
import { ActivatedRoute, Router, RouterEvent, RouterModule } from "@angular/router";
import { CommonUiConfirmationDialogModule, ConfirmationDialogService } from "@ss/common/ui-confirmation-dialog";
import {Lookup, LookupsService} from '@ss/common/api-lookup';
import { LoginService, MaterialModule } from "@ss/common/api-common";
import { filter, Observable, of, Subscription } from 'rxjs';
import {switchMap, tap} from 'rxjs/operators';
import { CommonUiDatepickerModule, maxDate, minDate } from "@ss/common/ui-datepicker";
import { ACC_TRANSACTION_ARCHIVES, AppArchiveModule } from "@ss/common/app-archive";
import { CommonModule } from "@angular/common";
import { CommonUiLangModule } from "@ss/common/ui-lang";
import { UiPaginationModule } from "@ss/common/ui-pagination";

import { CommonUiAutoCompleteModule } from "@ss/common/ui-auto-complete";

@Component({
    selector: 'ss-transaction-detail',
    templateUrl: './transaction-detail.component.html',
    styleUrls: ['./transaction-detail.component.scss'],
    standalone: true,
    imports: [
        CommonModule,
        RouterModule,
        MaterialModule,
        CommonUiLangModule,
        UiPaginationModule,
        ReactiveFormsModule,

        CommonUiAutoCompleteModule,
        CommonUiDatepickerModule,
        CommonUiConfirmationDialogModule,
        AppArchiveModule
    ],
})
export class TransactionDetailComponent implements OnInit, OnDestroy {
    private fileSrv = inject(AccFileService);
    private subscriptions: Subscription[] = [];
    readonly isClosed = this.fileSrv.accFile.closed;
    protected readonly ACC_TRANSACTION_ARCHIVES = ACC_TRANSACTION_ARCHIVES;
    isOnEdit = false;
    form: UntypedFormGroup = null;
    id = 0;
    isEmpty = false;
    minDate: Date = new Date();
    maxDate: Date = new Date();
    projects: Lookup[] = [];
    accPolicy: ACCPolicy = null;
    journalId = 0;

    constructor(
        private router: Router,
        public entitySrv: AccTransactionService,
        public snackBarSrv: SnackBarService,
        public route: ActivatedRoute,
        public formBuilder: UntypedFormBuilder,
        public confirmationSrv: ConfirmationDialogService,
        public lookupsSrv: LookupsService,
        private loginSrv: LoginService,
        public detailSrv: AccTransactionLineService,
        private accPolicySrv: AccPoliciesService) {
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach(s => s.unsubscribe());
    }

    ngOnInit() {
        this.route
            .params
            .pipe(tap(params => this.id = +params['id']),
                switchMap(_ => this.preload()),
                switchMap(_ => this.id > 0? this.entitySrv.get(this.id) :
                    of({
                        id: 0,
                        fileId: this.fileSrv.accFile.id,
                        oid: 0,
                        pieceMonth: 0,
                        journalno: this.journalId,
                        pieceNo: 0,
                        isBudget: false})))
            .subscribe(ent => this.setupForm(ent));

        this.subscriptions.push(
            this.router.events.pipe(
                filter((e: any): e is RouterEvent => e instanceof RouterEvent)
            ).subscribe((e: RouterEvent) => {
                this.isOnEdit = e.url.indexOf('/detail/') > 1;
            }));
    }

    preload(): Observable<any> {
        this.journalId = this.entitySrv.getParentId();
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

    setupForm(e: ACCTransaction) {
        e.fileId = e.fileId || this.loginSrv.appCtx?.accFile;
        e.id = e.oid? e.fileId * SCALE + (e.oid || 0) : 0;
        this.isEmpty = e.debit < 0.001 && e.credit < 0.001;
        this.form = this.formBuilder.group({
            id:         [e.id],
            oid:        [e.oid || 0],
            pieceDate:  [e.pieceDate || this.maxDate, [Validators.required, maxDate(this.maxDate), minDate(this.minDate)]],
            pieceNo:    [ { value: e.pieceNo || 0, disabled: !this.accPolicy.manualNumbering }, Validators.required],
            folio:      [e.folio],
            projectId:  [e.projectId],
            piecemonth: [e.pieceMonth || this.loginSrv.appCtx.accPeriod],
            journalno:  [+e.journalno],
            isBudget:   [e.isBudget || !e.id, Validators.required],
            fileId:     [e.fileId],
        });
    }


    cancel() {
        this.router.navigate(['/app/accounting/transactions']).then();
    }

    save() {
        this.entitySrv
            .save(this.form.getRawValue())
            .subscribe(res => {
                if (res) {
                    this.snackBarSrv.showSuccessMessage();
                    const value = this.form.getRawValue();
                    if (value.id) {
                        this.form.reset(value);
                    } else {
                        this.router.navigate(['/app/accounting/transactions', res]).then();
                    }
                }
            });
    }
    protected goBack() {
        // this.cancel();
    }

    public deleteSelected(): void {
        this.confirmationSrv
            .confirmDelete()
            .pipe(switchMap(b => b ? this.entitySrv.remove(this.id) : of(b)))
            .subscribe({
                next: res => {
                    if (typeof res === 'object') {
                        this.cancel();
                        this.snackBarSrv.showSuccessMessage();
                    }
                },
                error: err => {
                    this.snackBarSrv.showFailureMessage();
                    throw err;
                }
            });
    }

    public canDeactivate(): Observable<boolean> {
        if (this.form != null && this.form.touched) {
            return this.confirmationSrv.confirmDontSave();
        }
        return of(true);
    }

}
