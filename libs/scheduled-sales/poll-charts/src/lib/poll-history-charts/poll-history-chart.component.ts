import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShellService } from '@ss/common/ui-shell';
import { ActivatedRoute } from '@angular/router';
import { Chart, registerables } from 'chart.js';
import { MatCard } from '@angular/material/card';
import { LanguageService } from '@ss/common/api-common';
import { PollChartService } from '../poll-chart.service';
import { QuestionsStatistic, AnswersHistoricCount } from '../poll-charts-api';
import { LineChartComponent } from '../line-chart/line-chart.component';
import { SATISFACTION, YES_NO} from '../common';

@Component({
    selector: 'ss-history-poll-charts',
    standalone: true,
    imports: [
        CommonModule,
        MatCard,
        LineChartComponent,
    ],
    templateUrl: './poll-history-chart.component.html',
    styleUrl: './poll-history-chart.component.scss',
})
export class PollHistoryChartComponent implements OnInit {
    private langSrv = inject(LanguageService);
    private PollChartSrv = inject(PollChartService);
    private shellSrv = inject(ShellService);
    private route = inject(ActivatedRoute);

    public HSatisArr: AnswersHistoricCount[];
    public HBoolArr: AnswersHistoricCount[];
    private yesNo = YES_NO;
    private satis = SATISFACTION;

    ngOnInit(): void {
        Chart.register(...registerables);
        this.shellSrv.setTitle('SCH_POLL_HISTORY');
        this.shellSrv.setGoBackPath('..', this.route);
        this.PollChartSrv.historicStatistics().subscribe((res) => {
            this.HSatisArr = this.getSatisAnswers(res);
            this.HBoolArr = this.getBoolAnswersByYear(res);
        });
    }

    private getSatisAnswers(data: QuestionsStatistic[]) {
        const ques = data.filter(d => d.satisfactionAnswer);
        const QDescription = this.langSrv.lang === 'ar'
          ? [...new Set(ques.map((q) => q.questionAr))]
          : this.langSrv.lang === 'en' ? [...new Set(ques.map((q) => q.question))]
            : [...new Set(ques.map((q) => q.questionFr))];
        const years = [
            ...new Set(ques.map((x) => new Date(x.date).getFullYear())),
        ].sort();
        let result: AnswersHistoricCount[] = [];
        for (let i = 0; i < QDescription.length; i++) {
            let vs: number[] = [];
            let s: number[] = [];
            let us: number[] = [];

            for (let j = 0; j < years.length; j++) {
                const answers = ques.filter(q => q.question === QDescription[i] || q.questionAr === QDescription[i] || q.questionFr === QDescription[i]);
                vs.push(answers.find(a => a.satisfactionAnswer === this.satis[0])?.count ?? 0);
                s.push(answers.find(a => a.satisfactionAnswer === this.satis[1])?.count ?? 0);
                us.push(answers.find(a => a.satisfactionAnswer === this.satis[2])?.count ?? 0);
            }

            result.push({
                question: QDescription[i],
                years: years.map((x) => '' + x),
                verySatisfied: vs,
                satisfied: s,
                unSatisfied: us,
            });
        }
        return result;
    }

    private getBoolAnswersByYear(data: QuestionsStatistic[]) {
        const ques = data.filter(d => d.boolAnswer);
        const QDescription = this.langSrv.lang === 'ar'
          ? [...new Set(ques.map((q) => q.questionAr))]
          : this.langSrv.lang === 'en' ? [...new Set(ques.map((q) => q.question))]
          : [...new Set(ques.map((q) => q.questionFr))];
        const years = [
            ...new Set(ques.map((x) => new Date(x.date).getFullYear())),
        ].sort();

        let result: AnswersHistoricCount[] = [];
        for (let i = 0; i < QDescription.length; i++) {
            let yes: number[] = [];
            let no: number[] = [];

            for (let j = 0; j < years.length; j++) {
                const answers = ques.filter(q => q.question === QDescription[i] || q.questionAr === QDescription[i] || q.questionFr === QDescription[i]);
                yes.push(answers.find(a => a.boolAnswer === this.yesNo[0])?.count ?? 0);
                no.push(answers.find(a => a.boolAnswer === this.yesNo[1])?.count ?? 0);
            }

            result.push({
                question: QDescription[i],
                years: years.map((x) => '' + x),
                yes: yes,
                no: no,
            });
        }
        return result;
    }
}
