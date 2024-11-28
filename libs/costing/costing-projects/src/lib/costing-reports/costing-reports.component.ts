import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LanguageService, MaterialModule } from '@ss/common/api-common';

import { CProduct, CReport } from '@ss/costing/costing-utils';
import { CostingReportService } from '../services/costing-report.service';
import { Chart, ChartItem, registerables } from 'chart.js';

interface ChartConfig {
    id: string;
    description: string;
    productLines: CProduct[];
}

@Component({
    selector: 'ss-costing-reports',
    standalone: true,
    imports: [
        CommonModule,
        RouterModule,
        MaterialModule,

    ],
    templateUrl: './costing-reports.component.html',
    styleUrl: './costing-reports.component.css',
})
export class CostingReportsComponent implements OnInit {
    private langSrv = inject(LanguageService);
    private reportSrv = inject(CostingReportService);
    private chartComponent: Chart | null = null;
    private COLORS = [
        'rgba(255, 205,  86, 0.4)',
        'rgba(153, 102, 255, 0.4)',
        'rgba( 75, 192, 192, 0.4)',
        'rgba( 54, 162, 235, 0.4)',
        'rgba(255,  99, 132, 0.4)',
        'rgba(255, 159,  64, 0.4)',
        'rgba(201, 203, 207, 0.4)'
    ];

    report = signal<CReport|null>(null);
    processing = signal(false);

    ngOnInit(): void {
        Chart.register(...registerables);
        this.refresh();
    }

    refresh() {
        this.processing.set(true);
        this.reportSrv
            .getReport()
            .subscribe({
                next: res => {
                    this.processing.set(false);
                    this.report.set(res);
                    this.buildChart2(res);
                },
                error: err => {
                    this.processing.set(false);
                    throw err;
                }
            });
    }

    private buildChart(config: ChartConfig, colorIndex: number) {
        const ctx = <ChartItem>document.getElementById(config.id);
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: [...config.productLines.map(_=> _.description)],
                datasets: [
                    {
                        label: this.langSrv.translate(config.description),
                        data: [...config.productLines.map(_=> _.price)],
                        borderColor: this.COLORS[colorIndex],
                        backgroundColor: this.COLORS[colorIndex],
                    }
                ],
            },
            options: {
                indexAxis: 'x',
                elements: {
                    bar: {
                        borderWidth: 2,
                    }
                },
                responsive: true,
                plugins: {
                    legend: {
                        position: 'right',
                    },
                    title: {
                        display: true,
                        text: this.langSrv.translate('CMMS_TRIVIAL')
                    }
                }
            },
        });
    }

    private buildChart2(report: CReport) {
        const ctx = <ChartItem>document.getElementById('trivial');
        this.chartComponent?.destroy();
        this.chartComponent = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: [...report.trivial.map(_ => _.description)],
                datasets: [
                    {
                        label: this.langSrv.translate('COST_TRIVIAL'),
                        data: [...report.trivial.map(_ => _.price)],
                        borderColor: 'red',
                        backgroundColor: 'red'
                    },
                    {
                        label: this.langSrv.translate('COST_SIMPLE'),
                        data: [...report.simple.map(_ => _.price)],
                        borderColor: 'blue',
                        backgroundColor: 'blue'
                    },
                    {
                        label: this.langSrv.translate('COST_STEP_DOWN'),
                        data: [...report.stepDown.map(_ => _.price)],
                        borderColor: this.COLORS[2],
                        backgroundColor: this.COLORS[2]
                    },
                    {
                        label: this.langSrv.translate('COST_RECIPROCAL'),
                        data: [...report.reciprocal.map(_ => _.price)],
                        borderColor: this.COLORS[3],
                        backgroundColor: this.COLORS[3]
                    }
                ]
            },
            options: {
                indexAxis: 'x',
                // Elements options apply to all the options unless overridden in a dataset
                // In this case, we are setting the border of each horizontal bar to be 2px wide
                elements: {
                    bar: {
                        borderWidth: 2
                    }
                },
                responsive: true,
                plugins: {
                    legend: {
                        position: 'right'
                    },
                    title: {
                        display: true,
                        text: this.langSrv.translate('COMMON_REPORTS')
                    }
                }
            }
        });
    }
}
