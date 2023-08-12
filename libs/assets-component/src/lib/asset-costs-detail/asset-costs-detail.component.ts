import { Component, inject, OnInit } from '@angular/core';
import {BaseEntityDetailComponent} from '@ss/common/ui-base-entity';
import {AssetCost} from '../assets-api';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute} from '@angular/router';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import {HttpService} from '@ss/common/api-common';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {LookupsService} from '@ss/common/api-lookup';
import {AssetCostsService} from '../services/asset-costs.service';
import {Observable} from 'rxjs';
import {switchMap} from 'rxjs/operators';
import {DefaultAutoCompleteModel} from '@ss/common/ui-auto-complete';
import {AssetCostsTypeService} from '../services/asset-costs-type.service';

@Component({
    selector: 'ss-asset-costs-detail',
    templateUrl: './asset-costs-detail.component.html',
    styleUrls: ['./asset-costs-detail.component.scss']
})
export class AssetCostsDetailComponent extends BaseEntityDetailComponent<AssetCost> implements OnInit {
    private costTypeLookupSrv =  inject(AssetCostsTypeService);
    private parentId = 0;
    costTypeLookup = new DefaultAutoCompleteModel(this.costTypeLookupSrv);
    costTypes = [{ id: 1, description: 'ASSET_ACCOUNTANT'}, {id: 2, description: 'ASSET_FISCAL'}];

    constructor(
        public assetCostSrv: AssetCostsService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override formBuilder: UntypedFormBuilder,
        public httpSrv: HttpService,
        public override confirmationSrv: ConfirmationDialogService,
        public lookupsSrv: LookupsService) {
        super(assetCostSrv,
            shellSrv,
            snackBarSrv,
            route,
            formBuilder,
            confirmationSrv,
            'ASSET_COSTS');
    }

    public override setupForm(a: AssetCost): UntypedFormGroup {
        return this.form = this.formBuilder.group({
            id: a.id,
            cost_type: [a.cost_type || 2, Validators.required],
            invest_id: [a.invest_id || this.parentId, Validators.required],
            cost_id: [a.cost_id, Validators.required],
            amount: [a.amount || 0, Validators.required]
        });
    }

    protected override getRouteParam(): Observable<any> {
        return this.route
            .parent
            .parent.params
            .pipe(
                switchMap(p => {
                    this.parentId = +p['id'] || 0;
                    this.assetCostSrv.setParentId(this.parentId);
                    return super.getRouteParam();
                })
            );
    }


    override ngOnInit() {
        super.ngOnInit();
        this.shellSrv.setGoBackPath('../..', this.route);
    }
}
