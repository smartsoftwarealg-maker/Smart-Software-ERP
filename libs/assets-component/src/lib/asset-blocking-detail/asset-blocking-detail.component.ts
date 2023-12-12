import { Component, inject, OnInit } from '@angular/core';
import {BaseChildEntityDetailComponent, BaseEntityDetailComponent} from '@ss/common/ui-base-entity';
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
import {AssetBlockingService} from '../services/asset-blocking.service';
import {AssetBlockingTypeService} from '../services/asset-blocking-type.service';

@Component({
    selector: 'ss-asset-blocking-detail',
    templateUrl: './asset-blocking-detail.component.html',
    styleUrls: ['./asset-blocking-detail.component.scss']
})
export class AssetBlockingDetailComponent extends BaseChildEntityDetailComponent<Blocking> implements OnInit {
    private typeLookupSrv = inject(AssetBlockingTypeService);
    typeLookup = new DefaultAutoCompleteModel(this.typeLookupSrv);
    private parentId = 0;
    private formBuilder = inject(UntypedFormBuilder);

    constructor(
        public assetBlockingSrv: AssetBlockingService) {
        super(assetBlockingSrv, 'Blocking');
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

    // protected override getRouteParam(): Observable<any> {
    //     return this.route
    //         .parent
    //         .parent.params
    //         .pipe(
    //             switchMap(p => {
    //                 this.parentId = +p['id'] || 0;
    //                 this.assetBlockingSrv.setParentId(this.parentId);
    //                 return super.getRouteParam();
    //             })
    //         );
    // }


    // override ngOnInit() {
    //     super.ngOnInit();
    //     this.shellSrv.setGoBackPath('..', this.route);
    // }
}
