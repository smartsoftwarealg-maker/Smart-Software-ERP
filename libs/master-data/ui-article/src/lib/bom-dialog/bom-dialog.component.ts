import { Component, Inject, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@ss/common/api-common';
import { CommonUiLangModule } from '@ss/common/ui-lang';
import { MatButtonModule } from '@angular/material/button';
import { CommonUiDatepickerModule } from '@ss/common/ui-datepicker';
import { UiPaginationModule } from '@ss/common/ui-pagination';
import { ArticleService, BOM } from '@ss/master-data/api-article';
import { FormBuilder, Validators } from '@angular/forms';
import { CommonUiAutoCompleteModule, DefaultAutoCompleteModel } from '@ss/common/ui-auto-complete';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'ss-bom-dialog',
    standalone: true,
    imports: [
        CommonModule,
        CommonUiLangModule,
        MatButtonModule,
        MaterialModule,
        CommonUiDatepickerModule,
        UiPaginationModule,
        CommonUiAutoCompleteModule
    ],
    templateUrl: './bom-dialog.component.html',
    styleUrl: './bom-dialog.component.css',
})
export class BomDialogComponent {
    private articleSrv = inject(ArticleService);
    private fb = inject(FormBuilder);

    articleLookup = new DefaultAutoCompleteModel(this.articleSrv, 'id', 'description2');
    form = this.fb.group( {
        id:               [0],
        parentId:         [0],
        childId:          [0, Validators.required],
        qty:              [0, [Validators.required, Validators.min(1)]],
        price:            [0, [Validators.required, Validators.min(1)]],
        childRef:         [null],
        childDescription: [null]
    });

    bom: BOM|null = null;

    constructor(private dialogRef: MatDialogRef<BomDialogComponent>, @Inject(MAT_DIALOG_DATA) private data: BOM) {
        this.form.controls['id'].setValue(data.id || 0);
        this.form.controls['price'].setValue(data.price || 0);
        this.form.controls['qty'].setValue(data.qty || 0);
        this.form.controls['parentId'].setValue(data.parentId);
        this.form.controls['childId'].setValue(data.childId || 0);
        if (!data.parentId) {
            this.form.controls['qty'].disable();
            this.form.controls['price'].disable();
        }
        this.articleLookup.onObjectSelected = o => {
            this.form.controls['childRef'].setValue(o.reference);
            this.form.controls['childDescription'].setValue(o.description2 || o.reference);
        };
    }

    save() {
        this.dialogRef.close(this.form.getRawValue());
    }

    public cancel() {
        this.dialogRef.close();
    }
}
