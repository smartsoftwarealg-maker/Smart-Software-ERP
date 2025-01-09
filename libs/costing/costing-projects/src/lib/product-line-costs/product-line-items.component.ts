import { Component, EventEmitter, inject, Output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseChildEntityListComponent } from '@ss/common/ui-base-entity';
import { CLineCost } from '@ss/costing/costing-utils';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '@ss/common/api-common';



import { FormBuilder, Validators } from '@angular/forms';
import { DefaultAutoCompleteModel, UiAutoCompleteComponent } from '@ss/common/ui-auto-complete';
import { CostingItemService } from '@ss/costing/costing-items';
import { ProductLineCostsService } from '../services/product-line-costs.service';
import { TranslateDirective, TranslatePipe } from '@ss/common/ui-lang';
import { PaginationComponent } from '@ss/common/ui-pagination';

@Component({
    selector: 'ss-product-line-items',
    standalone: true,
    imports: [
        CommonModule,
        RouterModule,
        MaterialModule,
        TranslateDirective,
        TranslatePipe,
        UiAutoCompleteComponent,
        PaginationComponent
    ],
    templateUrl: './product-line-items.component.html',
    styleUrl: './product-line-items.component.css',
})
export class CProductLineCostComponent extends BaseChildEntityListComponent<CLineCost> {
    private fb = inject(FormBuilder);
    private itemSrv = inject(CostingItemService);
    @Output() startedEdit = new EventEmitter<boolean>(false);

    editMode = signal(false);
    form = this.fb.group({
        id:       [0],
        parentId: [0],
        itemId:   [0],
        costType: [1],
        value:    [0],
    });
    itemLookup = new DefaultAutoCompleteModel(this.itemSrv);

    override displayedColumns = ['itemDescription', 'value'];

    constructor(protected override detailSrv: ProductLineCostsService) {
        super(detailSrv, 'CPoolDetail');
    }

    override showDetail(id: number) {
        if (id) {
            this.detailSrv
                .get(id)
                .subscribe(res => this.form = this.fb.group({
                    id:       [id],
                    parentId: [this.detailSrv.getParentId()],
                    itemId:   [res.itemId],
                    value:    [res.value],
                    costType: [res.costType]
                }));
        } else {
            this.form = this.fb.group({
                id:       [0],
                parentId: [this.detailSrv.getParentId()],
                itemId:   [0, Validators.required],
                value:    [0, Validators.required],
                costType: [1, Validators.required],
            });
        }
        this.editMode.set(true);
        this.startedEdit.emit(true);
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
                    this.startedEdit.emit(false);
                }, error: err => {
                    this.editMode.set(false);
                    this.startedEdit.emit(false);
                    throw err;
                }
            });
    }

    cancel() {
        this.editMode.set(false);
        this.startedEdit.emit(false);
    }
}
