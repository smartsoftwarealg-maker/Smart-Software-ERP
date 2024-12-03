import {Component, inject, OnInit} from '@angular/core';
import {BaseChildEntityDetailComponent} from '@ss/common/ui-base-entity';
import {AssetRevaluation} from '../assets-api';
import { DefaultAutoCompleteModel, UiAutoCompleteComponent } from '@ss/common/ui-auto-complete';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import {AssetRevaluationService} from '../services/asset-revaluation.service';
import {AssetRevaluationLookupService} from '../services/asset-revaluation-lookup.service';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@ss/common/api-common';




import { DatePickerComponent } from '@ss/common/ui-datepicker';
import { RouterModule } from '@angular/router';


import { QRCodeModule } from 'angularx-qrcode';
import { TranslateDirective, TranslatePipe } from '@ss/common/ui-lang';

@Component({
    selector: 'ss-asset-revaluation-detail',
    templateUrl: './asset-revaluation-detail.component.html',
    styleUrls: ['./asset-revaluation-detail.component.scss'],
    standalone: true,
    imports: [
        CommonModule,
        MaterialModule,
        TranslateDirective,
        RouterModule,

        QRCodeModule,
        UiAutoCompleteComponent
    ]
})
export class AssetRevaluationDetailComponent extends BaseChildEntityDetailComponent<AssetRevaluation> implements OnInit {
    private revaluationLookupSrv = inject(AssetRevaluationLookupService);
    private formBuilder = inject(UntypedFormBuilder);
    revaluationLookup = new DefaultAutoCompleteModel(this.revaluationLookupSrv);

    constructor(public assetRevaluationSrv: AssetRevaluationService) {
        super(assetRevaluationSrv, 'AssetRevaluation');
    }

    public override setupForm(a: AssetRevaluation): UntypedFormGroup {
        return this.form = this.formBuilder.group({
            id:          [a.id],
            reval_type:  [a.reval_type, Validators.required],
            invest_id:   [a.invest_id || this.assetRevaluationSrv.getParentId(), Validators.required],
            deprec_year: [a.deprec_year, Validators.required],
            useful_life: [a.useful_life, Validators.required],
            deprec_rate: [a.deprec_rate, Validators.required],
            amount:      [a.amount || 0, Validators.required]
        });
    }

}
