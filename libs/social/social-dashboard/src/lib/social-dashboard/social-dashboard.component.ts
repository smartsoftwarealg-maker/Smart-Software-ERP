import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShellService } from '@ss/common/ui-shell';
import { ActivatedRoute } from '@angular/router';
import { Dashboard, SocialDashboardService, TreasuryBalance } from '@social/social-api';
import { Chart, ChartConfiguration, ChartItem, registerables } from 'chart.js';
import { MatCard } from '@angular/material/card';
import { LanguageService } from '@ss/common/api-common';

@Component({
    selector: 'ss-social-social-dashboard',
    standalone: true,
    imports: [CommonModule, MatCard],
    templateUrl: './social-dashboard.component.html',
    styleUrl: './social-dashboard.component.scss'
})
export class SocialDashboardComponent implements OnInit {
    private COLORS = [
        'rgba(255, 205,  86, 0.9)',
        'rgba(153, 102, 255, 0.9)',
        'rgba( 75, 192, 192, 0.9)',
        'rgba( 54, 162, 235, 0.9)',
        'rgba(255,  99, 132, 0.9)',
        'rgba(255, 159,  64, 0.9)',
        'rgba(201, 203, 207, 0.9)',
        'rgba(200, 230, 50, 0.9)',
        'rgba(255, 180, 255, 0.9)'
    ];
    private TODAY = new Date();
    private langSrv = inject(LanguageService);
    private shellSrv = inject(ShellService);
    private route = inject(ActivatedRoute);
    private dashboardSrv = inject(SocialDashboardService);


    ngOnInit(): void {
        Chart.register(...registerables);
        this.shellSrv.setTitle('COMMON_DASHBOARD');
        this.shellSrv.setGoBackPath('..', this.route);
        this.dashboardSrv
            .dashboard(this.TODAY.getFullYear() * 100 + this.TODAY.getMonth())
            .subscribe(res => {
                this.buildCharts(res);
            });
    }

    private buildCharts(db: Dashboard) {
        this.buildEmployeeChart(db.employeeCount, db.femaleCount);
        this.buildChart('activity-counts', 0, db.counts.map(e => e.description), 'SOCIAL_ACTIVITY_COUNT', 'SOCIAL_ACTIVITY_COUNT', db.counts.map(e => e.value));
        this.buildChart('activity-amounts', 1, db.amounts.map(e => e.description), 'SOCIAL_ACTIVITY_AMOUNTS', 'SOCIAL_WORKS', db.amounts.map(e => e.value));
        this.buildChart('payment-counts', 2, db.paymentCounts.map(e => e.description), 'SOCIAL_PAYMENT_COUNTS', 'SOCIAL_PAYMENT_COUNTS', db.paymentCounts.map(e => e.value));
        this.buildChart('payments', 3, db.payments.map(e => e.description), 'COMMON_PAYMENTS', 'COMMON_PAYMENTS', db.payments.map(e => e.value));
        this.buildChart('banks', 4, db.balance.map(e => e.bank), 'COMMON_BALANCE', 'COMMON_BALANCE', db.balance.map(e => e.balance));
        this.buildChart('annualCounts', 5, db.annualCounts.map(e => e.description), 'SOCIAL_ANNUAL_COUNTS', 'SOCIAL_ANNUAL_COUNTS', db.annualCounts.map(e => e.value));
        this.buildChart('annualAmounts', 6, db.annualAmounts.map(e => e.description), 'SOCIAL_ANNUAL_AMOUNTS', 'SOCIAL_ANNUAL_AMOUNTS', db.annualAmounts.map(e => e.value));
        this.buildTreasuryChart2('treasury', db.treasury);
    }


    private buildEmployeeChart(totalCount: number, femaleCount: number) {
        const ctx = <ChartItem>document.getElementById('emp-counts');

        const data = {
            labels: [this.langSrv.translate('SOCIAL_MALE_COUNT'), this.langSrv.translate('SOCIAL_FEMALE_COUNT')],
            datasets: [
                {
                    label: this.langSrv.translate('SOCIAL_EMPLOYEE_COUNT'),
                    data: [totalCount - femaleCount, femaleCount, ],
                    backgroundColor: [this.COLORS[2], this.COLORS[3]],
                }
            ]
        };
        const chartConfig: ChartConfiguration = {
            type: 'pie',
            data: data,
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top',
                    },
                    title: {
                        display: true,
                        text: this.langSrv.translate('SOCIAL_EMPLOYEE_COUNT')
                    }
                }
            }
        };
        new Chart(ctx, chartConfig);
    }


    private buildChart(id: string, index: number, labels: string[], title: string, label: string, data: number[]) {
        const ctx = <ChartItem>document.getElementById(id);

        const config: ChartConfiguration = {
            type: 'bar' ,
            data: {
                labels: labels,
                datasets: [
                    {
                        label: this.langSrv.translate(label),
                        data: data,
                        borderColor: this.COLORS[index],
                        backgroundColor: this.COLORS[index],
                        borderWidth: 2,
                        borderRadius: 20
                    }
                ]
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
                        position: 'bottom',
                    },
                    title: {
                        display: true,
                        text: this.langSrv.translate(title),
                    }
                }
            },
        };
        new Chart(ctx, config);
    }


    private buildTreasuryChart2(id: string, data: TreasuryBalance[]) {
        const ctx = <ChartItem>document.getElementById(id);
        const journals = [... new Set(data.map(d => d.journal))];
        const years = [... new Set(data.map(d => d.year + ''))];

        const config: ChartConfiguration = {
            type: 'line' ,
            data: {
                labels: years,
                datasets:
                    journals.map((j, i) => {
                        return {
                            label: j,
                            data: data.filter(d => d.journal === j).map(e => e.balance),
                            borderColor: this.COLORS[i],
                            backgroundColor: this.COLORS[i],
                            borderWidth: 2,
                            borderRadius: 20
                        };
                    })

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
                        position: 'bottom',
                    },
                    title: {
                        display: true,
                        text: this.langSrv.translate('COMMON_BALANCE'),
                    }
                }
            },
        };
        new Chart(ctx, config);
    }


}
