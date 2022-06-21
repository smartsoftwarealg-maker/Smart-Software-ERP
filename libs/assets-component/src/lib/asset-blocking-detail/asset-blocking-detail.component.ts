import { Component, OnInit } from '@angular/core';
import {BaseEntityDetailComponent} from '@ss/common/ui-base-entity';
import {AssetCost, Blocking} from '../assets-api';
import {DefaultAutoCompleteModel} from '@ss/common/ui-auto-complete';
import {AssetCostsService} from '../asset-costs.service';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpService} from '@ss/common/api-common';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {LookupsService} from '@ss/common/api-lookup';
import {AssetCostsTypeService} from '../asset-costs-type.service';
import {Observable} from 'rxjs';
import {switchMap} from 'rxjs/operators';
import {AssetBlockingService} from '../asset-blocking.service';

@Component({
  selector: 'ss-asset-blocking-detail',
  templateUrl: './asset-blocking-detail.component.html',
  styleUrls: ['./asset-blocking-detail.component.scss']
})
export class AssetBlockingDetailComponent extends BaseEntityDetailComponent<Blocking> implements OnInit {
    private parentId = 0;

    constructor(
        public assetBlockingSrv: AssetBlockingService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override formBuilder: FormBuilder,
        public httpSrv: HttpService,
        public override confirmationSrv: ConfirmationDialogService,
        public lookupsSrv: LookupsService) {
        super(assetBlockingSrv,
            shellSrv,
            snackBarSrv,
            route,
            formBuilder,
            confirmationSrv,
            'ASSET_BLOCKINGS');
    }

    public setupForm(a: Blocking): FormGroup {
        const today = new Date();
        return this.form = this.formBuilder.group({
            id: a.id,
            investId:       [a.investId || this.parentId, Validators.required],
            fromDate:       [a.fromDate || today, Validators.required],
            toDate:         [a.toDate || today, Validators.required],
            decisionDate:   [a.decisionDate, Validators.required],
            decisionNumber: [a.decisionNumber]
        });
    }

    protected override getRouteParam(): Observable<any> {
        return this.route
            .parent
            .parent.params
            .pipe(
                switchMap(p => {
                    this.parentId = +p['id'] || 0;
                    this.assetBlockingSrv.setParentId(this.parentId);
                    return super.getRouteParam();
                })
            );
    }


    override ngOnInit() {
        super.ngOnInit();
        this.shellSrv.setGoBackPath('../..', this.route);
    }
}
