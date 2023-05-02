import { Component, inject, OnInit } from "@angular/core";
import {TransactionLineService, TTransactionLine} from '@ss/treasury/api-transactions';
import {SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import {switchMap} from 'rxjs/operators';
import {of} from 'rxjs';

@Component({
    selector: 'ss-transaction-line-detail',
    templateUrl: './transaction-line-detail.component.html',
    styleUrls: ['./transaction-line-detail.component.scss'],
})
export class TransactionLineDetailComponent implements OnInit {
    private fb = inject(FormBuilder);
    form: UntypedFormGroup = null;
    constructor(private entitySrv: TransactionLineService,
                private snackBarSrv: SnackBarService,
                private route: Router,
                private router: ActivatedRoute) {}

    ngOnInit(): void {
        const newLine: TTransactionLine = {
            id: 0,
            transacId: this.entitySrv.getParentId(),
            amount: 0,
            vat: 0
        };

        this.router
            .parent
            .parent
            .paramMap
            .pipe(switchMap(res => {
                this.entitySrv.setParentId(+res.get('id') || 0);
                return this.router.paramMap;
            }),
            switchMap(res => {
                const id = +res.get('id');
                return id > 0 ? this.entitySrv.get(id) : of(newLine);
            }))
            .subscribe(line => {
                this.form = this.fb.group({
                    id:          [line.id],
                    transacId:   [line.transacId || 0],
                    invoiceNo:   [line.invoiceNo],
                    invoiceDate: [line.invoiceDate || new Date()],
                    description: [line.description, Validators.required],
                    amount:      [line.amount || 0, Validators.required],
                    income:      [{ value: line.amount > 0? line.amount : 0, disabled: line.amount < 0 }],
                    expense:     [{ value: line.amount > 0? 0 : -line.amount, disabled: line.amount > 0 }],
                    vat:         [line.vat || 0, Validators.required],
                });
            });

    }

    goBack() {
        this.route.navigate(['..'], { relativeTo: this.router }).then();
    }

    save() {
        const value = this.form.getRawValue();
        value.amount = (value.income ||0) - (value.expense || 0);
        this.entitySrv
            .save(value)
            .subscribe({
                next: res => {
                    this.snackBarSrv.showSuccessMessage();
                    this.goBack();
                },
                error: err => {
                    this.snackBarSrv.showFailureMessage();
                    throw err;
                }
            });
    }

    onAmount() {
        const income = +this.form.value['income'] || 0;
        const expense = +this.form.value['expense'] || 0;
        this.form.controls['income'].enable({ onlySelf: true });
        this.form.controls['expense'].enable({ onlySelf: true });
        if (income - expense > 0.0) {
            this.form.controls['income'].enable({ onlySelf: true });
            this.form.controls['expense'].disable({ onlySelf: true });
        } else if (income - expense < 0) {
            this.form.controls['expense'].enable({ onlySelf: true });
            this.form.controls['income'].disable({ onlySelf: true });
        }
    }
}
