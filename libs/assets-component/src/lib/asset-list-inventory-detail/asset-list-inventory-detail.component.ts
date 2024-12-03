import { Component, inject } from '@angular/core';
import { BaseEntityDetailComponent } from '@ss/common/ui-base-entity';
import { AssetBuilding, InventoryAsset } from '../assets-api';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { UntypedFormBuilder } from '@angular/forms';
import {  ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { LookupsService, OfficeService } from '@ss/common/api-lookup';
import { AssetLocationService } from '../services/asset-location.service';
import { MaterialModule } from '@ss/common/api-common';
import { CommonModule } from '@angular/common';
import { DefaultAutoCompleteModel, UiAutoCompleteComponent } from '@ss/common/ui-auto-complete';
import { QRCodeModule } from 'angularx-qrcode';
import { AssetListInventoryService } from '../services/asset-list-inventory.service';
import { AssetsBuildingService } from '../services/assets-building.service';
import { Agent, ConsumerService } from '@ss/logistics/api-agent';
import { TranslateDirective } from '@ss/common/ui-lang';

@Component({
    selector: 'ss-asset-list-inventory-detail',
    templateUrl: './asset-list-inventory-detail.component.html',
    styleUrls: ['./asset-list-inventory-detail.component.scss'],
    standalone: true,
    imports: [
        CommonModule,
        MaterialModule,
        TranslateDirective,
        RouterModule,
        QRCodeModule,
        UiAutoCompleteComponent
    ]

})
export class AssetListInventoryDetailComponent extends BaseEntityDetailComponent<InventoryAsset> {
    #buildingSrv = inject(AssetsBuildingService);
    #officeSrv   = inject(OfficeService);
    #locationSrv = inject(AssetLocationService);
    #consumerSrv = inject(ConsumerService);

    // locationLookup = new DefaultAutoCompleteModel(this.locationSrv);
    buildingLookup   = new DefaultAutoCompleteModel(this.#buildingSrv);
    officeLookup      = new DefaultAutoCompleteModel(this.#officeSrv);
    locationLookup    = new DefaultAutoCompleteModel(this.#locationSrv);
    beneficiaryLookup = new DefaultAutoCompleteModel<Agent>(this.#consumerSrv, 'id', 'denomination');

    constructor(
        public override entitySrv: AssetListInventoryService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override formBuilder: UntypedFormBuilder,
        public override confirmationSrv: ConfirmationDialogService,
        public lookupsSrv: LookupsService) {
        super(entitySrv,
            shellSrv,
            snackBarSrv,
            route,
            formBuilder,
            confirmationSrv,
            'INVENTORY');
        this.buildingLookup.onObjectSelected = b => this.onBuilding(b);
        this.locationLookup.onObjectSelected = l => this.#buildingSrv.setParentId(l?.id||0);
    }

    public override setupForm(b: InventoryAsset) {
        // Make sure to update the template if you edit the configuration here
        this.#buildingSrv.setParentId(b.locationId||0);
        this.#officeSrv.setParentId(0);
        return this.formBuilder.group({
            id:             [b.id],
            inventoryId:    [b.inventoryId],
            centerId:       [b.centerId],
            reference:      [b.reference],
            comment:        [b.comment],
            locationId:     [null],
            newOfficeId:    [b.newOfficeId],
            newBuildingId:  [b.newBuildingId],
            newBeneficiary: [b.newBeneficiary],
            updateLocation: [true]
        });
    }

    private onBuilding(b: AssetBuilding) {
        this.#officeSrv.setParentId(b.id||0);
        this.#officeSrv
            .getList(0, 1)
            .subscribe(res => this.form?.controls['newOfficeId'].setValue(res.body[0]?.id||0));
    }

}
