import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {PayrollMonthService} from '../payroll-month.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {of, switchMap, tap, zip} from 'rxjs';
import {Special, SpecialPayrollService} from '@ss/remuneration/special-payroll-common';
import {LanguageService} from '@ss/common/api-common';

@Component({
  selector: 'ss-month-selector',
  templateUrl: './month-selector.component.html',
  styleUrls: ['./month-selector.component.scss']
})
export class MonthSelectorComponent implements OnInit {
    specialList: Special[] = [];
    private minMonth = 0;
    private maxMonth = 0;
    form: FormGroup = null;
    processing = false;

    constructor(private selectorSrv: PayrollMonthService,
                private formBuilder: FormBuilder,
                private router: Router,
                private activatedRoute: ActivatedRoute,
                private confirmationSrv: ConfirmationDialogService,
                private snackBarSrv: SnackBarService,
                private specialSrv: SpecialPayrollService,
                private langSrv: LanguageService,
                private shellSrv: ShellService) {
    }

    ngOnInit(): void {
        zip(this.selectorSrv.minMonth(),
            this.selectorSrv.maxMonth(),
            this.selectorSrv.ctx(),
            this.specialSrv.getList(0, 50))
            .subscribe(res => {
                this.minMonth  = res[0].month;
                this.maxMonth  = res[1].month;
                const min      = +(res[0].month / 100).toFixed(0);
                const max      = +(res[1].month / 100).toFixed(0);
                const curYear  = (+(res[2].payMonth / 100) % 10000).toFixed(0);
                const curMonth = +(res[2].payMonth % 100).toFixed(0);
                const offset = +(res[2].payMonth / 1_000_000).toFixed(0)
                this.specialList = res[3].body;
                this.specialList.push({ id: 0, center: 0, paymonth: res[2].payMonth % 1_000_000, description: this.langSrv.translate('REMUN_NORMAL_PAY')});
                this.form = this.formBuilder
                    .group({
                        year: [curYear, [Validators.required, Validators.min(min), Validators.max(max)]],
                        month: [curMonth, [Validators.required, Validators.min(1), Validators.max(12)]],
                        offset: [res[2].payMonth, Validators.required]
                    })
            })
    }

    cancel() {
        this.router.navigate(['../'], { relativeTo: this.activatedRoute });
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
                      tap(title => this.shellSrv.setLabels([{ title: title }])),
                    switchMap(_ => loadSpecial? this.specialSrv.getList(0, 50): of(0)))
                .subscribe({
                        next: res => {
                            if (!loadSpecial) {
                                this.snackBarSrv.showSuccessMessage();
                                this.router.navigate(['../'], {relativeTo: this.activatedRoute});
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
