import { AfterViewInit, Component, inject, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Chart, ChartConfiguration, ChartItem, registerables } from 'chart.js';
import { LanguageService } from '@ss/common/api-common';
import { AnswersCount } from '@ss/scheduleds-sales/poll-charts';
import { SATISFACTION, YES_NO, COLORS } from '../common';


@Component({
    selector: 'ss-question-pie-chart',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './pie-chart.component.html',
    styleUrl: './pie-chart.component.scss',
})
export class PieChartComponent implements OnInit , AfterViewInit {
    private COLORS = COLORS;
    private langSrv = inject(LanguageService);

    private yesNo = YES_NO;
    private satis = SATISFACTION;

    @Input() type: 'satisfaction' | 'boolean';
    @Input() data: AnswersCount;
    @Input() index: number;

    ngOnInit(): void {
        Chart.register(...registerables);

    }

    ngAfterViewInit(){
        if (this.type === 'satisfaction') {
            this.buildSatisfactionChart('question'+this.index,this.data.question, this.data.verySatisfied, this.data.satisfied, this.data.unSatisfied)
        } else {
            this.buildBoolChart('question'+this.index,this.data.question, this.data.yes, this.data.no)
        }
    }

    private buildSatisfactionChart(id: string, question: string, verySatisfy: number, satisfy: number, unSatisfy: number) {
        let ctx = <ChartItem>document.getElementById(id);
        const data = {
            labels: [
                this.langSrv.translate(this.satis[0]) + ' : ' + verySatisfy,
                this.langSrv.translate(this.satis[1]) + ' : ' + satisfy,
                this.langSrv.translate(this.satis[2]) + ' : ' + unSatisfy,
            ],
            datasets: [
                {
                    label: question,
                    data: [verySatisfy, satisfy, unSatisfy],
                    backgroundColor: [
                        this.COLORS[0],
                        this.COLORS[1],
                        this.COLORS[2],
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
                        position: 'bottom',
                    },
                    title: {
                        display: true,
                        text: question,
                        font: {
                            weight: 'bold',
                            style:'initial',
                            size: 20,
                        },
                        fullSize: true,
                        position: 'bottom',
                    },
                },
            },
        };
        new Chart(ctx, chartConfig);
    }

    private buildBoolChart(id: string, question: string, yes: number, no: number,) {
        const ctx = <ChartItem>document.getElementById(id);
        const data = {
            labels: [
                this.langSrv.translate(this.yesNo[0]) + ' : ' + yes,
                this.langSrv.translate(this.yesNo[1]) + ' : ' + no,
            ],
            datasets: [
                {
                    label: this.langSrv.translate(question),
                    data: [yes, no],
                    backgroundColor: [this.COLORS[3], this.COLORS[4]],
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
                        position: 'bottom',
                    },
                    title: {
                        display: true,
                        text: question,
                        font: {
                            weight: 'bold',
                            style:'initial',
                            size: 15,
                        },
                        fullSize: true,
                        position: 'bottom',
                    },
                },
            },
        }
        new Chart(ctx, chartConfig);
    }
}
