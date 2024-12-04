import { Component, DestroyRef, inject } from '@angular/core';
import { BaseEntityDetailComponent } from '@ss/common/ui-base-entity';
import { AssetInventoryDoc, UnidentifiedInventory } from '../assets-api';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import {  ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { LookupsService, OfficeService } from '@ss/common/api-lookup';
import { MaterialModule } from '@ss/common/api-common';
import { DefaultAutoCompleteModel, UiAutoCompleteComponent } from '@ss/common/ui-auto-complete';
import { AssetClassService, AssetLocationService, AssetsBuildingService } from '@ss/assets-component';
import { CommonModule } from '@angular/common';
import { QRCodeModule } from 'angularx-qrcode';
import { AssetUnidentifiedInventoryService } from '../services/asset-unidentified-inventory.service';
import { AssetInventoryDocService } from '../services/asset-inventory-doc.service';
import { TranslateDirective } from '@ss/common/ui-lang';
import { Agent, ConsumerService } from '@ss/logistics/api-agent';

@Component({
    selector: 'ss-asset-unidentified-inventory',
    templateUrl: './asset-unidentified-inventory-detail.component.html',
    styleUrls: ['./asset-unidentified-inventory-detail.component.scss'],
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
export class AssetUnidentifiedInventoryDetailComponent extends BaseEntityDetailComponent<UnidentifiedInventory> {
    #consumerSrv = inject(ConsumerService);
    #officeSrv = inject(OfficeService);
    #locationSrv     = inject(AssetLocationService);
    #buildingSrv     = inject(AssetsBuildingService);
    #classSrv        = inject(AssetClassService);
    #inventoryDocSrv = inject(AssetInventoryDocService);

    buildingLookup = new DefaultAutoCompleteModel(this.#buildingSrv);
    classLookup    = new DefaultAutoCompleteModel(this.#classSrv);
    locationLookup = new DefaultAutoCompleteModel(this.#locationSrv);
    inventoryDocLookup = new DefaultAutoCompleteModel(this.#inventoryDocSrv);
    officeLookup = new DefaultAutoCompleteModel(this.#officeSrv);
    beneficiaryLookup = new DefaultAutoCompleteModel<Agent>(this.#consumerSrv, 'id', 'denomination');

    constructor(
        public override entitySrv: AssetUnidentifiedInventoryService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override formBuilder: UntypedFormBuilder,
        public override confirmationSrv: ConfirmationDialogService,
        public lookupsSrv: LookupsService) {
        super(entitySrv, shellSrv, snackBarSrv, route, formBuilder, confirmationSrv, 'ASSET_UNIDENTIFIED_INVENTORY');
        this.#buildingSrv.setParentId(0);
        this.#officeSrv.setParentId(0);
        this.inventoryDocLookup.onObjectSelected = o => this.onDocument(o);
        this.locationLookup.onObjectSelected = o => this.#buildingSrv.setParentId(o?.id||0);
        this.buildingLookup.onObjectSelected = b => this.#officeSrv.setParentId(b?.id||0);
    }

    public override setupForm(b: UnidentifiedInventory) {
        this.id = this.id || 0;
        this.#officeSrv.setParentId(b?.buildingId||0);
        return this.formBuilder.group({
            id:            [b.id || 0],
            parentId:      [b.parentId || this.entitySrv.getParentId(), Validators.required],
            classId:       [b.classId, Validators.required],
            buildingId:    [b.buildingId, Validators.required],
            count:         [b.count || 1, Validators.required],
            creationDate:  [b.creationDate || new Date()],
            locationId:    [0, Validators.required],
            officeId:      [b.officeId],
            userId:        [0],
            serialNo:      [b.serialNo],
            beneficiaryId: [b.beneficiaryId],
            memo:          [b.memo],
        });
    }

    private onDocument(d: AssetInventoryDoc) {
        const id = d?.id||0;
        this.entitySrv.setParentId(id);
        // this.saveButton.disabled = (id) < 1;
        this.form?.controls['parentId'].setValue(id);
    }
}
