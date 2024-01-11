import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseChildEntityListComponent } from '@ss/common/ui-base-entity';
import { CPoolDetail } from '@ss/costing/costing-utils';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '@ss/common/api-common';
import { CommonUiConfirmationDialogModule } from '@ss/common/ui-confirmation-dialog';
import { UiPaginationModule } from '@ss/common/ui-pagination';
import { CommonUiLangModule } from '@ss/common/ui-lang';
import { CostingPoolKeysService } from '@ss/costing/costing-projects';
import { FormBuilder, Validators } from '@angular/forms';
import { CostingKeyService } from '@ss/costing/costing-keys';
import { CommonUiAutoCompleteModule, DefaultAutoCompleteModel } from '@ss/common/ui-auto-complete';

@Component({
    selector: 'ss-costing-pool-keys',
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
    templateUrl: './costing-pool-keys.component.html',
    styleUrl: './costing-pool-keys.component.css',
})
export class CostingPoolKeysComponent extends BaseChildEntityListComponent<CPoolDetail> {
    private fb = inject(FormBuilder);
    private keySrv = inject(CostingKeyService);

    editMode = signal(false);
    form = this.fb.group({
        id:       [0],
        parentId: [0],
        key:      [0],
        value:    [0]
    });
    keyLookup = new DefaultAutoCompleteModel(this.keySrv);

    override displayedColumns = ['keyDescription', 'value'];

    constructor(protected override detailSrv: CostingPoolKeysService) {
        super(detailSrv, 'CPoolDetail');
    }

    override showDetail(id: number) {
        if (id) {
            this.detailSrv
                .get(id)
                .subscribe(res => this.form = this.fb.group({
                    id:       [id],
                    parentId: [this.detailSrv.getParentId()],
                    key:      [res.key],
                    value:    [res.value]
                }));
        } else {
            this.form = this.fb.group({
                id:       [0],
                parentId: [this.detailSrv.getParentId()],
                key:      [0, Validators.required],
                value:    [0, Validators.required]
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
