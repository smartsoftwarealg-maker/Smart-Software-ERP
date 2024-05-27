import { Component, inject, OnInit, signal } from '@angular/core';
import {ShellService} from '@ss/common/ui-shell';
import { ActivatedRoute, RouterModule } from "@angular/router";
import { CommonUiConfirmationDialogModule } from "@ss/common/ui-confirmation-dialog";
import { LanguageService, LoginService, MaterialModule } from '@ss/common/api-common';
import { CommonModule, DecimalPipe } from '@angular/common';
import { CommonUiLangModule } from "@ss/common/ui-lang";
import { UiPaginationModule } from "@ss/common/ui-pagination";
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { CommonUiDatepickerModule } from "@ss/common/ui-datepicker";
import { CommonUiAutoCompleteModule } from "@ss/common/ui-auto-complete";
import { LogisticsUiDocInfoModule } from "@ss/logistics/ui-doc-info";
import { LogisticsUiDocImportModule } from "@ss/logistics/ui-doc-import";
import { LogisticsUiStockInfoModule } from "@ss/logistics/ui-stock-info";
import { CommonUiImageInputModule } from "@ss/common/ui-image-input";
import { CommonUiColorSelectModule } from "@ss/common/ui-color-select";
import { ColorPickerModule } from "ngx-color-picker";
import { CustomerBalanceService } from '../services/customer-balance.service';
import { ScheduleBalanceService } from '../services/schedule-balance.service';
import { TurnoverService } from '../services/turnover.service';
import { Turnover } from '@ss/scheduled-sales/api-scheduled-sales';
import { switchMap, tap } from 'rxjs';
import { Chart, ChartItem, registerables } from 'chart.js';

@Component({
    selector: 'ss-customer-history',
    templateUrl: './customer-balance.component.html',
    styleUrls: ['./customer-balance.component.scss'],
    standalone: true,
    imports: [
        CommonModule,
        MaterialModule,
        CommonUiLangModule,
        UiPaginationModule,
        ReactiveFormsModule,
        CommonUiConfirmationDialogModule,
        RouterModule,
        CommonUiDatepickerModule,
        CommonUiAutoCompleteModule,
        LogisticsUiDocInfoModule,
        LogisticsUiDocImportModule,
        LogisticsUiStockInfoModule,
        CommonUiImageInputModule,
        CommonUiColorSelectModule,
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
                switchMap(() => this.balanceSrv.balance(this.loginSrv.appCtx.agentId | 0)),
                tap( res => {
                    const value = {
                        "debit":  this.numberPipe.transform(res.debit, '1.2-2'),
                        "credit": this.numberPipe.transform(res.credit, '1.2-2'),
                        "balance": this.numberPipe.transform(res.credit - res.debit, '1.2-2')
                    };
                    this.balanceForm.setValue(value);
                }),
                switchMap(() => this.scheduleBalanceSrv.balance(this.loginSrv.appCtx.agentId | 0))
            )
            .subscribe(res => {
                this.scheduleForm.setValue({
                    "missed":  this.numberPipe.transform(res.missed, '1.2-2'),
                    "invoiced": this.numberPipe.transform(res.invoiced, '1.2-2'),
                    "pending": this.numberPipe.transform(res.pending, '1.2-2')
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
