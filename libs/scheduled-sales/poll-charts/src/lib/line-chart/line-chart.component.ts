import { AfterViewInit, Component, inject, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Chart, ChartConfiguration, ChartItem, registerables } from 'chart.js';
import { LanguageService } from '@ss/common/api-common';
import { AnswersHistoricCount } from '@ss/scheduleds-sales/poll-charts';
import { SATISFACTION, YES_NO, COLORS } from '../common';

@Component({
    selector: 'ss-question-line-chart',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './line-chart.component.html',
    styleUrl: './line-chart.component.scss',
})
export class LineChartComponent implements OnInit , AfterViewInit {
    private COLORS = COLORS;
    private langSrv = inject(LanguageService);
    private yesNo = YES_NO;
    private satis = SATISFACTION;

    @Input() type: 'satisfaction' | 'boolean';
    @Input() data: AnswersHistoricCount;
    @Input() index: number;

    ngOnInit(): void {
        Chart.register(...registerables);
    }

    ngAfterViewInit(){
        if (this.type === 'satisfaction') {
            this.buildSatisfactionChart('HQuestion'+this.index,this.data.question, this.data.years, this.data.verySatisfied, this.data.satisfied, this.data.unSatisfied);
        } else {
            this.buildBoolChart('HQuestion'+this.index,this.data.question, this.data.years, this.data.yes, this.data.no);
        }
    }

    private buildSatisfactionChart(id: string, question: string, years: string[], verySatisfy: number[], satisfy: number[], unSatisfy: number[]) {
        let ctx = <ChartItem>document.getElementById(id);
        const data = {
            type: 'line',
            labels: years,
            datasets: [
                {
                    label: this.langSrv.translate(this.satis[0]),
                    data: verySatisfy,
                    backgroundColor: [
                        this.COLORS[0]
                    ],
                    borderColor:[
                      this.COLORS[0]
                    ]
                },
                {
                    label: this.langSrv.translate(this.satis[1]),
                    data: satisfy,
                    backgroundColor: [
                        this.COLORS[1],
                    ],
                    borderColor:[
                        this.COLORS[1],
                    ],
                },
                {
                    label: this.langSrv.translate(this.satis[2]),
                    data: unSatisfy,
                    backgroundColor: [
                        this.COLORS[2],
                    ],
                    borderColor:[
                        this.COLORS[2],
                    ],
                },
            ],
        };
        const chartConfig: ChartConfiguration = {
            type: 'line',
            data: data,
            options: {
                indexAxis: 'x',
                elements: {
                    bar: {
                        borderWidth: 2,
                    },
                },
                scales: {
                    x: {
                        ticks: {
                            autoSkip: true,
                        }
                    }
                },
                responsive: true,
                plugins: {
                    legend: {
                        position: 'bottom',
                    },
                    title: {
                        display: true,
                        text: question, //this.splitText(question),
                        font: {
                            weight: 'bold',
                            size: 15,
                        },
                        fullSize: true,
                        position: 'bottom',
                    },
                },
            },
        };
        new Chart(ctx, chartConfig);
    }

    private buildBoolChart(id: string, question: string, years: string[], yes: number[], no: number[]) {
        let ctx = <ChartItem>document.getElementById(id);
        const data = {
            labels: years,
            datasets: [
                {
                    label: this.langSrv.translate(this.yesNo[0]),
                    data: yes,
                    backgroundColor: [
                        this.COLORS[3]
                    ],
                    borderColor:[
                        this.COLORS[3],
                    ],
                },
                {
                    label: this.langSrv.translate(this.yesNo[1]),
                    data: no,
                    backgroundColor: [
                        this.COLORS[4],
                    ],
                    borderColor:[
                        this.COLORS[4],
                    ],
                },
            ],
        };
        const chartConfig: ChartConfiguration = {
            type: 'line',
            data: data,
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'bottom',
                    },
                    title: {
                        display: true,
                        text: question,
                        font: {
                            weight: 'bold',
                            size: 15,
                        },
                        position: 'bottom',
                        fullSize: true,
                    },
                },
            },
        };
        new Chart(ctx, chartConfig);
    }
}
