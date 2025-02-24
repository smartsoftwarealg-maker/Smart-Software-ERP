import { Component, inject, OnInit, signal } from '@angular/core';
import {ShellService} from '@ss/common/ui-shell';
import { ActivatedRoute, RouterModule } from "@angular/router";

import { LanguageService, LoginService, MaterialModule } from '@ss/common/api-common';
import { CommonModule, DecimalPipe } from '@angular/common';


import { FormBuilder, ReactiveFormsModule } from '@angular/forms';


import { ColorPickerModule } from "ngx-color-picker";
import { CustomerBalanceService } from '../services/customer-balance.service';
import { ScheduleBalanceService } from '../services/schedule-balance.service';
import { TurnoverService } from '../services/turnover.service';
import { ScheduleBalance, Turnover } from '@ss/scheduled-sales/api-scheduled-sales';
import { switchMap, tap } from 'rxjs';
import { Chart, ChartItem, registerables } from 'chart.js';
import { TranslateDirective, TranslatePipe } from '@ss/common/ui-lang';
import { ColorSelectComponent } from '@ss/common/ui-color-select';

@Component({
    selector: 'ss-customer-history',
    templateUrl: './customer-balance.component.html',
    styleUrls: ['./customer-balance.component.scss'],
    standalone: true,
    imports: [
        CommonModule,
        MaterialModule,
        TranslateDirective,
        ReactiveFormsModule,
        TranslatePipe,
        RouterModule,
        ColorPickerModule
    ]

})
export class CustomerBalanceComponent implements OnInit {
    private COLORS = [
        'rgba(255, 205,  86, 0.4)',
        'rgba(153, 102, 255, 0.4)',
        'rgba( 75, 192, 192, 0.4)',
        'rgba( 54, 162, 235, 0.4)',
        'rgba(255,  99, 132, 0.4)',
        'rgba(255, 159,  64, 0.4)',
        'rgba(201, 203, 207, 0.4)'
    ];
    private turnoverSrv = inject(TurnoverService);
    private scheduleBalanceSrv = inject(ScheduleBalanceService);
    private shellSrv = inject(ShellService);
    private route = inject(ActivatedRoute);
    private loginSrv = inject(LoginService);
    private balanceSrv = inject(CustomerBalanceService);
    private fb = inject(FormBuilder)
    private langSrv = inject(LanguageService);
    private numberPipe: DecimalPipe = new DecimalPipe(this.langSrv.defaultLanguage);
    scheduleForm = this.fb.group({
        missed:   [''],
        invoiced: [''],
        pending:  ['']
    });
    balanceForm = this.fb.group({
        debit:   [''],
        credit:  [''],
        balance: ['']
    });

    balance = signal({ credit: 0, debit: 0 });
    schedule = signal({ missed: 0, invoiced: 0, pending: 0 });
    monthlyTurnover = signal<Turnover[]>([]);
    annualTurnover = signal<Turnover[]>([]);



    ngOnInit() {
        Chart.register(...registerables);
        this.shellSrv.setGoBackPath('../..', this.route);
        this.shellSrv.setTitle('COMMON_BALANCE');
        this.turnoverSrv
            .monthlyTurnover(this.loginSrv.appCtx.agentId | 0)
            .pipe(
                tap(res => this.buildBarChart('monthly', 'SCH_MONTHLY_TURNOVER', res)),

                switchMap(() => this.turnoverSrv.annualTurnover(this.loginSrv.appCtx.agentId | 0)),
                tap(res => this.buildBarChart('annual', 'SCH_ANNUAL_TURNOVER', res)),

                switchMap(() => this.turnoverSrv.annualPayments(this.loginSrv.appCtx.agentId | 0)),
                tap(res => this.buildBarChart('annual2', 'SCH_ANNUAL_PAYMENTS', res)),

                switchMap(() => this.turnoverSrv.monthlyPayments(this.loginSrv.appCtx.agentId | 0)),
                tap(res => this.buildBarChart('monthly2', 'SCH_MONTHLY_PAYMENTS', res)),

                switchMap(() => this.balanceSrv.balance(this.loginSrv.appCtx.agentId | 0)),
                tap( res => {
                    const value = {
                        "debit":  res.debit?.toLocaleString()||'0',
                        "credit": res.credit?.toLocaleString()||'0',
                        "balance": ((res?.credit||0) - (res?.debit||0)).toLocaleString()
                    };
                    this.balanceForm.setValue(value);
                }),
                switchMap(() => this.scheduleBalanceSrv.balance(this.loginSrv.appCtx.agentId | 0))
            )
            .subscribe(res0 => {
                const res = res0 as ScheduleBalance;
                this.scheduleForm.setValue({
                    "missed":  res.missed.toLocaleString(),
                    "invoiced": res.invoiced.toLocaleString(),
                    "pending": res.pending.toLocaleString()
                });
            });
    }

    private buildBarChart(id: string, label: string, turnover: Turnover[]) {
        const ctx = <ChartItem>document.getElementById(id);

        const labels = turnover.map(t => t.id > 12? t.id + '' : this.langSrv.getMonth(t.id));
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: this.langSrv.translate(label),
                    data: turnover.map(t => t.turnover),
                    backgroundColor: [
                        'rgb(75, 192, 192)',
                        'rgb(75, 192, 192)',
                    ],
                    borderColor: 'rgb(75, 192, 192)',
                    tension: 0.1
                }]
            },
            options: {
                responsive: true
            }
        });

    }

}
