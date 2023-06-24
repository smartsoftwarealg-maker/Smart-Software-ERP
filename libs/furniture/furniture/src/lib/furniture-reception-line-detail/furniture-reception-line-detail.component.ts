import { Component, inject, OnInit } from '@angular/core';
import {of} from 'rxjs';
import {BudgetService} from '@ss/budget/budget';
import {DefaultAutoCompleteModel} from '@ss/common/ui-auto-complete';
import {UntypedFormBuilder, Validators} from '@angular/forms';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute, Router} from '@angular/router';
import {BudgetPlanningService} from '@ss/budget/budget-planning';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {switchMap, tap} from 'rxjs/operators';
import {MatSelectChange} from '@angular/material/select';
import {FurnitureService} from '../furniture.service';
import {FurnitureTransactionDetail} from '../furniture-api';
import {FurnitureReceptionService} from '../furniture-reception.service';
import {FurnitureTransactionLineService} from '../furniture-transaction-line.service';

@Component({
    selector: 'ss-furniture-reception-line-detail',
    templateUrl: './furniture-reception-line-detail.component.html',
    styleUrls: ['./furniture-reception-line-detail.component.scss'],
})
export class FurnitureReceptionLineDetailComponent implements OnInit {
    private entitySrv  = inject(FurnitureReceptionService);
    private detailSrv  = inject(FurnitureTransactionLineService);
    private shellSrv  = inject(ShellService);
    private snackBarSrv  = inject(SnackBarService);
    private route  = inject(ActivatedRoute);
    private router  = inject(Router);
    private formBuilder  = inject(UntypedFormBuilder);
    private budgetSrv  = inject(BudgetService);
    private planningSrv  = inject(BudgetPlanningService);
    private furnitureSrv  = inject(FurnitureService);
    private confirmationSrv  = inject(ConfirmationDialogService);

    furnitureLookup = new DefaultAutoCompleteModel(this.furnitureSrv);

    form = this.formBuilder.group( {
        id:          [0],
        parentId:    [null, Validators.required],
        furniture:   [null, Validators.required],
        qty:         [0,    Validators.required],
        price:       [0],
    })


    ngOnInit(): void {
        this.route
            .parent
            .parent
            .paramMap
            .pipe(
                tap(params => {
                    const id = +(params.get('id')||'0');
                    this.form.controls['parentId'].setValue(id);
                    this.detailSrv.setParentId(id);
                }),
                switchMap(_ => this.route.paramMap),
                switchMap(params => {
                    const id = +(params.get('id')||'0');
                    const parentId = this.form.controls['parentId'].value;
                    return id > 0?
                        this.detailSrv.get(id) :
                        of(<FurnitureTransactionDetail> { id: 0, parentId: parentId, furniture: null, qty: 0, price: 0});
                }))
            .subscribe(bt => {
                this.form.controls['id'].setValue(bt.id);
                this.form.controls['parentId'].setValue(bt.parentId);
                this.form.controls['furniture'].setValue(bt.furniture);
                this.form.controls['qty'].setValue(bt.qty);
                this.form.controls['price'].setValue(bt.price);
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
