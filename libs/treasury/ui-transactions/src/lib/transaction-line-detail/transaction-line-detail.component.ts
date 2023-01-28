import { Component, OnInit } from '@angular/core';
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
    form: UntypedFormGroup = null;
    constructor(private entitySrv: TransactionLineService,
                private snackBarSrv: SnackBarService,
                private route: Router,
                private router: ActivatedRoute,
                private fb: FormBuilder) {}

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
                    this.entitySrv.setParentId(+res.get('id') || 0)
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
                    vat:         [line.vat || 0, Validators.required],
                })
            });

    }

    goBack() {
        this.route.navigate(['..'], { relativeTo: this.router }).then();
    }

    save() {
        this.entitySrv
            .save(this.form.getRawValue())
            .subscribe({
                next: res => {
                    this.snackBarSrv.showSuccessMessage();
                    this.goBack();
                },
                error: err => {
                    this.snackBarSrv.showFailureMessage();
                    throw err;
                }
            })
    }
}
