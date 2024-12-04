import { Component, inject, OnInit } from '@angular/core';
import {BaseChildEntityDetailComponent, BaseEntityDetailComponent} from '@ss/common/ui-base-entity';
import {AssetCost} from '../assets-api';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import { ActivatedRoute, RouterModule } from '@angular/router';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import { HttpService, MaterialModule } from '@ss/common/api-common';
import {  ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import {LookupsService} from '@ss/common/api-lookup';
import {AssetCostsService} from '../services/asset-costs.service';
import {Observable} from 'rxjs';
import {switchMap} from 'rxjs/operators';
import {  DefaultAutoCompleteModel } from '@ss/common/ui-auto-complete';
import {AssetCostsTypeService} from '../services/asset-costs-type.service';
import { CommonModule } from '@angular/common';



import { DatePickerComponent } from '@ss/common/ui-datepicker';


import { QRCodeModule } from 'angularx-qrcode';
import { TranslateDirective, TranslatePipe } from '@ss/common/ui-lang';

@Component({
    selector: 'ss-asset-costs-detail',
    templateUrl: './asset-costs-detail.component.html',
    styleUrls: ['./asset-costs-detail.component.scss'],
    standalone: true,
    imports: [
        CommonModule,
        MaterialModule,
        TranslateDirective,
        TranslatePipe,

        DatePickerComponent,
        RouterModule,

        QRCodeModule
    ]})
export class AssetCostsDetailComponent extends BaseChildEntityDetailComponent<AssetCost> implements OnInit {
    private costTypeLookupSrv =  inject(AssetCostsTypeService);
    private formBuilder = inject(UntypedFormBuilder);
    private parentId = 0;
    costTypeLookup = new DefaultAutoCompleteModel(this.costTypeLookupSrv);
    costTypes = [{ id: 1, description: 'ASSET_ACCOUNTANT'}, {id: 2, description: 'ASSET_FISCAL'}];

    constructor(
        public assetCostSrv: AssetCostsService) {
        super(assetCostSrv, 'AssetCost');
    }

    public override setupForm(a: AssetCost): UntypedFormGroup {
        return this.form = this.formBuilder.group({
            id:        [a.id],
            cost_type: [a.cost_type || 0, Validators.required],
            invest_id: [a.invest_id || this.assetCostSrv.getParentId(), Validators.required],
            cost_id:   [a.cost_id,        Validators.required],
            amount:    [a.amount || 0,    Validators.required]
        });
    }
}
