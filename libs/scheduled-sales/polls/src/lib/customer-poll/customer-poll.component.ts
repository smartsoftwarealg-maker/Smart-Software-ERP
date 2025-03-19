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
    public boolAnswers = ['COMMON_YES', 'COMMON_NO'];
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
    public loading = true;

    ngOnInit() {
        this.shellSrv.setGoBackPath('../..', this.route);
        this.showThanksMessage = false;
        this.customerPollSrv.getList(1, 1000).subscribe({
            next: (res) => {
                this.data = res.body;
                this.setCanGoNextPage(0);
                this.initialize(res.body);
                this.loading = false
            },
        });
    }

    ngOnDestroy() {
        for (let i = 0; i < this.data.length; i++) {
            localStorage.removeItem('SatisfactionQuestionN' + i);
            localStorage.removeItem('BoolQuestionN' + i);
            localStorage.removeItem('MemoQuestionN' + i);
        }
    }

    setCanGoNextPage(id: number) {
        this.completeState.set(
            this.isQuestionComplete(id) && this.isQuestionComplete(id + 1),
        );
    }

    public getSatisfactionVal(id: number) {
        if (!this.loading){
            return localStorage.getItem('SatisfactionQuestionN' + id);
        }else return ''
    }

    public setSatisfactionVal(id: number, value: string) {
        localStorage.setItem('SatisfactionQuestionN' + id, value);
        this.setCanGoNextPage(id % 2 == 0 ? id : id - 1);
    }

    public getBoolVal(id: number) {
        if (!this.loading) {
            return localStorage.getItem('BoolQuestionN' + id);
        }else return ''
    }

    public setBoolVal(id: number, value: string) {
        localStorage.setItem('BoolQuestionN' + id, value);
        this.setCanGoNextPage(id % 2 == 0 ? id : id - 1);
    }

    public getMemoVal(id: number) {
        if (!this.loading) {
            return '' + localStorage.getItem('MemoQuestionN' + id);
        } else {
            return '';
        }
    }

    public setMemoVal(id: number, value: string) {
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
            //console.log(id + '    ' + this.satisfactionAnswers.indexOf(this.getSatisfactionVal(id)))
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

    public initialize(data: CustomerPoll[]) {
        for (let i = 0; i < data.length; i++) {
            if (data[i].satisfactionAnswer !== null) {
                localStorage.setItem(
                    'SatisfactionQuestionN' + i,
                    this.satisfactionAnswers[data[i].satisfactionAnswer],
                );
            }
            if (data[i].boolAnswer !== null) {
                localStorage.setItem(
                    'BoolQuestionN' + i,
                    this.boolAnswers[data[i].boolAnswer],
                );
            }
            localStorage.setItem('MemoQuestionN' + i, data[i].memo);
        }
    }

    public save() {
        let val = this.data;
        for (let i = 0; i < this.data.length; i++) {
            if (this.getSatisfactionVal(i)) {
                val[i].satisfactionAnswer = +this.getSatisfactionVal(i);
                localStorage.removeItem('SatisfactionQuestionN' + i);
            }
            if (this.getBoolVal(i)) {
                val[i].boolAnswer =
                    this.getBoolVal(i) === this.boolAnswers[0] ? 1 : 0;
                localStorage.removeItem('BoolQuestionN' + i);
            }
            if (this.getMemoVal(i)) {
                val[i].memo = this.getMemoVal(i);
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
