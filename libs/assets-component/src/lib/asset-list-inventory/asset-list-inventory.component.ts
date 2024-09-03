import { Component, inject, OnInit, signal } from '@angular/core';
import { BaseEntityListComponent } from '@ss/common/ui-base-entity';
import {
    AssetBuilding,
    AssetInventoryDoc,
    AssetLocation,
    InventoryAsset
} from '../assets-api';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonUiConfirmationDialogModule, ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { MaterialModule, PaginatorPersistenceService } from '@ss/common/api-common';
import { CommonUiAutoCompleteModule, DefaultAutoCompleteModel } from '@ss/common/ui-auto-complete';
import { CommonModule } from '@angular/common';
import { CommonUiLangModule } from '@ss/common/ui-lang';
import { CommonUiImageInputModule } from '@ss/common/ui-image-input';
import { UiPaginationModule } from '@ss/common/ui-pagination';
import { CommonUiDatepickerModule } from '@ss/common/ui-datepicker';
import { CustomAttributesModule } from '@ss/custom-attributes';
import { AppArchiveModule } from '@ss/common/app-archive';
import { QRCodeModule } from 'angularx-qrcode';
import { DefaultReportService } from '@ss/common/ui-default-report-component';
import { Office, OfficeService } from '@ss/common/api-lookup';
import { FormBuilder, FormControl } from '@angular/forms';
import { AssetListInventoryService } from '../services/asset-list-inventory.service';
import { MatDialog } from '@angular/material/dialog';
import { AssetInventoryDocService } from '../services/asset-inventory-doc.service';
import { AssetsBuildingService } from '../services/assets-building.service';
import { AccountService, AccountStringAutocompleteModel } from '@ss/accounting/api-accounts';
import { AssetLocationService } from '../services/asset-location.service';
import { AssetClassService } from '../services/asset-class.service';
import { Agent, ConsumerService } from '@ss/logistics/api-agent';
import { AssetReceptionService } from '../services/asset-reception.service';

@Component({
    selector: 'ss-asset-list-inventory',
    templateUrl: './asset-list-inventory.component.html',
    styleUrls: ['./asset-list-inventory.component.scss'],
    standalone: true,
    imports: [
        CommonModule,
        MaterialModule,
        CommonUiLangModule,
        CommonUiImageInputModule,
        UiPaginationModule,
        CommonUiConfirmationDialogModule,
        CommonUiAutoCompleteModule,
        CommonUiDatepickerModule,
        RouterModule,
        CustomAttributesModule,
        AppArchiveModule,
        QRCodeModule
    ],
})
export class AssetListInventoryComponent extends BaseEntityListComponent<InventoryAsset> implements OnInit {
    private documentId   = 0;
    private fb           = inject(FormBuilder);
    private buildingSrv  = inject(AssetsBuildingService);
    private accountSrv   = inject(AccountService);
    private locationSrv  = inject(AssetLocationService);
    private classSrv     = inject(AssetClassService);
    private consumerSrv  = inject(ConsumerService);
    private receptionSrv = inject(AssetReceptionService);

    private dialog = inject(MatDialog);
    private officeSrv = inject(OfficeService);
    private inventoryDocSrv = inject(AssetInventoryDocService);

    officeLookup       = new DefaultAutoCompleteModel(this.officeSrv);
    inventoryDocLookup = new DefaultAutoCompleteModel(this.inventoryDocSrv);

    inventoryDoc = new FormControl<number>(0);

    accountLookup     = new AccountStringAutocompleteModel(this.accountSrv)
    locationLookup    = new DefaultAutoCompleteModel(this.locationSrv);
    buildingLookup    = new DefaultAutoCompleteModel(this.buildingSrv);
    classLookup       = new DefaultAutoCompleteModel(this.classSrv);
    beneficiaryLookup = new DefaultAutoCompleteModel<Agent>(this.consumerSrv, 'id', 'denomination');
    receptionLookup   = new DefaultAutoCompleteModel(this.receptionSrv);

    isEditable = signal(false);

    formGroup   = this.fb.group({
        id:           [0],
        officeId:     [0],
        accountNo:    [''],
        buildingId:   [0],
        beneficiary:  [0],
        locationId:   [0],
        classId:      [0],
        receptionNo:  [0],
        minValue:     [0],
        maxValue:     [99999999],
    });

    displayedColumns = [
        'recorded',
        'reference',
        'description',
        'serialNo',
        'locationDescription',
        'buildingDescription',
        'officeDescription',
        'date',
        'userDescription',
        'acquisitionDate',
        'receptionNumber',
        'comment'
];

    constructor(public listSrv: AssetListInventoryService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override router: Router,
        public override defReportSrv: DefaultReportService,
        public override confirmationSrv: ConfirmationDialogService,
        public override pagPersistSrv: PaginatorPersistenceService) {
        super(listSrv,
            shellSrv,
            snackBarSrv,
            route,
            router,
            confirmationSrv,
            defReportSrv,
            pagPersistSrv,
            'INVENTORY');
        this.pagination.pageSize = 5;
        this.inventoryDocLookup.onObjectSelected = d => this.onDocument(d);
        this.officeLookup.onObjectSelected = e => this.onOffice(e);
        this.buildingLookup.onObjectSelected = b => this.onBuilding(b);
        this.classLookup.onObjectSelected = c => this.formGroup.controls.classId.setValue(c?.id||0);
        this.beneficiaryLookup.onObjectSelected = b => this.formGroup.controls.beneficiary.setValue(b?.id||0);
        this.receptionLookup.onObjectSelected = r => this.formGroup.controls.receptionNo.setValue(r?.id||0);
        this.accountLookup.onObjectSelected = a => this.formGroup.controls.accountNo.setValue(a?.accountNo||'');
        this.locationLookup.onObjectSelected = l => this.onLocation(l);
    }

    private onLocation(l: AssetLocation) {
        this.buildingSrv.setParentId(l.id||0);
        this.formGroup.controls.locationId.setValue(l.id||0);
    }

    private onOffice(o: Office) {
        this.formGroup.controls.officeId.setValue(o.id||0);
    }

    private onBuilding(b: AssetBuilding) {
        this.officeSrv.setParentId(b.id||0);
        this.formGroup.controls.buildingId.setValue(b.id||0);
    }


    private onDocument(d: AssetInventoryDoc) {
        this.documentId = d?.id || 0;
        this.isEditable.set(!d?.closed);
        this.buildingSrv.setParentId(d.locationId||0);
        this.officeSrv.setParentId(d.buildingId||0);
        this.listSrv.document = {
            id:          d.id,
            officeId:    d.officeId,
            accountNo:   d.accountNo,
            buildingId:  d.buildingId,
            beneficiary: d.beneficiary,
            locationId:  d.locationId,
            classId:     d.classId,
            receptionNo: d.receptionNo,
            minValue:    d.minValue,
            maxValue:    d.maxValue
        };
        this.formGroup.controls.officeId.setValue(d.officeId||0);
        this.formGroup.controls.accountNo.setValue(d.accountNo||'');
        this.formGroup.controls.buildingId.setValue(d.buildingId||0);
        this.formGroup.controls.beneficiary.setValue(d.beneficiary||0);
        this.formGroup.controls.locationId.setValue(d.locationId||0);
        this.formGroup.controls.classId.setValue(d.classId||0);
        this.formGroup.controls.receptionNo.setValue(d.receptionNo||0);
        this.formGroup.controls.minValue.setValue(d.minValue||0);
        this.formGroup.controls.maxValue.setValue(d.maxValue||0);
        this.formGroup.controls.receptionNo.setValue(d.receptionNo||0);

        if (d.officeId > 0) {
            this.formGroup.controls.officeId.disable();
        } else {
            this.formGroup.controls.officeId.enable();
        }
        if (d.accountNo?.length > 0) {
            this.formGroup.controls.accountNo.disable();
        } else {
            this.formGroup.controls.accountNo.enable();
        }
        if (d.buildingId > 0) {
            this.formGroup.controls.buildingId.disable();
        } else {
            this.formGroup.controls.buildingId.enable();
        }
        if (d.beneficiary > 0) {
            this.formGroup.controls.beneficiary.disable();
        } else {
            this.formGroup.controls.beneficiary.enable();
        }
        if (d.locationId > 0) {
            this.formGroup.controls.locationId.disable();
        } else {
            this.formGroup.controls.locationId.enable();
        }
        if (d.classId > 0) {
            this.formGroup.controls.classId.disable();
        } else {
            this.formGroup.controls.classId.enable();
        }
        if (d.receptionNo > 0) {
            this.formGroup.controls.receptionNo.disable();
        } else {
            this.formGroup.controls.receptionNo.enable();
        }

        this.refresh();
    }

    override refresh(callback?: () => void) {
        const formValue = this.formGroup.getRawValue();
        formValue.id = this.documentId;
        this.listSrv.document = formValue;
        super.refresh(callback);
    }

    update(e: InventoryAsset) {
        e.documentId = this.documentId;
        this.listSrv
            .update(e)
            .subscribe(res =>  e.inventoryId = e.inventoryId? null : res  );
    }

    override ngOnInit() {
        this.addButton.visible = false;
        this.deleteButton.visible = false;
        this.editButton.visible = false;
        super.ngOnInit();
    }
}
