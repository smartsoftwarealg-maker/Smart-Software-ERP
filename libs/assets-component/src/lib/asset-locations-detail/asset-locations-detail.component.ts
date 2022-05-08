import { Component, OnInit } from '@angular/core';
import {BaseEntityDetailComponent} from '@ss/common/ui-base-entity';
import {AssetLocation} from '../assets-api';
import {Bank, BankService} from '@ss/administration/api-bank';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute} from '@angular/router';
import {FormBuilder, Validators} from '@angular/forms';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {LookupsService} from '@ss/common/api-lookup';
import {AssetLocationService} from '../asset-location.service';
import {LoginService} from '@ss/common/api-common';
import {Observable} from 'rxjs';

@Component({
  selector: 'ss-asset-locations-detail',
  templateUrl: './asset-locations-detail.component.html',
  styleUrls: ['./asset-locations-detail.component.scss']
})
export class AssetLocationsDetailComponent extends BaseEntityDetailComponent<AssetLocation> {

    constructor(
        public override entitySrv: AssetLocationService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override formBuilder: FormBuilder,
        public override confirmationSrv: ConfirmationDialogService,
        public lookupsSrv: LookupsService,
        private loginSrv: LoginService) {
        super(entitySrv,
              shellSrv,
              snackBarSrv,
              route,
              formBuilder,
              confirmationSrv,
              'ASSET_LOCATIONS');
    }


    override preload(): Observable<any> {
        return this.loginSrv
            .loadContext();
    }

    public setupForm(b: AssetLocation) {
        // Make sure to update the template if you edit the configuration here
        return this.formBuilder.group({
            id: [b.id],
            code: [b.code, Validators.maxLength(4)],
            description: [b.description, Validators.required],
            centerId: [b.centerId || this.loginSrv.appCtx.center]
        });
    }

}
