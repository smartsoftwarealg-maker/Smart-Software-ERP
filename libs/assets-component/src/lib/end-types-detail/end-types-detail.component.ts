import { Component, OnInit } from '@angular/core';
import {BaseEntityDetailComponent} from '@ss/common/ui-base-entity';
import {Lookup, LookupsService} from '@ss/common/api-lookup';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute} from '@angular/router';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {AssetEndTypeService} from '../services/asset-end-type.service';

@Component({
  selector: 'ss-end-types-detail',
  templateUrl: './end-types-detail.component.html',
  styleUrls: ['./end-types-detail.component.scss']
})
export class EndTypesDetailComponent  extends BaseEntityDetailComponent<Lookup> {

    constructor(
        private infoSrv: AssetEndTypeService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override formBuilder: UntypedFormBuilder,
        public override confirmationSrv: ConfirmationDialogService,
        public lookupsSrv: LookupsService) {
        super(infoSrv, shellSrv, snackBarSrv, route, formBuilder, confirmationSrv, 'ASSET_END_TYPES');
    }

    setupForm(e: Lookup): UntypedFormGroup {
        return this.formBuilder.group({
            id: [e.id],
            description: [e.description, Validators.required],
            descriptionAr: [e.descriptionAr],
        });
    }
}
