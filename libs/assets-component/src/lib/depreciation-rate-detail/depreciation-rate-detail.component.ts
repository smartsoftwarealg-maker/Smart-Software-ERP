import { Component, OnInit } from '@angular/core';
import {BaseEntityDetailComponent} from '@ss/common/ui-base-entity';
import {DepreciationRate} from '../assets-api';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpService} from '@ss/common/api-common';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {LookupsService} from '@ss/common/api-lookup';
import {Observable} from 'rxjs';
import {switchMap} from 'rxjs/operators';
import {DepreciationRateService} from '../depreciation-rate.service';

@Component({
  selector: 'ss-depreciation-rate-detail',
  templateUrl: './depreciation-rate-detail.component.html',
  styleUrls: ['./depreciation-rate-detail.component.scss']
})
export class DepreciationRateDetailComponent extends BaseEntityDetailComponent<DepreciationRate> implements OnInit {
    private parentId = 0;

    constructor(
        public rateSrv: DepreciationRateService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override formBuilder: FormBuilder,
        public httpSrv: HttpService,
        public override confirmationSrv: ConfirmationDialogService,
        public lookupsSrv: LookupsService) {
        super(rateSrv,
            shellSrv,
            snackBarSrv,
            route,
            formBuilder,
            confirmationSrv,
            'ASSET_DEPRECIATION_RATES');
    }

    public setupForm(a: DepreciationRate): FormGroup {
        return this.form = this.formBuilder.group({
            id:       [a.id],
            parentId: [a.parentId || this.parentId, Validators.required],
            year:     [a.year, Validators.required],
            rate:     [a.rate, Validators.required],
        });
    }

    protected override getRouteParam(): Observable<any> {
        return this.route
            .parent
            .parent.params
            .pipe(
                switchMap(p => {
                    this.parentId = +p['id'] || 0;
                    this.rateSrv.setParentId(this.parentId);
                    return super.getRouteParam();
                })
            );
    }


    override ngOnInit() {
        super.ngOnInit();
        this.shellSrv.setGoBackPath('../..', this.route);
    }
}
