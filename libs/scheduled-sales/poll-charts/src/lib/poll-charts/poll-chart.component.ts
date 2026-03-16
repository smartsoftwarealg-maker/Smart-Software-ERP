import {
    Component,
    inject,
    OnInit,
    ViewChild,
    ElementRef,
    OnDestroy,
} from '@angular/core';
import { ShellService } from '@ss/common/ui-shell';
import { ActivatedRoute } from '@angular/router';
import { Chart, ChartConfiguration, registerables } from 'chart.js';
import { MatCard } from '@angular/material/card';
import { LanguageService } from '@ss/common/api-common';
import { PollChartService } from '../poll-chart.service';
import {
    Statistics,
    QuestionsStatistic,
    AnswersCount,
} from '../poll-charts-api';
import { PieChartComponent } from '../pie-chart/pie-chart.component';
import { SATISFACTION, YES_NO, COLORS } from '../common';

@Component({
    selector: 'ss-poll-charts',
    standalone: true,
    imports: [MatCard, PieChartComponent],
    templateUrl: './poll-chart.component.html',
    styleUrl: './poll-chart.component.scss',
})
export class PollChartComponent implements OnInit, OnDestroy {
    // Reference to the Annual Statistics canvas
    @ViewChild('statisticsCanvas') statsCanvas!: ElementRef<HTMLCanvasElement>;

    private mainChart?: Chart;
    private COLORS = COLORS;
    private langSrv = inject(LanguageService);
    private shellSrv = inject(ShellService);
    private route = inject(ActivatedRoute);
    private PollChartSrv = inject(PollChartService);

    public satisArr: AnswersCount[] = [];
    public boolArr: AnswersCount[] = [];
    private yesNo = YES_NO;
    private satis = SATISFACTION;

    ngOnInit(): void {
        Chart.register(...registerables);
        this.shellSrv.setTitle('SCH_POLL_CHARTS');
        this.shellSrv.setGoBackPath('..', this.route);

        this.PollChartSrv.statistics().subscribe((res) => {
            // Using setTimeout to ensure ViewChild is initialized after data returns
            setTimeout(() => this.buildCharts(res), 0);
        });

        this.PollChartSrv.questionStatistics().subscribe((res) => {
            this.satisArr = this.getSatisfactionAnswers(res);
            this.boolArr = this.getBoolAnswers(res);
        });
    }

    private buildCharts(stat: Statistics[]) {
        this.buildLineChart(
            0,
            stat.map((e) => new Date(e.date).getFullYear() + ''),
            'SCH_ANNUAL_STATISTICS',
            'SCH_ANNUAL_STATISTICS',
            stat.map((e) => e.count),
        );
    }

    private buildLineChart(
        index: number,
        labels: string[],
        title: string,
        label: string,
        data: number[],
    ) {
        // Destroy existing chart if it exists
        if (this.mainChart) {
            this.mainChart.destroy();
        }

        const ctx = this.statsCanvas.nativeElement;
        const config: ChartConfiguration = {
            type: 'line',
            data: {
                labels: labels,
                datasets: [
                    {
                        label: this.langSrv.translate(label),
                        data: data,
                        borderColor: this.COLORS[index],
                        backgroundColor: this.COLORS[index],
                        borderWidth: 2,
                        borderRadius: 20,
                        fill: true,
                    },
                ],
            },
            options: {
                responsive: true,
                plugins: {
                    legend: { position: 'bottom' },
                    title: {
                        display: true,
                        text: this.langSrv.translate(title),
                    },
                },
            },
        };
        this.mainChart = new Chart(ctx, config);
    }

    private getSatisfactionAnswers(data: QuestionsStatistic[]) {
        const ques = data.filter((d) => d.satisfactionAnswer);
        const QDescription =
            this.langSrv.lang === 'ar'
                ? [...new Set(ques.map((q) => q.questionAr))]
                : this.langSrv.lang === 'en'
                  ? [...new Set(ques.map((q) => q.question))]
                  : [...new Set(ques.map((q) => q.questionFr))];

        let result: AnswersCount[] = [];
        for (let i = 0; i < QDescription.length; i++) {
            const QAnswers = ques.filter(
                (q) =>
                    q.question === QDescription[i] ||
                    q.questionAr === QDescription[i] ||
                    q.questionFr === QDescription[i],
            );
            const vs =
                QAnswers.find((x) => x.satisfactionAnswer === this.satis[0])
                    ?.count ?? 0;
            const s =
                QAnswers.find((x) => x.satisfactionAnswer === this.satis[1])
                    ?.count ?? 0;
            const us =
                QAnswers.find((x) => x.satisfactionAnswer === this.satis[2])
                    ?.count ?? 0;
            result.push({
                question: QDescription[i],
                verySatisfied: vs,
                satisfied: s,
                unSatisfied: us,
            });
        }
        return result;
    }

    private getBoolAnswers(data: QuestionsStatistic[]) {
        const ques = data.filter((d) => d.boolAnswer);
        const QDescription =
            this.langSrv.lang === 'ar'
                ? [...new Set(ques.map((q) => q.questionAr))]
                : this.langSrv.lang === 'en'
                  ? [...new Set(ques.map((q) => q.question))]
                  : [...new Set(ques.map((q) => q.questionFr))];

        let result: AnswersCount[] = [];
        for (let i = 0; i < QDescription.length; i++) {
            const answers = ques.filter(
                (q) =>
                    q.question === QDescription[i] ||
                    q.questionAr === QDescription[i] ||
                    q.questionFr === QDescription[i],
            );
            const yes =
                answers.find((a) => a.boolAnswer === this.yesNo[0])?.count ?? 0;
            const no =
                answers.find((a) => a.boolAnswer === this.yesNo[1])?.count ?? 0;
            result.push({ question: QDescription[i], yes: yes, no: no });
        }
        return result;
    }

    ngOnDestroy(): void {
        if (this.mainChart) {
            this.mainChart.destroy();
        }
    }
}
