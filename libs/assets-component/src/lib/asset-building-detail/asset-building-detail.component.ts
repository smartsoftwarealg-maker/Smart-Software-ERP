import { Component, OnInit } from '@angular/core';
import {BaseEntityDetailComponent} from '@ss/common/ui-base-entity';
import {Bank, BankService} from '@ss/administration/api-bank';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute} from '@angular/router';
import {UntypedFormBuilder, Validators} from '@angular/forms';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {LookupsService} from '@ss/common/api-lookup';
import {AssetBuilding} from '../assets-api';
import {AssetsBuildingService} from '../assets-building.service';
import {LoginService} from '@ss/common/api-common';
import {CodeDescriptionAutoCompleteModel} from '@ss/common/ui-auto-complete';
import {AssetLocationService} from '../asset-location.service';

@Component({
  selector: 'ss-asset-building-detail',
  templateUrl: './asset-building-detail.component.html',
  styleUrls: ['./asset-building-detail.component.scss']
})
export class AssetBuildingDetailComponent extends BaseEntityDetailComponent<AssetBuilding> {
    locationLookup = new CodeDescriptionAutoCompleteModel(this.locationSrv);

    constructor(
        public override entitySrv: AssetsBuildingService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override formBuilder: UntypedFormBuilder,
        public override confirmationSrv: ConfirmationDialogService,
        public lookupsSrv: LookupsService,
        private locationSrv: AssetLocationService) {
        super(entitySrv, shellSrv, snackBarSrv, route, formBuilder, confirmationSrv, 'ASSET_BUILDINGS');
    }


    public override setupForm(b: AssetBuilding) {
        // Make sure to update the template if you edit the configuration here
        return this.formBuilder.group({
            id: [b.id],
            locationId: [b.locationId],
            code: [b.code, Validators.maxLength(4)],
            description: [b.description, Validators.required],
        });
    }

}
