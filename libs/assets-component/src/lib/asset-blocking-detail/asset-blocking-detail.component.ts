import { Component, inject, OnInit } from '@angular/core';
import {BaseEntityDetailComponent} from '@ss/common/ui-base-entity';
import {Blocking} from '../assets-api';
import {DefaultAutoCompleteModel} from '@ss/common/ui-auto-complete';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute} from '@angular/router';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import {HttpService} from '@ss/common/api-common';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {LookupsService} from '@ss/common/api-lookup';
import {Observable} from 'rxjs';
import {switchMap} from 'rxjs/operators';
import {AssetBlockingService} from '../asset-blocking.service';
import {AssetBlockingTypeService} from '../asset-blocking-type.service';

@Component({
    selector: 'ss-asset-blocking-detail',
    templateUrl: './asset-blocking-detail.component.html',
    styleUrls: ['./asset-blocking-detail.component.scss']
})
export class AssetBlockingDetailComponent extends BaseEntityDetailComponent<Blocking> implements OnInit {
    private typeLookupSrv = inject(AssetBlockingTypeService);
    typeLookup = new DefaultAutoCompleteModel(this.typeLookupSrv);
    private parentId = 0;

    constructor(
        public assetBlockingSrv: AssetBlockingService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override formBuilder: UntypedFormBuilder,
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

    public override setupForm(a: Blocking): UntypedFormGroup {
        const today = new Date();
        return this.form = this.formBuilder.group({
            id: a.id,
            investId:       [a.investId || this.parentId, Validators.required],
            fromDate:       [a.fromDate || today, Validators.required],
            toDate:         [a.toDate || today, Validators.required],
            decisionDate:   [a.decisionDate, Validators.required],
            decisionNumber: [a.decisionNumber],
            blockingType:   [a.blockingType]
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
