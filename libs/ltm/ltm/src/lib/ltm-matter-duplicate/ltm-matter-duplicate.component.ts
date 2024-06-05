import { Component, Inject, inject, signal } from "@angular/core";
import { LTMLineMatter, LTMMatter } from '../ltm-api';
import { RouterOutlet } from "@angular/router";
import { CommonUiConfirmationDialogModule } from "@ss/common/ui-confirmation-dialog";
import { MaterialModule } from "@ss/common/api-common";
import {LtmMatterService} from '../services/ltm-matter.service';
import { CommonModule } from "@angular/common";
import { CommonUiLangModule } from "@ss/common/ui-lang";
import { UiPaginationModule } from "@ss/common/ui-pagination";
import { FormControl, ReactiveFormsModule } from "@angular/forms";
import { LogisticsUiDocInfoModule } from "@ss/logistics/ui-doc-info";
import { AppArchiveModule } from "@ss/common/app-archive";
import { CommonUiAutoCompleteModule, DefaultAutoCompleteModel } from '@ss/common/ui-auto-complete';
import { CommonUiDatepickerModule } from "@ss/common/ui-datepicker";
import { CommonUiHourPickerModule } from "@ss/common/ui-hour-picker";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";

@Component({
    selector: 'ss-ltm-matter-list',
    templateUrl: './ltm-matter-duplicate.component.html',
    styleUrls: ['./ltm-matter-duplicate.component.scss'],
    standalone: true,
    imports: [
        CommonModule,
        MaterialModule,
        CommonUiLangModule,
        UiPaginationModule,
        ReactiveFormsModule,
        CommonUiConfirmationDialogModule,
        LogisticsUiDocInfoModule,
        AppArchiveModule,
        CommonUiAutoCompleteModule,
        CommonUiDatepickerModule,
        RouterOutlet,
        CommonUiHourPickerModule
    ],
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
