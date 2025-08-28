import { Component, inject, OnInit } from '@angular/core';
import {BudgetTransferDetail} from '../budget-movement-api';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute, Router} from '@angular/router';
import { UntypedFormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {switchMap, tap} from 'rxjs/operators';
import {Observable, of} from 'rxjs';
import {BudgetTransferService} from '../budget-transfer.service';
import {Budget, BudgetService} from '@ss/budget/budget';
import { MatSelectChange, MatSelect } from '@angular/material/select';
import {BudgetPlanningService} from '@ss/budget/budget-planning';
import {DefaultAutoCompleteModel} from '@ss/common/ui-auto-complete';
import {BudgetTransferDetailService} from '../budget-transfer-detail.service';
import { AsyncPipe } from '@angular/common';
import { MatCard, MatCardHeader, MatCardContent } from '@angular/material/card';
import { MatMiniFabButton } from '@angular/material/button';
import { MatTooltip } from '@angular/material/tooltip';
import { TranslateDirective } from '@ss/common/ui-lang';
import { MatFormField, MatLabel, MatError } from '@angular/material/form-field';
import { MatOption } from '@angular/material/core';
import { UiAutoCompleteComponent } from '@ss/common/ui-auto-complete';
import { MatInput } from '@angular/material/input';
import { TranslatePipe } from '@ss/common/ui-lang';

@Component({
    selector: 'ss-budget-line-detail',
    templateUrl: './budget-transfer-line-detail.component.html',
    styleUrls: ['./budget-transfer-line-detail.component.scss'],
    standalone: true,
    imports: [
    MatCard,
    MatCardHeader,
    MatMiniFabButton,
    MatTooltip,
    TranslateDirective,
    MatCardContent,
    FormsModule,
    ReactiveFormsModule,
    MatFormField,
    MatLabel,
    MatSelect,
    MatOption,
    UiAutoCompleteComponent,
    MatInput,
    MatError,
    AsyncPipe,
    TranslatePipe
],
})
export class BudgetTransferLineDetailComponent implements OnInit {
    private entitySrv = inject(BudgetTransferService);
    private detailSrv = inject(BudgetTransferDetailService);
    private shellSrv = inject(ShellService);
    private snackBarSrv = inject(SnackBarService);
    private route = inject(ActivatedRoute);
    private router = inject(Router);
    private formBuilder = inject(UntypedFormBuilder);
    private budgetSrv = inject(BudgetService);
    private confirmationSrv = inject(ConfirmationDialogService);
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
