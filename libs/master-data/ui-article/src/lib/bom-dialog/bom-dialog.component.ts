import { Component, Inject, inject } from '@angular/core';

import { MaterialModule } from '@ss/common/api-common';
import { MatButtonModule } from '@angular/material/button';
import { ArticleIdAutoCompleteModel, ArticleService, BOM } from '@ss/master-data/api-article';
import { FormBuilder, Validators } from '@angular/forms';
import { UiAutoCompleteComponent } from '@ss/common/ui-auto-complete';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TranslateDirective, TranslatePipe } from '@ss/common/ui-lang';
import {JsonPipe} from "@angular/common";

@Component({
    selector: 'ss-bom-dialog',
    standalone: true,
    imports: [
        MatButtonModule,
        TranslateDirective,
        MaterialModule,
        TranslatePipe,
        UiAutoCompleteComponent,
    ],
    templateUrl: './bom-dialog.component.html',
    styleUrl: './bom-dialog.component.css',
})
export class BomDialogComponent {
    private articleSrv = inject(ArticleService);
    private fb = inject(FormBuilder);

    articleLookup = new ArticleIdAutoCompleteModel(this.articleSrv);
    form = this.fb.group( {
        id:                 [0],
        bomId:              [0],
        productId:          [0, Validators.required],
        qty:                [0, [Validators.required, Validators.min(0.000001)]],
        price:              [0],
        productRef:         [null],
        productDescription: [null]
    });

    bom: BOM|null = null;

    constructor(private dialogRef: MatDialogRef<BomDialogComponent>, @Inject(MAT_DIALOG_DATA) private data: BOM) {
        this.form.controls['id'].setValue(data.id || 0);
        this.form.controls['price'].setValue(data.price || 0);
        this.form.controls['qty'].setValue(data.qty || 0);
        this.form.controls['bomId'].setValue(data.bomId);
        this.form.controls['productId'].setValue(data.productId || 0);
        if (!data.bomId) {
            this.form.controls['qty'].disable();
            this.form.controls['price'].disable();
        }
        this.articleLookup.onObjectSelected = o => {
            this.form.controls['productRef'].setValue(o.reference);
            this.form.controls['productDescription'].setValue(o.description2 || o.reference);
        };
    }

    save() {
        this.dialogRef.close(this.form.getRawValue());
    }

    public cancel() {
        this.dialogRef.close();
    }
}
