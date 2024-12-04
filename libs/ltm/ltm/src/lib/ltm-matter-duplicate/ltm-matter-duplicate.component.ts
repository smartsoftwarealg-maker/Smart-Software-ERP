import { Component, Inject, inject, signal } from "@angular/core";
import { LTMLineMatter, LTMMatter } from '@ltm/ltm-api';
import { MaterialModule } from "@ss/common/api-common";
import {LtmMatterService} from '@ltm/ltm-api';
import { CommonModule } from "@angular/common";
import { FormControl, ReactiveFormsModule } from "@angular/forms";
import { DefaultAutoCompleteModel, UiAutoCompleteComponent } from '@ss/common/ui-auto-complete';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { TranslateDirective, TranslatePipe } from '@ss/common/ui-lang';

@Component({
    selector: 'ss-ltm-matter-list',
    templateUrl: './ltm-matter-duplicate.component.html',
    styleUrls: ['./ltm-matter-duplicate.component.scss'],
    standalone: true,
    imports: [
        CommonModule,
        MaterialModule,
        TranslateDirective,
        ReactiveFormsModule,

        TranslatePipe,
        UiAutoCompleteComponent
    ]
})
export class LtmMatterDuplicateComponent {
    private dialogRef = inject(MatDialogRef<LtmMatterDuplicateComponent>);
    private matterSrv = inject(LtmMatterService);

    processing = signal(false);
    description = new FormControl<number>(0);
    matterLookup = new DefaultAutoCompleteModel(this.matterSrv);

    constructor(@Inject(MAT_DIALOG_DATA) protected data: LTMLineMatter) {}

    public cancel() {
        this.dialogRef.close({success: false});
    }

    duplicate() {
        this.matterSrv
            .duplicate(this.data.matterId, {...this.data, matterId: this.description.value })
            .subscribe({
                next: _ => {
                    this.dialogRef.close({success: true});
                },
                error: err => {
                    this.dialogRef.close({success: false});
                    throw err;
                }
            });
    }
}
