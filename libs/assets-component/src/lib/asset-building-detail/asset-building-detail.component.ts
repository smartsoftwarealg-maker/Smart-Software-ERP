import { Component, OnInit } from '@angular/core';
import {BaseEntityDetailComponent} from '@ss/common/ui-base-entity';
import {Bank, BankService} from '@ss/administration/api-bank';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute} from '@angular/router';
import {FormBuilder, Validators} from '@angular/forms';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {LookupsService} from '@ss/common/api-lookup';
import {AssetBuilding} from '../assets-api';
import {AssetsBuildingService} from '../assets-building.service';
import {LoginService} from '@ss/common/api-common';

@Component({
  selector: 'ss-asset-building-detail',
  templateUrl: './asset-building-detail.component.html',
  styleUrls: ['./asset-building-detail.component.scss']
})
export class AssetBuildingDetailComponent extends BaseEntityDetailComponent<AssetBuilding> {
    constructor(
        public override entitySrv: AssetsBuildingService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override formBuilder: FormBuilder,
        public override confirmationSrv: ConfirmationDialogService,
        public lookupsSrv: LookupsService,
        private loginSrv: LoginService) {
        super(entitySrv, shellSrv, snackBarSrv, route, formBuilder, confirmationSrv, 'ASSET_BUILDINGS');
    }


    public setupForm(b: Bank) {
        // Make sure to update the template if you edit the configuration here
        return this.formBuilder.group({
            id: [b.id],
            centerId: [this.loginSrv.appCtx.center],
            code: [b.code, Validators.maxLength(4)],
            description: [b.description, Validators.required],
        });
    }

}
