import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {PayrollMonthService} from '../payroll-month.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {SnackBarService} from '@ss/common/ui-shell';
import {of, switchMap, tap, zip} from 'rxjs';

@Component({
  selector: 'ss-month-selector',
  templateUrl: './month-selector.component.html',
  styleUrls: ['./month-selector.component.scss']
})
export class MonthSelectorComponent implements OnInit {
    private minMonth = 0;
    private maxMonth = 0;
    form: FormGroup = null;
    processing = false;

    constructor(private selectorSrv: PayrollMonthService,
                private formBuilder: FormBuilder,
                private router: Router,
                private activatedRoute: ActivatedRoute,
                private confirmationSrv: ConfirmationDialogService,
                private snackBarSrv: SnackBarService) {
    }

    ngOnInit(): void {

        zip(this.selectorSrv.minMonth(),
            this.selectorSrv.maxMonth(),
            this.selectorSrv.ctx())
            .subscribe(res => {
                this.minMonth  = res[0].month;
                this.maxMonth  = res[1].month;
                const min      = +(res[0].month / 100).toFixed(0);
                const max      = +(res[1].month / 100).toFixed(0);
                const curYear  = +(res[2].payMonth / 100).toFixed(0);
                const curMonth = +(res[2].payMonth % 100).toFixed(0);
                this.form = this.formBuilder
                    .group({
                        year: [curYear, [Validators.required, Validators.min(min), Validators.max(max)]],
                        month: [curMonth, [Validators.required, Validators.min(1), Validators.max(12)]],
                    })
            })
    }

    cancel() {
        this.router.navigate(['../'], { relativeTo: this.activatedRoute });
    }

    close() {
        const year  = this.form.controls['year'].value;
        const month = this.form.controls['month'].value;
        const payMonth = year * 100 + month;
        if (payMonth >= this.minMonth && payMonth <= this.maxMonth) {
            this.selectorSrv.selectMonth(payMonth)
                .subscribe({
                        next: _ => {
                            this.processing = false;
                            this.snackBarSrv.showSuccessMessage();
                            this.router.navigate(['../'], {relativeTo: this.activatedRoute});
                        },
                        error: err => {
                            this.processing = false;
                            throw err;
                        }
                    }
                );
        } else
            this.snackBarSrv.showFailureMessage();
    }
}
