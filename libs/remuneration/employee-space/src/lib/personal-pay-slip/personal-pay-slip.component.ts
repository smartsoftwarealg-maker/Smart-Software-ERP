import { Component, inject, OnInit } from '@angular/core';
import { ElementsEntryService, PaymentElement } from '@ss/remuneration/elements-entry';
import { FormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { of, switchMap, tap, zip } from 'rxjs';
import { PayrollMonthService } from '@ss/remuneration/payroll-month';
import { Special, SpecialPayrollService } from '@ss/remuneration/special-payroll-common';
import { LanguageService, LoginService } from '@ss/common/api-common';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'ss-personal-pay-slip',
    templateUrl: './personal-pay-slip.component.html',
    styleUrls: ['./personal-pay-slip.component.scss'],
})
export class PersonalPaySlipComponent implements OnInit {
    private route = inject(ActivatedRoute);
    private loginSrv = inject(LoginService);
    private shellSrv = inject(ShellService);
    private snackBarSrv =  inject(SnackBarService);
    private langSrv = inject(LanguageService);
    private specialSrv =  inject(SpecialPayrollService);
    private infoSrv = inject(ElementsEntryService);
    private formBuilder = inject(FormBuilder);
    private selectorSrv =  inject(PayrollMonthService);

    processing = false;
    minMonth = 0;
    maxMonth = 0;
    specialList: Special[] = [];
    form: UntypedFormGroup = null;

    paySlip: PaymentElement[] = [];
    slipColumns      = ['description', 'base', 'rate', 'gain', 'deduction'];

    ngOnInit() {
        this.shellSrv.setGoBackPath('../..', this.route);
        zip(this.selectorSrv.minMonth(),
            this.selectorSrv.maxMonth(),
            this.selectorSrv.ctx(),
            this.specialSrv.getList(0, 50))
            .subscribe(res => {
                this.minMonth  = res[0].month;
                this.maxMonth  = res[1].month;
                const min      = +(res[0].month / 100).toFixed(0);
                const max      = +(res[1].month / 100).toFixed(0);
                const curYear  = (+( (res[2].payMonth || this.maxMonth) / 100) % 10000).toFixed(0);
                const curMonth = +( (res[2].payMonth || this.maxMonth) % 100).toFixed(0);
                this.specialList = res[3].body;
                this.specialList.push({ id: 0, center: 0, paymonth: res[2].payMonth % 1_000_000, description: this.langSrv.translate('REMUN_NORMAL_PAY')});
                console.log(min, max);
                this.form = this.formBuilder
                    .group({
                        year: [curYear, [Validators.required, Validators.min(min), Validators.max(max)]],
                        month: [curMonth, [Validators.required, Validators.min(1), Validators.max(12)]],
                        offset: [res[2].payMonth, Validators.required]
                    });
                this.form
                    .valueChanges
                    .pipe(
                        debounceTime(300),
                        distinctUntilChanged()
                    ).subscribe(value => {
                        this.loadPaySlip();
                    });

            });
    }

    select(loadSpecial: boolean) {
        const year  = this.form.controls['year'].value;
        const month = this.form.controls['month'].value;
        let special = this.form.controls['offset'].value;
        if (special % 1_000_000 != year * 100 + month) {
            special = 0;
        }
        const payMonth = special && special > 0? special: year * 100 + month;
        const normalMonth = payMonth % 1000000;
        if (normalMonth >= this.minMonth && normalMonth <= this.maxMonth) {
            this.selectorSrv
                .selectMonth(payMonth)
                .pipe(switchMap(_ => this.selectorSrv.curMonthLabel()),
                    tap(title => this.shellSrv.setLabels([title])),
                    switchMap(_ => loadSpecial? this.specialSrv.getList(0, 50): of(0)))
                .subscribe({
                    next: res => {
                        if (typeof res !== 'number') {
                            this.specialList = res.body;
                            this.specialList.push({
                                id: 0,
                                center: 0,
                                paymonth: payMonth,
                                description: this.langSrv.translate('REMUN_NORMAL_PAY')
                            });
                        }
                        this.processing = false;
                    },
                    error: err => {
                        this.processing = false;
                        throw err;
                    }
                }
                );
        } else
            this.snackBarSrv.showFailureMessage();
    }

    private loadPaySlip() {
        const value = this.form.getRawValue();
        const payMonth = value['year'] * 100 + value['month'];

        this.selectorSrv
            .selectMonth(payMonth)
            .pipe(switchMap(_ => this.infoSrv.getSlip(this.loginSrv.appCtx.personId)))
            .subscribe(res => {
                this.paySlip = res || [];
            });
    }
}
