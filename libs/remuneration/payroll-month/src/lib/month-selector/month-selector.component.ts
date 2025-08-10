import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators, FormsModule, ReactiveFormsModule } from "@angular/forms";
import {PayrollMonthService} from '../payroll-month.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {of, switchMap, tap, zip} from 'rxjs';
import {Special, SpecialPayrollService} from '@ss/remuneration/special-payroll-common';
import {LanguageService} from '@ss/common/api-common';
import { MatCard, MatCardContent } from '@angular/material/card';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { TranslateDirective } from '@ss/common/ui-lang';
import { MatInput } from '@angular/material/input';
import { MatSelect } from '@angular/material/select';
import { MatOption } from '@angular/material/core';
import { MatButton } from '@angular/material/button';
import { MatProgressBar } from '@angular/material/progress-bar';
import { TranslatePipe } from '@ss/common/ui-lang';

@Component({
    selector: 'ss-month-selector',
    templateUrl: './month-selector.component.html',
    styleUrls: ['./month-selector.component.scss'],
    standalone: true,
    imports: [ MatCard, MatCardContent, FormsModule, ReactiveFormsModule, MatFormField, MatLabel, TranslateDirective, MatInput, MatSelect, MatOption, MatButton, MatProgressBar, TranslatePipe]
})
export class MonthSelectorComponent implements OnInit {
    private selectorSrv  = inject(PayrollMonthService);
    private formBuilder  = inject(UntypedFormBuilder);
    private router  = inject(Router);
    private activatedRoute  = inject(ActivatedRoute);
    private snackBarSrv  = inject(SnackBarService);
    private specialSrv  = inject(SpecialPayrollService);
    private langSrv  = inject(LanguageService);
    private shellSrv  = inject(ShellService);

    specialList: Special[] = [];
    minMonth = signal(0);
    maxMonth = signal(0);
    minMM = computed(() => this.minMonth() % 100);
    minYY = computed(() => +((this.minMonth() / 100).toFixed(0)));
    maxMM = computed(() => this.maxMonth() % 100);
    maxYY = computed(() => +((this.maxMonth() / 100).toFixed(0)));

    form: UntypedFormGroup | null = null;
    processing = false;

    ngOnInit(): void {
        this.shellSrv.setLoading(true);
        this.shellSrv.setTitle('REMUN_MONTH_SELECTION')
        zip(this.selectorSrv.minMonth(),
            this.selectorSrv.maxMonth(),
            this.selectorSrv.ctx(),
            this.specialSrv.getList(0, 50))
            .subscribe({
                next: res => {
                    this.minMonth.set(res[0].month);
                    this.maxMonth.set(res[1].month);
                    const min = +(res[0].month / 100).toFixed(0);
                    const max = +(res[1].month / 100).toFixed(0);
                    const curYear = (+((res[2].payMonth || this.maxMonth()) / 100) % 10000).toFixed(0);
                    const curMonth = +((res[2].payMonth || this.maxMonth()) % 100).toFixed(0);
                    this.specialList = res[3].body;
                    this.specialList.push({
                        id: 0,
                        center: 0,
                        paymonth: res[2].payMonth % 1_000_000,
                        description: this.langSrv.translate("REMUN_NORMAL_PAY")
                    });
                    this.form = this.formBuilder
                        .group({
                            year: [curYear, [Validators.required, Validators.min(min), Validators.max(max)]],
                            month: [curMonth, [Validators.required, Validators.min(1), Validators.max(12)]],
                            offset: [res[2].payMonth, Validators.required]
                        });
                    this.shellSrv.setLoading(false);
                }, error: err => {
                    this.shellSrv.setLoading(false);
                    throw err;
                }
            });
    }

    cancel() {
        this.router.navigate(['../'], { relativeTo: this.activatedRoute }).then();
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
        if (normalMonth >= this.minMonth() && normalMonth <= this.maxMonth()) {
            this.selectorSrv
                .selectMonth(payMonth)
                .pipe(switchMap(_ => this.selectorSrv.curMonthLabel()),
                    tap(title => this.shellSrv.setLabels([title])),
                    switchMap(_ => loadSpecial? this.specialSrv.getList(0, 50): of(0)))
                .subscribe({
                    next: res => {
                        if (!loadSpecial) {
                            this.snackBarSrv.showSuccessMessage();
                            this.router.navigate(['../'], {relativeTo: this.activatedRoute}).then();
                        } else {
                            if (typeof res !== 'number') {
                                this.specialList = res.body;
                                this.specialList.push({ id: 0, center: 0, paymonth: payMonth, description: this.langSrv.translate('REMUN_NORMAL_PAY')});
                            }
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
}
