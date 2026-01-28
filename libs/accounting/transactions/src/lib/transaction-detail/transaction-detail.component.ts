import { Component, computed, HostListener, inject, OnDestroy, OnInit, signal } from '@angular/core';
import {
    AccFileService,
    AccPoliciesService,
    ACCPolicy,
    ACCTransaction, AccTransactionLineService,
    AccTransactionService
} from '@ss/accounting/accounting-api';
import { ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import {SnackBarService} from '@ss/common/ui-shell';
import { ActivatedRoute, Router, RouterEvent, RouterModule } from '@angular/router';
import { ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import {Lookup} from '@ss/common/api-lookup';
import { LoginService, MaterialModule } from '@ss/common/api-common';
import { filter, Observable, of, Subscription } from 'rxjs';
import {switchMap, tap} from 'rxjs/operators';
import { DatePickerComponent, maxDate, minDate } from '@ss/common/ui-datepicker';
import { ACC_TRANSACTION_ARCHIVES } from '@ss/common/app-archive';
import { CommonModule } from '@angular/common';
import { TranslateDirective, TranslatePipe } from '@ss/common/ui-lang';


@Component({
    selector: 'ss-transaction-detail',
    templateUrl: './transaction-detail.component.html',
    styleUrls: ['./transaction-detail.component.scss'],
    standalone: true,
    imports: [
        CommonModule,
        RouterModule,
        MaterialModule,
        ReactiveFormsModule,
        DatePickerComponent,
        TranslatePipe,
        TranslateDirective
    ]
})
export class TransactionDetailComponent implements OnInit, OnDestroy {
    private router = inject( Router);
    private entitySrv = inject(AccTransactionService);
    private snackBarSrv = inject(SnackBarService);
    private route = inject(ActivatedRoute);
    private formBuilder = inject(UntypedFormBuilder);
    private confirmationSrv = inject(ConfirmationDialogService);
    private loginSrv = inject(LoginService);
    private detailSrv = inject(AccTransactionLineService);
    private accPolicySrv = inject( AccPoliciesService) ;
    private fileSrv = inject(AccFileService);
    private subscriptions: Subscription[] = [];
    protected readonly ACC_TRANSACTION_ARCHIVES = ACC_TRANSACTION_ARCHIVES;

    readonly isClosed = signal<boolean>(this.fileSrv.accFile.closed);
    isOnEdit = signal(false);
    form: UntypedFormGroup = null;
    id = 0;
    isEmpty = false;
    minDate: Date = new Date();
    maxDate: Date = new Date();
    projects: Lookup[] = [];
    accPolicy: ACCPolicy = null;
    journalId = 0;

    debit = computed(() => this.entitySrv.selectedTransaction()?.debit||0);
    credit = computed(() => this.entitySrv.selectedTransaction()?.credit||0);
    debitBalance = computed(() => this.debit() > this.credit() ? this.debit() - this.credit() : 0);
    creditBalance = computed(() => this.debit() > this.credit() ? 0.0 : this.credit() - this.debit());
    warning = computed(() => Math.abs(this.debit() - this.credit()) >= 0.01);

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
                        pieceMonth: 1,
                        journalno: this.journalId,
                        pieceNo: 1,
                        isBudget: false})))
            .subscribe(ent => this.setupForm(ent));

        this.subscriptions.push(
            this.router.events.pipe(
                filter((e: any): e is RouterEvent => e instanceof RouterEvent)
            ).subscribe((e: RouterEvent) => {
                this.isOnEdit.set(e.url.indexOf('/detail/') > 1);
            }));
    }
    // @HostListener('document:keydown', ['$event'])
    // handleKeyboardEvent(event: KeyboardEvent) {
    //     if (!this.isOnEdit) {
    //         if (event.altKey && event.key === 's') {
    //             this.save();
    //             event.preventDefault();
    //         } else if (event.altKey && event.key === 'c') {
    //             this.cancel();
    //             event.preventDefault();
    //         }
    //     }
    // }

    preload(): Observable<any> {
        this.journalId = this.entitySrv.getParentId();
        return this.loginSrv.loadContext()
            .pipe(tap(() => {
                this.minDate = new Date(this.loginSrv.appCtx?.accYear, this.loginSrv.appCtx.accPeriod - 1, 1);
                const nextMonth = new Date(this.loginSrv.appCtx.accYear, this.loginSrv.appCtx.accPeriod, 1);
                this.maxDate = nextMonth;
                this.maxDate.setDate(0);
            }),
            switchMap(() => this.accPolicySrv.get(this.loginSrv.appCtx.center)),
            tap(res => this.accPolicy = res),
            switchMap(() => this.entitySrv.getProjects()),
            tap(res => this.projects = res));
    }

    private setupForm(e: ACCTransaction) {
        e.fileId = e.fileId || this.loginSrv.appCtx?.accFile;
        if (e.id === 0) {
            this.entitySrv.select(null);
        }
        this.isEmpty = e.debit < 0.001 && e.credit < 0.001;
        this.detailSrv.setParentId(e.id||0);
        this.form = this.formBuilder.group({
            id:         [e.id],
            oid:        [e.oid || 0],
            pieceDate:  [e.pieceDate || this.maxDate, [Validators.required, maxDate(this.maxDate), minDate(this.minDate)]],
            pieceNo:    [{ value: e.pieceNo || 1, disabled: !this.accPolicy.manualNumbering }],
            folio:      [e.folio],
            projectId:  [e.projectId],
            piecemonth: [e.pieceMonth || this.loginSrv.appCtx.accPeriod],
            journalno:  [+e.journalno],
            isBudget:   [e.isBudget || false, Validators.required],
            fileId:     [e.fileId],
        });
    }

    cancel() {
        this.router.navigate(['/app/accounting/transactions']).then();
    }

    save() {
        const id = this.form.getRawValue().id;
        this.entitySrv
            .save(this.form.getRawValue())
            .subscribe(res => {
                if (res) {
                    this.snackBarSrv.showSuccessMessage();
                    if (id > 0) {
                        this.cancel();
                    } else {
                        this.router.navigate([`/app/accounting/transactions/${res}/detail`]).then();
                    }
                }
            });
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
        if (this.form != null && this.form.touched && !this.isClosed()) {
            return this.confirmationSrv.confirmDontSave();
        }
        return of(true);
    }

}
