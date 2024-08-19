import { Component, inject, OnInit } from '@angular/core';
import { BaseChildEntityDetailComponent, BaseEntityDetailComponent } from '@ss/common/ui-base-entity';
import { DepreciationRate } from '../assets-api';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { HttpService, MaterialModule } from '@ss/common/api-common';
import { CommonUiConfirmationDialogModule, ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { LookupsService } from '@ss/common/api-lookup';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { DepreciationRateService } from '../services/depreciation-rate.service';
import { CommonModule } from '@angular/common';
import { CommonUiLangModule } from '@ss/common/ui-lang';
import { CommonUiImageInputModule } from '@ss/common/ui-image-input';
import { UiPaginationModule } from '@ss/common/ui-pagination';
import { CommonUiAutoCompleteModule } from '@ss/common/ui-auto-complete';
import { CommonUiDatepickerModule } from '@ss/common/ui-datepicker';
import { CustomAttributesModule } from '@ss/custom-attributes';
import { AppArchiveModule } from '@ss/common/app-archive';
import { QRCodeModule } from 'angularx-qrcode';

@Component({
    selector: 'ss-depreciation-rate-detail',
    templateUrl: './depreciation-rate-detail.component.html',
    styleUrls: ['./depreciation-rate-detail.component.scss'],
    standalone: true,
    imports: [
        CommonModule,
        MaterialModule,
        CommonUiLangModule,
        CommonUiImageInputModule,
        UiPaginationModule,
        CommonUiConfirmationDialogModule,
        CommonUiAutoCompleteModule,
        CommonUiDatepickerModule,
        RouterModule,
        CustomAttributesModule,
        AppArchiveModule,
        QRCodeModule
    ]

})
export class DepreciationRateDetailComponent extends BaseChildEntityDetailComponent<DepreciationRate> implements OnInit {
    private parentId = 0;
    private formBuilder = inject(UntypedFormBuilder);

    constructor(public rateSrv: DepreciationRateService) {
        super(rateSrv, 'DepreciationRate');
    }

    public override setupForm(a: DepreciationRate): UntypedFormGroup {
        return this.form = this.formBuilder.group({
            id: [a.id],
            parentId: [a.parentId || this.parentId, Validators.required],
            year: [a.year, Validators.required],
            rate: [a.rate, Validators.required]
        });
    }

}
