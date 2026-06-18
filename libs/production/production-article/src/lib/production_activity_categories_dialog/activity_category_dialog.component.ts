import { Component, Inject, inject, ChangeDetectionStrategy } from '@angular/core';
import { LoginService, MaterialModule } from '@ss/common/api-common';
import { MatButtonModule } from '@angular/material/button';
import { ActivityCategory } from '@ss/master-data/api-article';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TranslateDirective, TranslatePipe } from '@ss/common/ui-lang';

@Component({
    selector: 'ss-active-category-dialog',
    standalone: true,
    imports: [
        MatButtonModule,
        TranslateDirective,
        MaterialModule,
        TranslatePipe,
    ],
    templateUrl: './activity_category-dialog.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    styleUrl: './activity_category_dialog.component.scss',
})
export class ActivityCategoryDialogComponent {
    private loginSrv = inject(LoginService);
    private fb = inject(FormBuilder);

    readonly costElementGroups: string[] = [
        "DL-REG",
        "DL-OT",
        "DL-SETUP",
        "MCH-RUN",
        "MCH-DEPR",
        "MCH-MAINT",
        "OH-LABOR",
        "OH-MACH",
        "OH-UTIL"
    ];

    form = this.fb.group({
        id: [],
        parentId: [],
        code: ['', Validators.required],
        name: ['', Validators.required],
        description: [''],
        glAccountId: [0],
        costElementGroup: [''],
        colorCode: [''],
        isOverhead: [false],
        isVariable: [false],
        isActive: [false],
        createdAt: [],
        updatedAt: [],
        createdBy: [],
        updatedBy: [],
        deletedAt: [],
    });

    category: ActivityCategory | null = null;

    constructor(
        private dialogRef: MatDialogRef<ActivityCategoryDialogComponent>,
        @Inject(MAT_DIALOG_DATA) private data: ActivityCategory,
    ) {
        this.form.controls['id'].setValue(data.id || 0);
        this.form.controls['parentId'].setValue(data.parentId);
        this.form.controls['code'].setValue(data.code || '');
        this.form.controls['name'].setValue(data.name || '');
        this.form.controls['glAccountId'].setValue(data.glAccountId);
        this.form.controls['colorCode'].setValue(data.colorCode);
        this.form.controls['description'].setValue(data.description);
        this.form.controls['isOverhead'].setValue(data.isOverhead);
        this.form.controls['isActive'].setValue(data.isActive);
        this.form.controls['costElementGroup'].setValue(data.costElementGroup);
        this.form.controls['createdAt'].setValue(data.createdAt || new Date());
        this.form.controls['updatedAt'].setValue(data.updatedAt || new Date());
        this.form.controls['createdBy'].setValue(data.createdBy || this.loginSrv.appCtx.id);
        this.form.controls['updatedBy'].setValue(data.updatedBy || this.loginSrv.appCtx.id,);
    }

    save() {
        this.dialogRef.close(this.form.getRawValue());
    }

    public cancel() {
        this.dialogRef.close();
    }
}
