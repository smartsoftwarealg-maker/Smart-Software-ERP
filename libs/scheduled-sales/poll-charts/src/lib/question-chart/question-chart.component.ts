import { AfterViewInit, Component, inject, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Chart, ChartConfiguration, ChartItem, registerables } from 'chart.js';
import { MatCard } from '@angular/material/card';
import { LanguageService } from '@ss/common/api-common';
import {
    SatisfactionStatistic,
    BoolStatistic,
} from '@ss/scheduleds-sales/poll-charts';

@Component({
    selector: 'ss-question-chart',
    standalone: true,
    imports: [CommonModule, MatCard],
    templateUrl: './question-chart.component.html',
    styleUrl: './question-chart.component.scss',
})
export class QuestionChartComponent implements OnInit , AfterViewInit {
    private COLORS = [
        'rgba(255, 205,  86, 0.9)',
        'rgba(153, 102, 255, 0.9)',
        'rgba( 75, 192, 192, 0.9)',
        'rgba( 54, 162, 235, 0.9)',
        'rgba(255,  99, 132, 0.9)',
        'rgba(255, 159,  64, 0.9)',
        'rgba(0, 255, 0, 0.9)',
        'rgba(0, 0, 255, 0.9)',
        'rgba(255, 0, 0, 0.9)',
    ];
    private langSrv = inject(LanguageService);

    @Input() type: 'satisfaction' | 'boolean';
    @Input() satisfaction: SatisfactionStatistic;
    @Input() bool: BoolStatistic;
    @Input() index: number;

    ngOnInit(): void {
        Chart.register(...registerables);

    }

    ngAfterViewInit(){
        if (this.type === 'satisfaction') {
            this.buildSatisfactionChart('question'+this.index,this.satisfaction.question, this.satisfaction.verySatisfied, this.satisfaction.satisfied, this.satisfaction.unSatisfied)
        } else {
            this.buildBoolChart('question'+this.index,this.bool.question, this.bool.yes, this.bool.no)
        }
    }

    private buildSatisfactionChart(id: string, question: string, verySatisfy: number, satisfy: number, unSatisfy: number,) {
        let ctx = <ChartItem>document.getElementById(id);
        setTimeout(()=>{ctx = <ChartItem>document.getElementById(id);}, 1000);


        const data = {
            labels: [
                this.langSrv.translate('SCH_VERY_SATISFIED'),
                this.langSrv.translate('SCH_SATISFIED'),
                this.langSrv.translate('SCH_UNSATISFIED'),
            ],
            datasets: [
                {
                    label: question,
                    data: [verySatisfy, satisfy, unSatisfy],
                    backgroundColor: [
                        this.COLORS[6],
                        this.COLORS[7],
                        this.COLORS[8],
                    ],
                },
            ],
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
                        text: this.splitText(question),
                        font: {
                            weight: 'bold',
                            size: 15,
                        },
                        fullSize: true,
                    },
                },
            },
        };
        //console.log(convex);
        new Chart(ctx, chartConfig);
    }

    private buildBoolChart(id: string, question: string, yes: number, no: number,) {
        const ctx = <ChartItem>document.getElementById(id);
        const data = {
            labels: [
                this.langSrv.translate('COMMON_YES'),
                this.langSrv.translate('COMMON_NO'),
            ],
            datasets: [
                {
                    label: this.langSrv.translate(question),
                    data: [yes, no],
                    backgroundColor: [this.COLORS[6], this.COLORS[8]],
                },
            ],
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
                        text: this.splitText(question),
                        font: {
                            weight: 'bold',
                            size: 15,
                        },
                        fullSize: true,
                    },
                },
            },
        }
        new Chart(ctx, chartConfig);
    }

    // this function split the chart title to string[] so they
    private splitText(s: string) {
        const charsInLine = 50;
        const n = s.length / charsInLine;
        let result: string[] = [];
        let spaceP1 = -1;
        let spaceP2 = s.indexOf(' ', charsInLine);
        for (let i = 0; i < n; i++) {
            result.push(s.slice(spaceP1 + 1, spaceP2));
            spaceP1 = spaceP2;
            spaceP2 = s.indexOf(' ', spaceP1 + charsInLine);
            if (spaceP2 == -1) {
                spaceP2 = s.length;
            }
        }
        return result;
    }
}
