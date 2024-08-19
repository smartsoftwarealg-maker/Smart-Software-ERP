import { Component, OnInit } from '@angular/core';
import { BaseEntityDetailComponent } from '@ss/common/ui-base-entity';
import { Lookup, LookupsService } from '@ss/common/api-lookup';
import { AssetCostTypeService } from '../services/asset-cost-type.service';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { CommonUiConfirmationDialogModule, ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { AssetRevaluationTypeService } from '../services/asset-revaluation-type.service';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@ss/common/api-common';
import { CommonUiLangModule } from '@ss/common/ui-lang';
import { CommonUiImageInputModule } from '@ss/common/ui-image-input';
import { UiPaginationModule } from '@ss/common/ui-pagination';
import { CommonUiAutoCompleteModule } from '@ss/common/ui-auto-complete';
import { CommonUiDatepickerModule } from '@ss/common/ui-datepicker';
import { CustomAttributesModule } from '@ss/custom-attributes';
import { AppArchiveModule } from '@ss/common/app-archive';
import { QRCodeModule } from 'angularx-qrcode';

@Component({
    selector: 'ss-asset-revaluation-type-detail',
    templateUrl: './asset-revaluation-type-detail.component.html',
    styleUrls: ['./asset-revaluation-type-detail.component.scss'],
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
export class AssetRevaluationTypeDetailComponent extends BaseEntityDetailComponent<Lookup> {

    constructor(
        private infoSrv: AssetRevaluationTypeService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override formBuilder: UntypedFormBuilder,
        public override confirmationSrv: ConfirmationDialogService,
        public lookupsSrv: LookupsService) {
        super(infoSrv, shellSrv, snackBarSrv, route, formBuilder, confirmationSrv, 'ASSET_REVALUATION_TYPES');
    }

    setupForm(e: Lookup): UntypedFormGroup {
        return this.formBuilder.group({
            id: [e.id],
            description: [e.description, Validators.required],
            descriptionAr: [e.descriptionAr]
        });
    }
}
