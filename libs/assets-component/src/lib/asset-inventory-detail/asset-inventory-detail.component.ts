import { Component, inject } from '@angular/core';
import { BaseEntityDetailComponent } from '@ss/common/ui-base-entity';
import { AssetInventory } from '../assets-api';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import {  ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { FurnitureStatusService, LookupsService, OfficeService } from '@ss/common/api-lookup';
import { AssetInventoryService } from '../services/asset-inventory.service';
import { LoginService, MaterialModule } from '@ss/common/api-common';
import { AccPoliciesService, ACCPolicy } from '@ss/accounting/accounting-api';
import { Observable, switchMap } from 'rxjs';
import { tap } from 'rxjs/operators';
import { CommonUiAutoCompleteModule, DefaultAutoCompleteModel } from '@ss/common/ui-auto-complete';
import { AssetLookupModel } from '../asset-lookup-model';
import { AssetsService } from '../services/assets.service';
import { CommonModule } from '@angular/common';



import { CommonUiDatepickerModule } from '@ss/common/ui-datepicker';
import { CustomAttributesModule } from '@ss/custom-attributes';

import { QRCodeModule } from 'angularx-qrcode';
import { TranslateDirective, TranslatePipe } from '@ss/common/ui-lang';

@Component({
    selector: 'ss-asset-inventory',
    templateUrl: './asset-inventory-detail.component.html',
    styleUrls: ['./asset-inventory-detail.component.scss'],
    standalone: true,
    imports: [
        CommonModule,
        MaterialModule,
        TranslateDirective,
        TranslatePipe,
        CommonUiAutoCompleteModule,
        CommonUiDatepickerModule,
        RouterModule,
        CustomAttributesModule,
        QRCodeModule
    ]

})
export class AssetInventoryDetailComponent extends BaseEntityDetailComponent<AssetInventory> {
    private loginSrv = inject(LoginService);
    private officeSrv = inject(OfficeService);
    private policySrv = inject(AccPoliciesService);
    private assetSrv = inject(AssetsService);
    private statusSrv = inject(FurnitureStatusService);

    private accPolicy: ACCPolicy | null = null;

    officeLookup = new DefaultAutoCompleteModel(this.officeSrv);
    assetLookupModel = new AssetLookupModel(this.assetSrv);
    statusLookup = new DefaultAutoCompleteModel(this.statusSrv);

    constructor(
        public override entitySrv: AssetInventoryService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override formBuilder: UntypedFormBuilder,
        public override confirmationSrv: ConfirmationDialogService,
        public lookupsSrv: LookupsService) {
        super(entitySrv, shellSrv, snackBarSrv, route, formBuilder, confirmationSrv, 'INVENTORY');
        this.assetSrv.activeOnly = false;
    }

    public override setupForm(b: AssetInventory) {
        this.id = this.id || 0;
        return this.formBuilder.group({
            id: [b.id || 0],
            centerId: [this.loginSrv.appCtx.center],
            office: [b.office, Validators.required],
            investId: [b.investId],
            status: [b.status],
            inventYear: [b.inventYear | this.accPolicy?.inventoryYear, Validators.required],
            date: [b.date || new Date(), Validators.required],
            inventMemo: [b.inventMemo]
        });
    }

    override preload(): Observable<any> {
        return this.loginSrv
            .loadContext()
            .pipe(switchMap(_ => this.policySrv.get(this.loginSrv.appCtx.center)),
                tap(res => {
                    this.accPolicy = res;
                    this.entitySrv.setParentId(res.inventoryYear);
                }));
    }


    onScan(data: any) {
        console.log(data);
    }
}
