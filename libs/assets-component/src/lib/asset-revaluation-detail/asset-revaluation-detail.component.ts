import { Component, OnInit } from '@angular/core';
import {BaseEntityDetailComponent} from '@ss/common/ui-base-entity';
import {AssetCost, AssetRevaluation} from '../assets-api';
import {DefaultAutoCompleteModel} from '@ss/common/ui-auto-complete';
import {AssetCostsService} from '../asset-costs.service';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute} from '@angular/router';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import {HttpService} from '@ss/common/api-common';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {LookupsService} from '@ss/common/api-lookup';
import {AssetCostsTypeService} from '../asset-costs-type.service';
import {Observable} from 'rxjs';
import {switchMap} from 'rxjs/operators';
import {AssetRevaluationService} from '../asset-revaluation.service';
import {AssetRevaluationLookupService} from '../asset-revaluation-lookup.service';

@Component({
  selector: 'ss-asset-revaluation-detail',
  templateUrl: './asset-revaluation-detail.component.html',
  styleUrls: ['./asset-revaluation-detail.component.scss']
})
export class AssetRevaluationDetailComponent extends  BaseEntityDetailComponent<AssetRevaluation> implements OnInit {
    private parentId = 0;
    revaluationLookup = new DefaultAutoCompleteModel(this.revaluationLookupSrv);

    constructor(
        public assetRevaluationSrv: AssetRevaluationService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override formBuilder: UntypedFormBuilder,
        public httpSrv: HttpService,
        public override confirmationSrv: ConfirmationDialogService,
        public lookupsSrv: LookupsService,
        private revaluationLookupSrv: AssetRevaluationLookupService) {
        super(assetRevaluationSrv,
            shellSrv,
            snackBarSrv,
            route,
            formBuilder,
            confirmationSrv,
            'ASSET_REVALUATIONS');
    }

    public setupForm(a: AssetRevaluation): UntypedFormGroup {
        return this.form = this.formBuilder.group({
            id: a.id,
            reval_type: [a.reval_type, Validators.required],
            invest_id: [a.invest_id || this.parentId, Validators.required],
            deprec_year: [a.deprec_year, Validators.required],
            useful_life: [a.useful_life, Validators.required],
            deprec_rate: [a.deprec_rate, Validators.required],
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
                    this.assetRevaluationSrv.setParentId(this.parentId);
                    return super.getRouteParam();
                })
            );
    }


    override ngOnInit() {
        super.ngOnInit();
        this.shellSrv.setGoBackPath('../..', this.route);
    }
}
