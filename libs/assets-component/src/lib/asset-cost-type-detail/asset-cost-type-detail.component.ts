import { Component} from '@angular/core';
import {BaseEntityDetailComponent} from '@ss/common/ui-base-entity';
import {Lookup, LookupsService} from '@ss/common/api-lookup';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute} from '@angular/router';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {AssetCostTypeService} from '../asset-cost-type.service';

@Component({
  selector: 'ss-asset-cost-type-detail',
  templateUrl: './asset-cost-type-detail.component.html',
  styleUrls: ['./asset-cost-type-detail.component.scss']
})
export class AssetCostTypeDetailComponent extends BaseEntityDetailComponent<Lookup> {

    constructor(
        private infoSrv: AssetCostTypeService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override formBuilder: UntypedFormBuilder,
        public override confirmationSrv: ConfirmationDialogService,
        public lookupsSrv: LookupsService) {
        super(infoSrv, shellSrv, snackBarSrv, route, formBuilder, confirmationSrv, 'ASSET_COST_TYPES');
    }

    setupForm(e: Lookup): UntypedFormGroup {
        return this.formBuilder.group({
            id: [e.id],
            description: [e.description, Validators.required],
            descriptionAr: [e.descriptionAr],
        });
    }
}
