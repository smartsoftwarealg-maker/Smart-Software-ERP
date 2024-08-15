import {Component, inject, OnInit} from '@angular/core';
import {BaseChildEntityDetailComponent, BaseEntityDetailComponent} from '@ss/common/ui-base-entity';
import {AssetRevaluation} from '../assets-api';
import { CommonUiAutoCompleteModule, DefaultAutoCompleteModel } from '@ss/common/ui-auto-complete';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import {AssetRevaluationService} from '../services/asset-revaluation.service';
import {AssetRevaluationLookupService} from '../services/asset-revaluation-lookup.service';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@ss/common/api-common';
import { CommonUiLangModule } from '@ss/common/ui-lang';
import { CommonUiImageInputModule } from '@ss/common/ui-image-input';
import { UiPaginationModule } from '@ss/common/ui-pagination';
import { CommonUiConfirmationDialogModule } from '@ss/common/ui-confirmation-dialog';
import { CommonUiDatepickerModule } from '@ss/common/ui-datepicker';
import { RouterModule } from '@angular/router';
import { CustomAttributesModule } from '@ss/custom-attributes';
import { AppArchiveModule } from '@ss/common/app-archive';
import { QRCodeModule } from 'angularx-qrcode';

@Component({
    selector: 'ss-asset-revaluation-detail',
    templateUrl: './asset-revaluation-detail.component.html',
    styleUrls: ['./asset-revaluation-detail.component.scss'],
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
export class AssetRevaluationDetailComponent extends BaseChildEntityDetailComponent<AssetRevaluation> implements OnInit {
    private revaluationLookupSrv = inject(AssetRevaluationLookupService);
    private parentId = 0;
    private formBuilder = inject(UntypedFormBuilder);
    revaluationLookup = new DefaultAutoCompleteModel(this.revaluationLookupSrv);

    constructor(public assetRevaluationSrv: AssetRevaluationService) {
        super(assetRevaluationSrv, 'AssetRevaluation');
    }

    public override setupForm(a: AssetRevaluation): UntypedFormGroup {
        return this.form = this.formBuilder.group({
            id: a.id,
            reval_type: [a.reval_type, Validators.required],
            invest_id: [a.invest_id || this.parentId, Validators.required],
            deprec_year: [a.deprec_year, Validators.required],
            useful_life: [a.useful_life, Validators.required],
            deprec_rate: [a.deprec_rate, Validators.required],
            amount: [a.amount || 0, Validators.required]
        });
    }

}
