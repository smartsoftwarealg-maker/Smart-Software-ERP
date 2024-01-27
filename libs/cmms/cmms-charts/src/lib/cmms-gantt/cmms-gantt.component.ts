import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartService } from '../chart.service';
import { ShellService } from '@ss/common/ui-shell';
import { ActivatedRoute } from '@angular/router';
import { CommonUiDatepickerModule } from '@ss/common/ui-datepicker';
import { MaterialModule } from '@ss/common/api-common';
import { FormControl } from '@angular/forms';
import { CommonUiLangModule } from '@ss/common/ui-lang';
import { Gantt } from '../chart-api';
import { Chart, ChartConfiguration, ChartItem, registerables } from 'chart.js';

@Component({
    selector: 'ss-cmms-gantt',
    standalone: true,
    imports: [CommonModule, CommonUiDatepickerModule, MaterialModule, CommonUiLangModule],
    templateUrl: './cmms-gantt.component.html',
    styleUrls: ['./cmms-gantt.component.css'],
})
export class CmmsGanttComponent implements OnInit {
    private chartComponent: Chart | null = null;
    private shellSrv = inject(ShellService);
    private route = inject(ActivatedRoute);
    private chartSrv = inject(ChartService);

    dateFilter = new FormControl<Date>(new Date());

    ngOnInit() {
        Chart.register(...registerables);
        this.shellSrv.setGoBackPath('..', this.route);
        this.refresh(this.dateFilter.value || new Date());
    }

    content: string;

    loaded = false;


    private addDate(date: Date, hours: number): Date {
        return new Date(date.getTime() + hours * 3600 * 1000);
    }

    refresh(date: Date) {
        this.chartSrv
            .gantt(new Date(date))
            .subscribe(res => {
                this.createChart(res);
            });
    }

    private chartData(): ChartConfiguration {
        return {
            type: 'bar' ,
            data: {
                labels: ['Task1', 'Task2'],
                datasets: [
                    {
                        label: 'Dataset 1',
                        data: [10, 20],
                        borderColor: 'red',
                        backgroundColor: 'red',
                    },
                    // {
                    //     label: 'Dataset 2',
                    //     data: [30, 40],
                    //     borderColor: 'blue',
                    //     backgroundColor: 'blue',
                    // }
                ],
            },
            options: {
                indexAxis: 'x',
                // Elements options apply to all of the options unless overridden in a dataset
                // In this case, we are setting the border of each horizontal bar to be 2px wide
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
                        text: 'Chart.js Horizontal Bar Chart'
                    }
                }
            },
        };
    }

    private createChart(gantt: Gantt[]) {
        this.chartComponent?.destroy();
        const ctx = <ChartItem>document.getElementById('chart');
        this.chartComponent = new Chart(ctx, this.chartData());
    }

}
