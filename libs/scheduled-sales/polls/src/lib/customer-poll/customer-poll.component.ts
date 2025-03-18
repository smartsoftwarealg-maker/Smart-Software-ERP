import { Component, inject } from '@angular/core';
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

    ngOnInit() {
        this.shellSrv.setGoBackPath('../..', this.route);
        this.showThanksMessage = false;
        this.customerPollSrv.getList(1, 1000).subscribe({
            next: (res) => {
                this.data = res.body;
                console.log(res);
            },
        });
    }

    public setLocal(name: string, value: string) {
        localStorage.setItem(name, value);
    }

    public getLocal(name: string) {
        return localStorage.getItem(name);
    }

    public getSatisfactionVal(id: number) {
        return this.data[id].satisfactionAnswer
            ? this.data[id].satisfactionAnswer
            : localStorage.getItem('SatisfactionQuestionN' + id)
              ? +localStorage.getItem('SatisfactionQuestionN' + id)
              : -1;
    }

    public getBoolVal(id: number) {
        return this.data[id].bollAnswer
            ? this.data[id].bollAnswer
            : localStorage.getItem('BoolQuestionN' + id);
    }

    public getMemoVal(id: number) {
        return this.data[id].memo
            ? this.data[id].memo
            : localStorage.getItem('MemoQuestionN' + id);
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
            this.data[id].bollAnswer ||
            localStorage.getItem('BoolQuestionN' + id)
                ? 1
                : 0;

        const memoQuestion =
            this.data[id].memo || localStorage.getItem('MemoQuestionN' + id)
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
                val[i].bollAnswer = this.getLocal('BoolQuestionN' + i);
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
                this.shellSrv.goBack();
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
