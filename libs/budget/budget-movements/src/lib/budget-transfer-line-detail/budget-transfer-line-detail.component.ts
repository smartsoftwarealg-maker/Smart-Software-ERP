import { Component, inject, OnInit } from '@angular/core';
import {BudgetTransferDetail} from '../budget-movement-api';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute, Router} from '@angular/router';
import {UntypedFormBuilder, Validators} from '@angular/forms';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {switchMap, tap} from 'rxjs/operators';
import {Observable, of} from 'rxjs';
import {BudgetTransferService} from '../budget-transfer.service';
import {Budget, BudgetService} from '@ss/budget/budget';
import {MatSelectChange} from '@angular/material/select';
import {BudgetPlanningService} from '@ss/budget/budget-planning';
import {DefaultAutoCompleteModel} from '@ss/common/ui-auto-complete';
import {BudgetTransferDetailService} from '../budget-transfer-detail.service';

@Component({
    selector: 'ss-budget-line-detail',
    templateUrl: './budget-transfer-line-detail.component.html',
    styleUrls: ['./budget-transfer-line-detail.component.scss'],
})
export class BudgetTransferLineDetailComponent implements OnInit {
    destinations$: Observable<Budget[]> = null;
    private planningSrv = inject(BudgetPlanningService);
    planningLookup = new DefaultAutoCompleteModel(this.planningSrv);
    form = this.formBuilder.group( {
        id:          [0],
        transferId:  [null, Validators.required],
        planningId:  [null, Validators.required],
        amount:      [0,    Validators.required],
        description: [null],
    });

    constructor(
        private entitySrv: BudgetTransferService,
        private detailSrv: BudgetTransferDetailService,
        private shellSrv: ShellService,
        private snackBarSrv: SnackBarService,
        private route: ActivatedRoute,
        private router: Router,
        private formBuilder: UntypedFormBuilder,
        private budgetSrv: BudgetService,
        private confirmationSrv: ConfirmationDialogService) {
    }


    ngOnInit(): void {
        this.destinations$ = this.entitySrv.getSources(this.budgetSrv.budget.year);
        this.route
            .parent
            .parent
            .paramMap
            .pipe(
                tap(params => {
                    const id = +(params.get('id')||'0');
                    this.form.controls['planningId'].setValue(id);
                    this.detailSrv.setParentId(id);
                }),
                switchMap(_ => this.route.paramMap),
                switchMap(params => {
                    const id = +(params.get('id')||'0');
                    const planningId = this.form.controls['planningId'].value;
                    return id > 0?
                        this.entitySrv.getDetail(planningId, id) :
                        of(<BudgetTransferDetail> { id: 0, transferId: planningId, planningId: 0, amount: 0});
                }))
            .subscribe(bt => {
                this.form.controls['id'].setValue(bt.id);
                this.form.controls['transferId'].setValue(bt.transferId);
                this.form.controls['planningId'].setValue(bt.planningId);
                this.form.controls['amount'].setValue(bt.amount);
                this.form.controls['description'].setValue(bt.description);
            });
    }

    save() {
        this.detailSrv
            .save(this.form.getRawValue())
            .subscribe(res => {
                if (res) {
                    this.snackBarSrv.showSuccessMessage();
                    this.router.navigate(['../../'], { relativeTo: this.route}).then();
                }
            });
    }

    cancel() {
        const obs = this.form.dirty ?
            this.confirmationSrv.confirm('COMMON_CANCEL', 'COMMON_CANCEL') :
            of(true);
        obs.subscribe(res => {
            if (res) {
                this.router.navigate(['../../'], { relativeTo: this.route}).then();
            }
        });
    }

    onDestination(event: MatSelectChange) {
        this.planningSrv.setParentId(event.value);
    }
}
