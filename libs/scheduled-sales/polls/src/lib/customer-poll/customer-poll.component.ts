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
    public satisfactionAnswer = [
        'SCH_VERY_SATISFIED',
        'SCH_SATISFIED',
        'SCH_UNSATISFIED',
    ];
    public boolAnswer = ['COMMON_YES', 'COMMON_NO'];
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
                this.isCanGoNextPage(0);
            },
        });
    }

    isCanGoNextPage(id: number) {
        this.completeState.set(
            this.isQuestionComplete(id) && this.isQuestionComplete(id + 1),
        );
    }

    public setLocal(name: string, value: string) {
        localStorage.setItem(name, value);
    }

    public getLocal(name: string) {
        return localStorage.getItem(name);
    }

    public getSatisfactionVal(id: number) {
        return localStorage.getItem('SatisfactionQuestionN' + id)
            ? +localStorage.getItem('SatisfactionQuestionN' + id)
            : this.data[id].satisfactionAnswer != null
              ? this.data[id].satisfactionAnswer
              : -1;
    }

    public getBoolVal(id: number) {
        return localStorage.getItem('BoolQuestionN' + id) !== null
            ? localStorage.getItem('BoolQuestionN' + id)
            : this.data[id].boolAnswer !== null
              ? this.data[id].boolAnswer
                  ? this.boolAnswer[0]
                  : this.boolAnswer[1]
              : '';
    }

    public getMemoVal(id: number) {
        return localStorage.getItem('MemoQuestionN' + id)
            ? localStorage.getItem('MemoQuestionN' + id)
            : this.data[id].memo;
    }

    public isQuestionComplete(id: number) {
        if (id >= this.data.length) {
            return true;
        } // if the question not exist, it will be consider success
        const satisfactionQuestion =
            this.data[id].satisfactionAnswer ||
            localStorage.getItem('SatisfactionQuestionN' + id)
                ? 1
                : 0;

        const boolQuestion =
            this.data[id].boolAnswer ||
            localStorage.getItem('BoolQuestionN' + id)
                ? 1
                : 0;

        const memoQuestion =
            localStorage.getItem('MemoQuestionN' + id) === ''
                ? 0
                : this.data[id].memo ||
                    localStorage.getItem('MemoQuestionN' + id)
                  ? 1
                  : 0;
        return satisfactionQuestion + boolQuestion + memoQuestion >= 1;
    }

    public save() {
        let val = this.data;
        for (let i = 0; i < this.data.length; i++) {
            if (this.getLocal('SatisfactionQuestionN' + i)) {
                val[i].satisfactionAnswer = +this.getLocal(
                    'SatisfactionQuestionN' + i,
                );
                localStorage.removeItem('SatisfactionQuestionN' + i);
            }
            if (this.getLocal('BoolQuestionN' + i)) {
                console.log(
                    this.getLocal('BoolQuestionN' + i) === this.boolAnswer[0],
                );
                val[i].boolAnswer =
                    this.getLocal('BoolQuestionN' + i) === this.boolAnswer[0]
                        ? 1
                        : 0;
                localStorage.removeItem('BoolQuestionN' + i);
            }
            if (this.getLocal('MemoQuestionN' + i)) {
                val[i].memo = this.getLocal('MemoQuestionN' + i);
                localStorage.removeItem('MemoQuestionN' + i);
            }
        }
        this.shellSrv.setLoading(true);
        const obs = this.httpSrv
            .put('/ssales/customer-poll', val)
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
