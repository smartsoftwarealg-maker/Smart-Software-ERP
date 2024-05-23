import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShellService } from '@ss/common/ui-shell';
import { ActivatedRoute } from '@angular/router';
import { Dashboard, SocialDashboardService } from '@social/social-api';
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
        'rgba(255, 205,  86, 0.4)',
        'rgba(153, 102, 255, 0.4)',
        'rgba( 75, 192, 192, 0.4)',
        'rgba( 54, 162, 235, 0.4)',
        'rgba(255,  99, 132, 0.4)',
        'rgba(255, 159,  64, 0.4)',
        'rgba(201, 203, 207, 0.4)'
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
        this.buildChart('activity-count', 2, db.counts.map(e => e.description), 'COMMON_COUNT', 'COMMON_COUNT', db.counts.map(e => e.count));
        // this.buildChart('payment-count', 3, db.payments.map(e => e.description), 'SOCIAL_PAYMENT_COUNTS', 'COMMON_COUNT', db.payments.map(e => e.count));
        this.buildChart('activity-amounts', 3, db.amounts.map(e => e.description), 'COMMON_AMOUNT', 'SOCIAL_WORKS', db.amounts.map(e => e.count));
    }


    private buildEmployeeChart(totalCount: number, femaleCount: number) {
        const ctx = <ChartItem>document.getElementById('emp-count');

        const data = {
            labels: [this.langSrv.translate('COMMON_MALE'), this.langSrv.translate('COMMON_FEMALE')],
            datasets: [
                {
                    label: this.langSrv.translate('COMMON_EMPLOYEE_COUNT'),
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
                        text: this.langSrv.translate(title)
                    }
                }
            },
        };
        new Chart(ctx, config);
    }


}
