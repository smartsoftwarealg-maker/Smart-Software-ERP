import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseChildEntityListComponent } from '@ss/common/ui-base-entity';
import { CLineCost } from '@ss/costing/costing-utils';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '@ss/common/api-common';
import { CommonUiConfirmationDialogModule } from '@ss/common/ui-confirmation-dialog';
import { UiPaginationModule } from '@ss/common/ui-pagination';
import { CommonUiLangModule } from '@ss/common/ui-lang';
import { FormBuilder, Validators } from '@angular/forms';
import { CommonUiAutoCompleteModule, DefaultAutoCompleteModel } from '@ss/common/ui-auto-complete';
import { CostingItemService } from '@ss/costing/costing-items';
import { ProductLineCostsService } from '../services/product-line-costs.service';
import { CostingPoolsCostsService } from "../services/costing-pools-costs.service";

@Component({
    selector: 'ss-costing-pools-costs',
    standalone: true,
    imports: [
        CommonModule,
        RouterModule,
        MaterialModule,
        CommonUiConfirmationDialogModule,
        UiPaginationModule,
        CommonUiLangModule,
        CommonUiAutoCompleteModule
    ],
    templateUrl: './costing-pool-costs.component.html',
    styleUrl: './costing-pool-costs.component.css',
})
export class CostingPoolCostComponent extends BaseChildEntityListComponent<CLineCost> {
    private fb = inject(FormBuilder);
    private itemSrv = inject(CostingItemService);

    editMode = signal(false);
    form = this.fb.group({
        id:       [0],
        parentId: [0],
        itemId:   [0],
        value:    [0],
    });
    itemLookup = new DefaultAutoCompleteModel(this.itemSrv);

    override displayedColumns = ['keyDescription', 'value'];

    constructor(protected override detailSrv: CostingPoolsCostsService) {
        super(detailSrv, 'CPoolCost');
    }

    override showDetail(id: number) {
        if (id) {
            this.detailSrv
                .get(id)
                .subscribe(res => this.form = this.fb.group({
                    id:       [id],
                    parentId: [this.detailSrv.getParentId()],
                    itemId:    [res.itemId],
                    value:    [res.value],
                }));
        } else {
            this.form = this.fb.group({
                id:       [0],
                parentId: [this.detailSrv.getParentId()],
                itemId:   [0, Validators.required],
                value:   [0, Validators.required],
            });
        }
        this.editMode.set(true);
    }

    save() {
        this.detailSrv
            .save(this.form.getRawValue())
            .subscribe({
                next: res => {
                    if (res) {
                        this.snackBarSrv.showSuccessMessage();
                    } else {
                        this.snackBarSrv.showFailureMessage();
                    }
                    this.editMode.set(false);
                }, error: err => {
                    this.editMode.set(false);
                    throw err;
                }
            });
    }

    cancel() {
        this.editMode.set(false);
    }
}
