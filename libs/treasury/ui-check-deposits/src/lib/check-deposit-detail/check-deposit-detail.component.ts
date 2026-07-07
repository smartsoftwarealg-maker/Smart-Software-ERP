import { Component, inject, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { CheckDepositService, CheckDeposit, CheckDepositLineService } from '@ss/treasury/api-check-deposits';
import { ActivatedRoute, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BaseEntityDetailComponent } from '@ss/common/ui-base-entity';
import { ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { LoginService, MaterialModule } from '@ss/common/api-common';
import { Observable, of } from 'rxjs';
import { filter, switchMap, tap } from 'rxjs/operators';
import { LookupsService, Bank } from '@ss/common/api-lookup';
import { MatCard } from '@angular/material/card';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { TranslateDirective } from '@ss/common/ui-lang';
import { MatSelect } from '@angular/material/select';
import { MatOption } from '@angular/material/core';
import { MatInput } from '@angular/material/input';
import { DatePickerComponent } from '@ss/common/ui-datepicker';

@Component({
    selector: 'ss-check-deposit-detail',
    styleUrls: ['./check-deposit-detail.component.scss'],
    templateUrl: './check-deposit-detail.component.html',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [
        MaterialModule, MatCard, FormsModule, ReactiveFormsModule,
        MatFormField, MatLabel, TranslateDirective, MatSelect, MatOption, MatInput,
        DatePickerComponent, RouterOutlet
    ]
})
export class CheckDepositDetailComponent extends BaseEntityDetailComponent<CheckDeposit> implements OnInit {
    private lineSrv = inject(CheckDepositLineService);

    banks: Bank[];
    hasLines = false;

    constructor(
        public checkDepositSrv: CheckDepositService,
        public lookupsSrv: LookupsService,
        private loginSrv: LoginService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override formBuilder: FormBuilder,
        public override confirmationSrv: ConfirmationDialogService,
        private router: Router) {
        super(checkDepositSrv, shellSrv, snackBarSrv, route, formBuilder, confirmationSrv, 'TRS_CHECK_DEPOSITS');
    }

    override ngOnInit() {
        this.subscriptions.push(
            this.router
                .events
                .pipe(filter(event => event instanceof NavigationEnd))
                .subscribe(event => {
                    if (event instanceof NavigationEnd) {
                        this.saveButton.visible = event.url.indexOf('/lines/') < 0;
                        if (event.url.indexOf('/lines/') < 0) {
                            this.refreshHasLines();
                        }
                    }
                }));
        this.subscriptions.push(
            this.lineSrv.changed$.subscribe(() => this.refreshHasLines()));
        super.ngOnInit();
    }

    public override preload(): Observable<any> {
        const id = +this.route.snapshot.paramMap.get('id') || 0;
        this.lineSrv.setParentId(id);
        return this.lookupsSrv.getBanks()
            .pipe(
                tap(x => { this.banks = x; }),
                switchMap(() => id > 0 ? this.lineSrv.getList(0, 1) : of({ itemCount: 0, body: [] })),
                tap(res => { this.hasLines = res.itemCount > 0; })
            );
    }

    private refreshHasLines() {
        if (!this.queryId) {
            return;
        }
        this.lineSrv.getList(0, 1).subscribe(res => {
            this.hasLines = res.itemCount > 0;
            if (this.hasLines) {
                this.form?.controls['bankId'].disable();
            } else {
                this.form?.controls['bankId'].enable();
            }
            this.cdr.markForCheck();
        });
    }

    public override setupForm(a: CheckDeposit) {
        if (!a.id || !a.centerId) {
            a.centerId = this.loginSrv.appCtx.center;
        }
        return this.formBuilder.group({
            id:             [a.id],
            centerId:       [a.centerId || this.loginSrv.appCtx.center, Validators.required],
            bankId:         [{ value: a.bankId, disabled: this.hasLines }, Validators.required],
            depositNumber:  [a.depositNumber],
            depositDate:    [a.depositDate || new Date(), Validators.required],
            description:    [a.description],
            createdBy:      [a.createdBy || this.loginSrv.appCtx.id],
            createdAt:      [{ value: a.createdAt, disabled: true }],
            creatorName:    [{ value: a.creatorName, disabled: true }],
            updatedAt:      [{ value: a.updatedAt, disabled: true }],
            updaterName:    [{ value: a.updaterName, disabled: true }]
        });
    }
}
