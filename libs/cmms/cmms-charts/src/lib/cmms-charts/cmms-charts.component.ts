import {Component, inject, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ShellService} from '@ss/common/ui-shell';
import {ActivatedRoute} from '@angular/router';
import {Chart, ChartItem, registerables} from 'chart.js';
import {ChartService} from '../chart.service';
import {LanguageService, MaterialModule} from '@ss/common/api-common';
import {
    PastDue,
    PendingSR,
    DueChartConfig,
    ByPriority,
    SimpleBarsChartConfig, Pmp, Mttr, Mtts
} from '../chart-api';
import {forkJoin, switchMap, tap} from 'rxjs';
import {CommonUiLangModule} from '@ss/common/ui-lang';
import {ChartConfiguration} from 'chart.js/dist/types';

@Component({
    selector: 'ss-cmms-charts',
    standalone: true,
    imports: [CommonModule, MaterialModule, CommonUiLangModule],
    templateUrl: './cmms-charts.component.html',
    styleUrls: ['./cmms-charts.component.scss']
})
export class CMMSChartsComponent implements OnInit {
    private COLORS = [
        'rgba(255, 205,  86, 0.4)',
        'rgba(153, 102, 255, 0.4)',
        'rgba( 75, 192, 192, 0.4)',
        'rgba( 54, 162, 235, 0.4)',
        'rgba(255,  99, 132, 0.4)',
        'rgba(255, 159,  64, 0.4)',
        'rgba(201, 203, 207, 0.4)'
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
        const from = new Date();
        from.setHours(0);
        from.setMinutes(0);
        from.setSeconds(0);
        from.setMilliseconds(0);
        this.chartSrv
            .pastDue()
            .pipe(
                tap(past => this.pastDue(past)),
                // maintenance stats
                switchMap(() => forkJoin([this.chartSrv.mttr(from), this.chartSrv.mtts(from), this.chartSrv.pmp(from)])),
                tap(stats => this.maintenanceStats(stats)),
                // pending
                switchMap(() => this.chartSrv.pending()),
                tap(pend => this.pending(pend)),
                // assets priority
                switchMap(() => this.chartSrv.assetsPriority()),
                tap(res => this.assetsPriority(res)),
                // sr priority
                switchMap(() => this.chartSrv.srPriority()),
                tap(res => this.srPriority(res)),
                // wo priority
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
        this.buildDuePieChart(config);
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
        this.buildDuePieChart(config);
    }

    private assetsPriority(data: ByPriority[]) {
        // const config: PriorityChartConfig =
        //     {
        //         id: 'assets-priority',
        //         label: 'COMMON_EQUIPMENT',
        //         data: data
        //     };
        // this.buildPriorityChart(config);
        this.buildPriorityChart('assets-priority', data);
    }

    private srPriority(data: ByPriority[]) {
        // const config: PriorityChartConfig =
        //     {
        //         id: 'sr-priority',
        //         label: 'CMMS_SERVICE_REQUESTS',
        //         data: data
        //     };
        this.buildPriorityChart('sr-priority', data);
    }

    private woPriority(data: ByPriority[]) {
        // const config: PriorityChartConfig =
        //     {
        //         id: 'wo-priority',
        //         label: 'CMMS_WORK_ORDER',
        //         data: data
        //     };
        this.buildPriorityChart('wo-priority', data);
    }

    // private buildPriorityChart(config: PriorityChartConfig) {
    //     const ctx = <ChartItem>document.getElementById(config.id);
    //     new Chart(ctx, {
    //         type: 'bar',
    //         data: {
    //             labels: config.data.map(e => e.priority),
    //             datasets: [{
    //                 label: this.langSrv.translate(config.label),
    //                 data: config.data.map(e => e.count),
    //                 backgroundColor: this.COLORS.slice(0, config.data.length),
    //             }]
    //         },
    //         options: {
    //             responsive: true,
    //             maintainAspectRatio: false,
    //             scales: {
    //                 y: {
    //                     beginAtZero: true,
    //                     ticks: {
    //                         precision: 0
    //                     }
    //                 }
    //             },
    //             plugins: {
    //                 legend: {
    //                     display: false
    //                 },
    //             }
    //         }
    //     });
    // }

    private buildBarChart(config: SimpleBarsChartConfig) {
        const ctx = <ChartItem>document.getElementById(config.id);

        const chartConfig: ChartConfiguration = {
            type: 'bar',
            data: {
                labels: config.labels,
                datasets: config.series.map((s, i) => {
                    return {
                        data: s,
                        label: config.seriesNames ? config.seriesNames[i] : '',
                        backgroundColor: this.COLORS.slice(i, config.series.length == 1 ? config.series[0].length : (1 + i))
                    };
                })
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            precision: 0
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: config.series.length > 1
                    },
                }
            }
        };
        new Chart(ctx, chartConfig);
    }

    private buildDuePieChart(config: DueChartConfig) {
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
            },
            options: {
                responsive: true
            }
        });
    }

    private buildPriorityChart(id: string, data: ByPriority[]) {
        const config: SimpleBarsChartConfig = {
            id: id,
            series: [data.map(p => p.count)],
            labels: data.map(e => e.priority)
        };
        this.buildBarChart(config);
    }

    private maintenanceStats(stats: [Mttr, Mtts, Pmp]) {
        const config: SimpleBarsChartConfig = {
            id: 'maintenance-times',
            series: [
                // todo: find optimal values in PDF
                [60, 40, 50],
                [stats[0].mttr, stats[1].mtts, stats[2].pmp]
            ],
            seriesNames: [
                this.langSrv.translate('CMMS_OPTIMAL_TIME'),
                this.langSrv.translate('CMMS_ACTUAL_TIME')
            ],
            labels: [
                this.langSrv.translate('CMMS_MTTR'),
                this.langSrv.translate('CMMS_MTTS'),
                this.langSrv.translate('CMMS_PMP')
            ]
        };
        this.buildBarChart(config);
    }
}
