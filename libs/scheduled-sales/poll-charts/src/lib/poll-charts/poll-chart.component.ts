import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShellService } from '@ss/common/ui-shell';
import { ActivatedRoute } from '@angular/router';
import { Chart, ChartConfiguration, ChartItem, registerables } from 'chart.js';
import { MatCard } from '@angular/material/card';
import { LanguageService } from '@ss/common/api-common';
import { PollChartService } from '../poll-chart.service';
import {
    Statistics,
    QuestionsStatistic,
    SatisfactionStatistic,
    BoolStatistic,
} from '../poll-charts-api';
import { QuestionChartComponent } from '../question-chart/question-chart.component';

@Component({
    selector: 'ss-poll-charts',
    standalone: true,
    imports: [CommonModule, MatCard, QuestionChartComponent],
    templateUrl: './poll-chart.component.html',
    styleUrl: './poll-chart.component.scss',
})
export class PollChartComponent implements OnInit {
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
    private TODAY = new Date();
    private langSrv = inject(LanguageService);
    private shellSrv = inject(ShellService);
    private route = inject(ActivatedRoute);
    private dashboardSrv = inject(PollChartService);

    public satisArr: SatisfactionStatistic[];
    public boolArr: BoolStatistic[];

    ngOnInit(): void {
        Chart.register(...registerables);
        this.shellSrv.setTitle('SCH_POLL_CHARTS');
        this.shellSrv.setGoBackPath('..', this.route);
        this.dashboardSrv
          .statistics(this.TODAY.getFullYear() * 100 + this.TODAY.getMonth())
          .subscribe((res) => {
              this.buildCharts(res);
          });
        this.dashboardSrv
          .questionStatistics(
            this.TODAY.getFullYear() * 100 + this.TODAY.getMonth(),
          )
          .subscribe((res) => {
              this.satisArr = this.getSatisfactionAnswers(res);
              this.boolArr = this.getBoolAnswers(res);
          });
    }

    private buildCharts(stat: Statistics[]) {
        this.buildLineChart('Statistics', 0, stat.map((e) => new Date(e.date).getFullYear() + ''), 'SCH_ANNUAL_STATISTICS', 'SCH_ANNUAL_STATISTICS', stat.map((e) => e.count),);
    }

    private buildLineChart(id: string, index: number, labels: string[], title: string, label: string, data: number[],) {
        const ctx = <ChartItem>document.getElementById(id);
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
                    },
                ],
            },
            options: {
                indexAxis: 'x',
                elements: {
                    bar: {
                        borderWidth: 2,
                    },
                },
                responsive: true,
                plugins: {
                    legend: {
                        position: 'bottom',
                    },
                    title: {
                        display: true,
                        text: this.langSrv.translate(title),
                    },
                },
            },
        };
        new Chart(ctx, config);
    }

    private getSatisfactionAnswers(data: QuestionsStatistic[]) {
        const question = [...new Set(data.map((d) => d.question))]; // Get question collection
        const satisfactionAnswers = [
            'SCH_VERY_SATISFIED',
            'SCH_SATISFIED',
            'SCH_UN_SATISFIED',
        ];
        // pick the satisfaction ones
        const satisfactionQuestions = data.filter(
          (d) => satisfactionAnswers.indexOf(d.answer) > -1,
        );
        let result: SatisfactionStatistic[] = [];
        for (let i = 0; i < question.length; i++) {
            // group the answers for the question named q
            const answers = satisfactionQuestions.filter(
              (q) => q.question === question[i],
            );
            const vs =
              answers.find((x) => x.answer === satisfactionAnswers[0])
                ?.count ?? 0;
            const s =
              answers.find((x) => x.answer === satisfactionAnswers[1])
                ?.count ?? 0;
            const us =
              answers.find((x) => x.answer === satisfactionAnswers[2])
                ?.count ?? 0;
            // if the question is not answered yet don`t pick it
            if (vs + s + us) {
                result.push({
                    question: question[i],
                    verySatisfied: vs,
                    satisfied: s,
                    unSatisfied: us,
                });
            }
        }
        return result;
    }

    private getBoolAnswers(data: QuestionsStatistic[]) {
        const question = [...new Set(data.map((d) => d.question))];
        const satisfactionAnswers = ['SCH_YES', 'SCH_NO'];
        // pick the bool ones
        const boolQuestions = data.filter(
          (d) => satisfactionAnswers.indexOf(d.answer) > -1,
        );
        let result: BoolStatistic[] = [];
        for (let i = 0; i < question.length; i++) {
            // group the answers for the question named q
            const answers = boolQuestions.filter(
              (q) => q.question === question[i],
            );
            const yes =
              answers.find((x) => x.answer === satisfactionAnswers[0])
                ?.count ?? 0;
            const no =
              answers.find((x) => x.answer === satisfactionAnswers[1])
                ?.count ?? 0;
            // if the question is not answered yet don`t pick it
            if (yes + no) {
                result.push({ question: question[i], yes: yes, no: no });
            }
        }
        return result;
    }

}
