import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseChildEntityDetailComponent } from '@ss/common/ui-base-entity';
import { DriverLicense } from '../driver-api';
import { DriverLicenseService } from '../services/driver-license.service';
import { FormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { CommonUiAutoCompleteModule } from '@ss/common/ui-auto-complete';
import { CommonUiLangModule } from '@ss/common/ui-lang';
import { CommonUiDatepickerModule } from '@ss/common/ui-datepicker';
import { MaterialModule } from '@ss/common/api-common';
import { UiPaginationModule } from '@ss/common/ui-pagination';
import { CommonUiConfirmationDialogModule } from '@ss/common/ui-confirmation-dialog';
import { RouterModule } from '@angular/router';


@Component({
    selector: 'ss-driver-license-detail',
    standalone: true,
    imports: [
        CommonModule,
        MaterialModule,
        CommonUiLangModule,
        UiPaginationModule,
        CommonUiConfirmationDialogModule,
        CommonUiDatepickerModule,
        RouterModule,
        CommonUiAutoCompleteModule,
        CommonUiDatepickerModule
    ],
    templateUrl: './driver-license-detail.component.html',
    styleUrls: ['./driver-license-detail.component.css']
})
export class DriverLicenseDetailComponent extends BaseChildEntityDetailComponent<DriverLicense> {
    private fb = inject(FormBuilder);

    constructor(protected override entitySrv: DriverLicenseService) {
        super(entitySrv, 'DriverLicense');
    }

    setupForm(e: DriverLicense): UntypedFormGroup {
        return this.fb.group( {
            id:          [e.id],
            parentId:    [e.parentId || this.entitySrv.getParentId()],
            licenseType: [e.licenseType, Validators.required],
            from:        [e.from, Validators.required],
            to:          [e.to, Validators.required],
        });
    }
}
