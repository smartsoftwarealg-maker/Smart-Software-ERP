import { Component, inject } from '@angular/core';
import { BaseEntityDetailComponent } from '@ss/common/ui-base-entity';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { ActivatedRoute } from '@angular/router';
import { ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { CMMSAssetReadingService } from '../cmms-asset-reading.service';
import { CommonUiAutoCompleteModule, DefaultAutoCompleteModel } from '@ss/common/ui-auto-complete';
import { CMMSMeterService } from '@ss/cmms/lookups';
import { AssetReading } from '@ss/cmms/cmms-api';
import { CommonModule } from '@angular/common';
import { CommonUiLangModule } from '@ss/common/ui-lang';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { UiPaginationModule } from '@ss/common/ui-pagination';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonUiDatepickerModule } from '@ss/common/ui-datepicker';

@Component({
    selector: 'ss-asset-reading-detail',
    templateUrl: './asset-reading-detail.component.html',
    styleUrls: ['./asset-reading-detail.component.css'],
    standalone: true,
    imports: [
        CommonModule,
        CommonUiLangModule,
        MatSortModule,
        MatTableModule,
        UiPaginationModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule,
        CommonUiDatepickerModule,
        CommonUiAutoCompleteModule
    ],
})
export class AssetReadingDetailComponent extends BaseEntityDetailComponent<AssetReading> {
    protected meterSrv = inject(CMMSMeterService);

    meterLookup = new DefaultAutoCompleteModel(this.meterSrv);

    constructor(
        public override entitySrv: CMMSAssetReadingService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override formBuilder: UntypedFormBuilder,
        public override confirmationSrv: ConfirmationDialogService) {
        super(entitySrv, shellSrv, snackBarSrv, route, formBuilder, confirmationSrv, 'CMMS_READINGS');
    }

    setupForm(e: AssetReading): UntypedFormGroup {
        this.saveButton.visible = this.entitySrv.getParentId() > 0;
        return this.formBuilder.group({
            id:       [e.id],
            parentId: [e.parentId || this.entitySrv.getParentId()],
            meterId:  [e.meterId, Validators.required],
            date:     [e.date || new Date(), Validators.required],
            amount:   [e.amount, Validators.required]
        });
    }
}
