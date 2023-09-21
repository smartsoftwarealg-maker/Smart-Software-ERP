import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Chart, ChartDataset, ChartItem, Point, registerables } from 'chart.js';
import { ChartService } from '../chart.service';
import { Gantt } from '../chart-api';

@Component({
    selector: 'ss-cmms-gantt',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './cmms-gantt.component.html',
    styleUrls: ['./cmms-gantt.component.css'],
})
export class CmmsGanttComponent implements OnInit {
    private COLORS = [
        'rgba(255, 99, 132, 0.8)',
        'rgba(255, 159, 64, 0.8)',
        'rgba(255, 205, 86, 0.8)',
        'rgba(75, 192, 192, 0.8)',
        'rgba(54, 162, 235, 0.8)',
        'rgba(153, 102, 255, 0.8)',
        'rgba(201, 203, 207, 0.8)'
    ];

    private chartSrv = inject(ChartService);

    ngOnInit() {
        Chart.register(...registerables);
        this.chartSrv
            .gant()
            .subscribe(res => this.buildCharts(res));
    }

    private toData(gant: Gantt, index: number): ChartDataset<'line', (number | Point)[]> {
        const color = this.COLORS[index % this.COLORS.length];
        const from = new Date(gant.dueDate);
        const to = new Date(gant.dueDate);
        const days = Math.max(+(gant.hours).toFixed(0), 1);
        to.setDate(to.getDate() + days);
        return {
            label: gant.description,
            backgroundColor: color,
            borderColor: color,
            fill: false,
            borderWidth : 15,
            pointRadius : 0,
            data: [
                {
                    x: 1 + index,
                    y: index + 1
                }, {
                    x: 2 + index,
                    y: index + 1
                }
            ]
        };
    }


    private buildCharts(data: Gantt[]) {
        const ctx = <ChartItem>document.getElementById('gantt');
        new Chart(ctx, {
            type: 'line',
            data: {
                datasets: data.map((e, i) => this.toData(e, i))
            },
            options: {
                plugins: {
                    legend: {
                        display: true,
                        position: 'bottom'
                    }
                },
                scales: {
                    x: {
                        type: 'linear',
                        position: 'bottom',
                        beginAtZero: true,
                    },
                    y : {
                        beginAtZero :true,
                        ticks: {
                            stepSize: 1
                        }
                    }
                }
            }
        });
    }
}
