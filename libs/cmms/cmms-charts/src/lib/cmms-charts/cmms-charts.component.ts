import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShellService } from '@ss/common/ui-shell';
import { ActivatedRoute } from '@angular/router';
import { Chart, ChartItem, registerables } from 'chart.js';
import { ChartService } from '../chart.service';
import { LanguageService, MaterialModule } from '@ss/common/api-common';
import { PastDue, PendingSR, DueChartConfig, PriorityChartConfig, ByPriority } from '../chart-api';
import { switchMap, tap } from 'rxjs';
import { CommonUiLangModule } from "@ss/common/ui-lang";
@Component({
    selector: 'ss-cmms-charts',
    standalone: true,
    imports: [CommonModule, MaterialModule, CommonUiLangModule],
    templateUrl: './cmms-charts.component.html',
    styleUrls: ['./cmms-charts.component.css']
})
export class CMMSChartsComponent implements OnInit {
    private COLORS = [
        'rgba(255, 99, 132, 0.2)',
        'rgba(255, 159, 64, 0.2)',
        'rgba(255, 205, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(201, 203, 207, 0.2)'
    ];
    private shellSrv = inject(ShellService);
    private route = inject(ActivatedRoute);
    private chartSrv = inject(ChartService);
    private langSrv = inject(LanguageService);

    processing = true;

    ngOnInit() {
        this.shellSrv.setGoBackPath('..', this.route);
        Chart.register(...registerables);
        this.buildCharts();
    }

    private buildCharts() {
        this.chartSrv
            .pastDue()
            .pipe(
                tap(past => this.pastDue(past)),
                switchMap(() => this.chartSrv.pending()),
                tap(pend => this.pending(pend)),
                switchMap(() => this.chartSrv.assetsPriority()),
                tap(res => this.assetsPriority(res)),
                switchMap(() => this.chartSrv.srPriority()),
                tap(res => this.srPriority(res)),
                switchMap(() => this.chartSrv.woPriority()),
                tap(res => this.woPriority(res)))
            .subscribe({
                next: () => this.processing = false,
                error: err => {
                    this.processing = false;
                    throw err;
                }
            });
    }

    private pastDue(past: PastDue) {
        const config: DueChartConfig = {
            id: 'past-due',
            pre: past.total - past.pastDue,
            past: past.pastDue,
            preDescription: 'CMMS_PRE_DUE',
            pastDescription: 'CMMS_PAST_DUE',
            chartDescription: 'CMMS_WORK_ORDER'
        };
        this.pastDue_(config);
    }

    private pending(past: PendingSR) {
        const config: DueChartConfig = {
            id: 'pending',
            pre: past.total - past.pending,
            past: past.pending,
            preDescription: 'COMMON_OPEN',
            pastDescription: 'COMMON_PENDING',
            chartDescription: 'CMMS_SERVICE_REQUEST'
        };
        this.pastDue_(config);
    }

    private assetsPriority(data: ByPriority[]) {
        const config: PriorityChartConfig =
            {
                id: 'assets-priority',
                label: 'CMMS_EQUIPMENT',
                data: data
            };
        this.buildPriorityChart(config);
    }

    private srPriority(data: ByPriority[]) {
        const config: PriorityChartConfig =
            {
                id: 'sr-priority',
                label: 'CMMS_SERVICE_REQUESTS',
                data: data
            };
        this.buildPriorityChart(config);
    }

    private woPriority(data: ByPriority[]) {
        const config: PriorityChartConfig =
            {
                id: 'wo-priority',
                label: 'CMMS_WORK_ORDER',
                data: data
            };
        this.buildPriorityChart(config);
    }
    private buildPriorityChart(config: PriorityChartConfig) {
        const ctx = <ChartItem>document.getElementById(config.id);
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: config.data.map(e => e.priority),
                datasets: [{
                    label: this.langSrv.translate(config.label),
                    data: config.data.map(e => e.count),
                    backgroundColor: this.COLORS.slice(0, config.data.length),
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }

    private pastDue_(config: DueChartConfig) {
        const ctx = <ChartItem>document.getElementById(config.id);
        new Chart(ctx, {
            type: 'pie',
            data: {
                labels: [
                    this.langSrv.translate(config.preDescription),
                    this.langSrv.translate(config.pastDescription),
                ],
                datasets: [{
                    label: this.langSrv.translate(config.chartDescription),
                    data: [config.pre, config.past],
                    backgroundColor: [
                        'rgb(255, 99, 132)',
                        'rgb(54, 162, 235)',
                    ],
                    hoverOffset: 4
                }]
            }
        });
    }
}
