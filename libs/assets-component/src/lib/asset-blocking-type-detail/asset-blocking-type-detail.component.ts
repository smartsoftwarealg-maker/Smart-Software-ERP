import { Component, OnInit } from '@angular/core';
import {BaseEntityDetailComponent} from '@ss/common/ui-base-entity';
import {Lookup, LookupsService} from '@ss/common/api-lookup';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import { ActivatedRoute, RouterModule } from '@angular/router';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import {  ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import {AssetBlockingTypeService} from '../services/asset-blocking-type.service';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@ss/common/api-common';




import { DatePickerComponent } from '@ss/common/ui-datepicker';


import { QRCodeModule } from 'angularx-qrcode';
import { TranslateDirective, TranslatePipe } from '@ss/common/ui-lang';

@Component({
  selector: 'ss-asset-cost-types-detail',
  templateUrl: './asset-blocking-type-detail.component.html',
  styleUrls: ['./asset-blocking-type-detail.component.scss'],
  standalone: true,
    imports: [
        CommonModule,
        MaterialModule,
        TranslateDirective,

        DatePickerComponent,
        RouterModule,


        QRCodeModule
    ]})
export class AssetBlockingTypeDetailComponent extends BaseEntityDetailComponent<Lookup> {

    constructor(
        private infoSrv: AssetBlockingTypeService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override formBuilder: UntypedFormBuilder,
        public override confirmationSrv: ConfirmationDialogService,
        public lookupsSrv: LookupsService) {
        super(infoSrv, shellSrv, snackBarSrv, route, formBuilder, confirmationSrv, 'ASSET_BLOCKING_TYPES');
    }

    setupForm(e: Lookup): UntypedFormGroup {
        return this.formBuilder.group({
            id: [e.id],
            description: [e.description, Validators.required],
            descriptionAr: [e.descriptionAr],
        });
    }
}

