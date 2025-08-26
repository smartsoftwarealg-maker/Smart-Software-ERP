import { Component, OnInit } from '@angular/core';
import { BaseEntityDetailComponent } from '@ss/common/ui-base-entity';
import { Lookup, LookupsService } from '@ss/common/api-lookup';
import { AssetCostTypeService } from '../services/asset-cost-type.service';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import {  ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { AssetRevaluationTypeService } from '../services/asset-revaluation-type.service';

import { MaterialModule } from '@ss/common/api-common';




import { DatePickerComponent } from '@ss/common/ui-datepicker';



import { TranslateDirective, TranslatePipe } from '@ss/common/ui-lang';

@Component({
    selector: 'ss-asset-revaluation-type-detail',
    templateUrl: './asset-revaluation-type-detail.component.html',
    styleUrls: ['./asset-revaluation-type-detail.component.scss'],
    standalone: true,
    imports: [
    MaterialModule,
    TranslateDirective,
    RouterModule
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
