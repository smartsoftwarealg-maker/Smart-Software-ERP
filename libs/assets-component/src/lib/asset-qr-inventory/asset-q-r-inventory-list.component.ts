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
import {  ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { LoginService, MaterialModule, PaginatorPersistenceService } from '@ss/common/api-common';
import { DefaultAutoCompleteModel, UiAutoCompleteComponent } from '@ss/common/ui-auto-complete';
import { CommonModule } from '@angular/common';

import { DefaultReportService } from '@ss/common/ui-default-report-component';
import { Office, OfficeService } from '@ss/common/api-lookup';
import { FormBuilder, FormControl } from '@angular/forms';
import { AssetListInventoryService } from '../services/asset-list-inventory.service';
import { AssetsBuildingService } from '../services/assets-building.service';
import { AccountService, AccountStringAutocompleteModel } from '@ss/accounting/api-accounts';
import { AssetLocationService } from '../services/asset-location.service';
import { AssetClassService } from '../services/asset-class.service';
import { Agent, ConsumerService } from '@ss/logistics/api-agent';
import { AssetReceptionService } from '../services/asset-reception.service';
import { AssetOpenInventoryDocService } from '../services/asset-open-inventory-doc.service';
import { PaginationComponent } from '@ss/common/ui-pagination';
import { TranslateDirective } from '@ss/common/ui-lang';
import { DatePickerComponent } from '@ss/common/ui-datepicker';

@Component({
    selector: 'ss-asset-list-inventory',
    templateUrl: './asset-q-r-inventory-list.component.html',
    styleUrls: ['./asset-q-r-inventory-list.component.scss'],
    standalone: true,
    imports: [
        CommonModule,
        MaterialModule,
        TranslateDirective,
        RouterModule,
        PaginationComponent,
        UiAutoCompleteComponent,
        DatePickerComponent
    ]
})
export class AssetQRInventoryListComponent extends BaseEntityListComponent<InventoryAsset> implements OnInit {
    #loginSrv      = inject(LoginService);
    #documentId   = 0;
    #fb           = inject(FormBuilder);
    #buildingSrv  = inject(AssetsBuildingService);
    #accountSrv   = inject(AccountService);
    #locationSrv  = inject(AssetLocationService);
    #classSrv     = inject(AssetClassService);
    #consumerSrv  = inject(ConsumerService);
    #receptionSrv = inject(AssetReceptionService);

    // private dialog = inject(MatDialog);
    private officeSrv       = inject(OfficeService);
    private inventoryDocSrv = inject(AssetOpenInventoryDocService);

    officeLookup       = new DefaultAutoCompleteModel(this.officeSrv);
    inventoryDocLookup = new DefaultAutoCompleteModel(this.inventoryDocSrv);

    inventoryDoc   = new FormControl<number>(0);
    inventoryDocDate = new FormControl<Date | null>(null);
    accountLookup     = new AccountStringAutocompleteModel(this.#accountSrv);
    locationLookup    = new DefaultAutoCompleteModel(this.#locationSrv);
    buildingLookup    = new DefaultAutoCompleteModel(this.#buildingSrv);
    classLookup       = new DefaultAutoCompleteModel(this.#classSrv);
    beneficiaryLookup = new DefaultAutoCompleteModel<Agent>(this.#consumerSrv, 'id', 'denomination');
    receptionLookup   = new DefaultAutoCompleteModel(this.#receptionSrv);

    readonly currentUser = this.#loginSrv.appCtx.id;
    readonly isResponsible = this.#loginSrv.appCtx.responsible;
    isEditable = signal(false);

    formGroup   = this.#fb.group({
        id:           [0],
        documentId:   [0],
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
        'acquisitionDate',
        'receptionNumber',
        'assignmentNo',
        'date',
        'userDescription',
        'newBuildingDescription',
        'newOfficeDescription',
        'newBeneficiaryDescription',
        'comment',
    ];

    constructor(
        public override entitySrv: AssetListInventoryService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override router: Router,
        public override defReportSrv: DefaultReportService,
        public override confirmationSrv: ConfirmationDialogService,
        public override pagPersistSrv: PaginatorPersistenceService) {
        super(entitySrv,
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
        this.pagination.pageSize = 5;
    }

    private onLocation(l: AssetLocation) {
        this.#buildingSrv.setParentId(l.id||0);
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
        this.inventoryDocDate.setValue(d?.creationDate);
        this.entitySrv.lastDoc = d;
        this.#documentId = d?.id || 0;
        this.formGroup.controls.documentId.setValue(this.#documentId);
        this.isEditable.set(!d?.closed);
        this.#buildingSrv.setParentId(d.locationId||0);
        this.officeSrv.setParentId(d.buildingId||0);
        this.entitySrv.document = {
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
        formValue.id = this.#documentId;
        this.entitySrv.document = formValue;
        super.refresh(callback);
    }

    update(e: InventoryAsset) {
        e.documentId = this.#documentId;
        this.entitySrv
            .update(e)
            .subscribe(res =>  {
                e.inventoryId = e.inventoryId? null : res;
                this.selectRow(e);
            }  );
    }

    override ngOnInit() {
        this.addButton.visible    = false;
        this.deleteButton.visible = false;
        super.ngOnInit();
        if (this.entitySrv.lastDoc?.id) {
            this.onDocument(this.entitySrv.lastDoc);
            this.inventoryDoc.setValue(this.entitySrv.lastDoc?.id, {onlySelf: true, emitEvent: false});
        }
    }

    override selectRow(row: InventoryAsset) {
        super.selectRow(row);
        this.editButton.visible = (row?.inventoryId||0) > 0;
    }

    override showDetail(id: number) {
        super.showDetail(this.selectedRow.inventoryId||0);
    }
}

