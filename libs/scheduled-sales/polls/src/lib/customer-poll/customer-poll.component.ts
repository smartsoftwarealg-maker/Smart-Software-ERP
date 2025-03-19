import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { ActivatedRoute } from '@angular/router';
import { HttpService, MaterialModule } from '@ss/common/api-common';
import { TranslateDirective } from '@ss/common/ui-lang';
import { CustomerPoll } from '@ss/scheduled-sales/api-scheduled-sales';
import { MatStep, MatStepLabel, MatStepper } from '@angular/material/stepper';
import { MatButton } from '@angular/material/button';
import { map } from 'rxjs/operators';
import { CustomerPollService } from '../customer-poll.service';

@Component({
    selector: 'sch-customer-pools-list',
    standalone: true,
    imports: [
        CommonModule,
        TranslateDirective,
        MatStep,
        MatStepper,
        MatStepLabel,
        MatButton,
        MaterialModule,
    ],
    templateUrl: './customer-poll.component.html',
    styleUrl: './customer-poll.component.scss',
})
export class CustomerPollComponent {
    public satisfactionAnswers = [
        'SCH_VERY_SATISFIED',
        'SCH_SATISFIED',
        'SCH_UNSATISFIED',
    ];
    public boolAnswers = ['COMMON_NO', 'COMMON_YES'];
    public UNSPECIFIED = 0;
    public SATISFACTION = 1;
    public BOOLEAN = 2;

    public route: ActivatedRoute;
    public httpSrv = inject(HttpService);
    public shellSrv = inject(ShellService);
    public snackBarSrv = inject(SnackBarService);
    public customerPollSrv = inject(CustomerPollService);

    public data: CustomerPoll[];
    public showThanksMessage = false;
    public completeState = signal(false);

    ngOnInit() {
        this.shellSrv.setGoBackPath('../..', this.route);
        this.showThanksMessage = false;
        this.customerPollSrv.getList(1, 1000).subscribe({
            next: (res) => {
                this.data = res.body;
                this.setCanGoNextPage(0);
            },
        });
    }

    setCanGoNextPage(id: number) {
        this.completeState.set(
            this.isQuestionComplete(id) && this.isQuestionComplete(id + 1),
        );
    }

    public getSatisfactionVal(id: number) {
        return localStorage.getItem('SatisfactionQuestionN' + id)
            ? localStorage.getItem('SatisfactionQuestionN' + id)
            : this.satisfactionAnswers[this.data[id].satisfactionAnswer];
    }

    public setSatisfactionVal(id: number, answer: number) {
        this.data[id].satisfactionAnswer = answer;
        localStorage.setItem(
            'SatisfactionQuestionN' + id,
            this.satisfactionAnswers[answer],
        );
        this.setCanGoNextPage(id % 2 == 0 ? id : id - 1);
    }

    public getBoolVal(id: number) {
        return localStorage.getItem('BoolQuestionN' + id)
            ? localStorage.getItem('BoolQuestionN' + id)
            : this.boolAnswers[this.data[id].boolAnswer];
    }

    public setBoolVal(id: number, answer: number) {
        this.data[id].boolAnswer = answer;
        localStorage.setItem('BoolQuestionN' + id, this.boolAnswers[answer]);
        this.setCanGoNextPage(id % 2 == 0 ? id : id - 1);
    }

    public getMemoVal(id: number) {
        return localStorage.getItem('MemoQuestionN' + id)
            ? localStorage.getItem('MemoQuestionN' + id)
            : this.data[id].memo;
    }

    public setMemoVal(id: number, value: string) {
        this.data[id].memo = value;
        localStorage.setItem('MemoQuestionN' + id, value);
        this.setCanGoNextPage(id % 2 == 0 ? id : id - 1);
    }

    public isQuestionComplete(id: number) {
        if (id >= this.data.length) {
            return true;
        } // if the question not exist, it will be consider success
        if (this.data[id].answerType === 0 && this.getMemoVal(id)) {
            return this.getMemoVal(id) != '';
        }

        if (this.data[id].answerType === 1) {
            return (
                this.satisfactionAnswers.indexOf(this.getSatisfactionVal(id)) >
                -1
            );
        }

        if (this.data[id].answerType === 2) {
            return this.boolAnswers.indexOf(this.getBoolVal(id)) > -1;
        }
        return false;
    }

    public save() {
        for (let i = 0; i < this.data.length; i++) {
            localStorage.removeItem('SatisfactionQuestionN' + i);
            localStorage.removeItem('BoolQuestionN' + i);
            localStorage.removeItem('MemoQuestionN' + i);
        }
        this.shellSrv.setLoading(true);
        const obs = this.httpSrv
            .put('/ssales/customer-poll', this.data)
            .pipe(map((res: { count: number }) => res['count']));

        obs.subscribe({
            next: () => {
                this.shellSrv.setLoading(false);
                this.showThanksMessage = true;
                this.snackBarSrv.showSuccessMessage();
            },
            error: (err) => {
                this.snackBarSrv.showFailureMessage();
                this.shellSrv.setLoading(false);
                throw err;
            },
        });
    }
}
