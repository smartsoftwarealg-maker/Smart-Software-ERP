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
    #_DATA_ = '_DATA_';
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
        const storage = localStorage.getItem(this.#_DATA_);
        if (storage) {
            try {
                this.data = JSON.parse(storage);
                this.setCanGoNextPage(0);
            } catch (e) {
                this.data = [];
            }

        }
        if ((this.data?.length||0) === 0) {
            this.customerPollSrv.getList(1, 1000).subscribe({
                next: (res) => {
                    this.data = res.body;
                    this.setStorage();
                    this.setCanGoNextPage(0);
                },
            });
        }
    }

    private setStorage() {
        localStorage.setItem(this.#_DATA_, JSON.stringify(this.data));
    }

    setCanGoNextPage(id: number) {
        this.completeState.set(
            this.isQuestionComplete(id) && this.isQuestionComplete(id + 1),
        );
    }

    public getSatisfactionVal(id: number) {
        return this.data[id].satisfactionAnswer;
    }

    public setSatisfactionVal(id: number, answer: number) {
        this.data[id].satisfactionAnswer = answer;
        this.setStorage();
        this.setCanGoNextPage(id % 2 == 0 ? id : id - 1);
    }

    public getBoolVal(id: number) {
        return this.data[id].boolAnswer;
    }

    public setBoolVal(id: number, answer: number) {
        this.data[id].boolAnswer = answer;
        this.setStorage();
        this.setCanGoNextPage(id % 2 == 0 ? id : id - 1);
    }

    public getMemoVal(id: number) {
        return this.data[id].memo;
    }

    public setMemoVal(id: number, value: string) {
        this.data[id].memo = value;
        this.setCanGoNextPage(id % 2 == 0 ? id : id - 1);
        this.setStorage();
    }

    public isQuestionComplete(id: number) {
        if (id >= this.data.length) {
            return true;
        } // if the question not exist, it will be consider success
        if (this.data[id].answerType === 0 && this.getMemoVal(id)) {
            return this.getMemoVal(id) != '';
        }

        if (this.data[id].answerType === 1) {
            return this.data[id].satisfactionAnswer !== null;
        }

        if (this.data[id].answerType === 2) {
            return this.data[id].boolAnswer !== null;
        }
        return false;
    }

    public save() {
        this.shellSrv.setLoading(true);
        const obs = this.httpSrv
            .put('/ssales/customer-poll', this.data)
            .pipe(map((res: { count: number }) => res['count']));

        obs.subscribe({
            next: () => {
                this.shellSrv.setLoading(false);
                this.showThanksMessage = true;
                localStorage.removeItem(this.#_DATA_);
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
