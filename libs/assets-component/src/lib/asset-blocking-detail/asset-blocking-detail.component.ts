import { Component, inject, OnInit } from '@angular/core';
import {BaseChildEntityDetailComponent, BaseEntityDetailComponent} from '@ss/common/ui-base-entity';
import {Blocking} from '../assets-api';
import { CommonUiAutoCompleteModule, DefaultAutoCompleteModel } from '@ss/common/ui-auto-complete';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import { ActivatedRoute, RouterModule } from '@angular/router';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import { HttpService, MaterialModule } from '@ss/common/api-common';
import { CommonUiConfirmationDialogModule, ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import {LookupsService} from '@ss/common/api-lookup';
import {Observable} from 'rxjs';
import {switchMap} from 'rxjs/operators';
import {AssetBlockingService} from '../services/asset-blocking.service';
import {AssetBlockingTypeService} from '../services/asset-blocking-type.service';
import { CommonModule } from '@angular/common';
import { CommonUiLangModule } from '@ss/common/ui-lang';

import { UiPaginationModule } from '@ss/common/ui-pagination';
import { CommonUiDatepickerModule } from '@ss/common/ui-datepicker';
import { CustomAttributesModule } from '@ss/custom-attributes';
import { AppArchiveModule } from '@ss/common/app-archive';
import { QRCodeModule } from 'angularx-qrcode';

@Component({
    selector: 'ss-asset-blocking-detail',
    templateUrl: './asset-blocking-detail.component.html',
    styleUrls: ['./asset-blocking-detail.component.scss'],
    standalone: true,
    imports: [
        CommonModule,
        MaterialModule,
        CommonUiLangModule,

        UiPaginationModule,
        CommonUiConfirmationDialogModule,
        CommonUiAutoCompleteModule,
        CommonUiDatepickerModule,
        RouterModule,
        CustomAttributesModule,
        AppArchiveModule,
        QRCodeModule
    ]})
export class AssetBlockingDetailComponent extends BaseChildEntityDetailComponent<Blocking> implements OnInit {
    private typeLookupSrv = inject(AssetBlockingTypeService);
    typeLookup = new DefaultAutoCompleteModel(this.typeLookupSrv);
    private formBuilder = inject(UntypedFormBuilder);

    constructor(
        public assetBlockingSrv: AssetBlockingService) {
        super(assetBlockingSrv, 'Blocking');
    }

    public override setupForm(a: Blocking): UntypedFormGroup {
        const today = new Date();
        return this.form = this.formBuilder.group({
            id: a.id,
            investId:       [a.investId || this.assetBlockingSrv.getParentId(), Validators.required],
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
