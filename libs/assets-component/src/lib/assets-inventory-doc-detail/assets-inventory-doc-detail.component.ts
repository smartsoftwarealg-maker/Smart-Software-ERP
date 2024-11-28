import {Component, inject, Input, OnInit} from "@angular/core";
import {BaseEntityDetailComponent} from '@ss/common/ui-base-entity';
import { AssetInventoryDoc, AssetReception, OfficeAutoComplete } from '../assets-api';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import {  ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import {
    LookupsService,
    Office,
    OfficeService
} from '@ss/common/api-lookup';
import { LoginService, MaterialModule } from '@ss/common/api-common';
import { CommonUiAutoCompleteModule, DefaultAutoCompleteModel } from '@ss/common/ui-auto-complete';
import {Agent, ConsumerService} from "@ss/logistics/api-agent";
import {MatExpansionPanel} from '@angular/material/expansion';
import { AccountService, AccountStringAutocompleteModel } from '@ss/accounting/api-accounts';
import {map} from 'rxjs/operators';
import {AssetLocationService} from '@ss/assets-component';
import {AssetClassService} from '@ss/assets-component';
import {BaseEntityService} from '@ss/common/api-base-entity';
import {AssetReceptionService} from '@ss/assets-component';
import { CommonModule } from '@angular/common';



import { CommonUiDatepickerModule } from '@ss/common/ui-datepicker';
import { CustomAttributesModule } from '@ss/custom-attributes';
import { AssetInventoryDocService } from '../services/asset-inventory-doc.service';
import { AssetsBuildingService } from '@ss/assets-component';

@Component({
    selector: 'ss-assets-inventory-doc-detail',
    templateUrl: './assets-inventory-doc-detail.component.html',
    styleUrls: ['./assets-inventory-doc-detail.component.scss'],
    standalone: true,
    imports: [
        CommonModule,
        MaterialModule,




        CommonUiAutoCompleteModule,
        CommonUiDatepickerModule,
        RouterModule,
        CustomAttributesModule
    ]
})
export class AssetsInventoryDocDetailComponent extends BaseEntityDetailComponent<AssetInventoryDoc> implements OnInit {
    // Private
    private router = inject(Router);
    private officeSrv = inject(OfficeService);
    private buildingSrv = inject(AssetsBuildingService);
    private accountSrv = inject(AccountService);
    private locationSrv = inject(AssetLocationService);
    private classSrv = inject(AssetClassService);
    private consumerSrv = inject(ConsumerService);
    private receptionSrv = inject(AssetReceptionService);
    private loginSrv = inject(LoginService);

    officeLookup      = new OfficeAutoComplete(this.officeSrv);
    accountLookup     = new AccountStringAutocompleteModel(this.accountSrv)
    locationLookup    = new DefaultAutoCompleteModel(this.locationSrv);
    buildingLookup    = new DefaultAutoCompleteModel(this.buildingSrv);
    classLookup       = new DefaultAutoCompleteModel(this.classSrv);
    beneficiaryLookup = new DefaultAutoCompleteModel<Agent>(this.consumerSrv, 'id', 'denomination');
    receptionLookup   = new ReceptionAutoComplete(this.receptionSrv);

    constructor(
        public detailSrv: AssetInventoryDocService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override formBuilder: UntypedFormBuilder,
        public override confirmationSrv: ConfirmationDialogService,
        public lookupsSrv: LookupsService) {
        super(detailSrv,
            shellSrv,
            snackBarSrv,
            route,
            formBuilder,
            confirmationSrv,
            'ASSET_INVENTORY_DOCUMENTS');
        this.officeSrv.setParentId(0);
        this.locationLookup.onObjectSelected = o => this.buildingSrv.setParentId(o?.id||0);
        this.buildingLookup.onObjectSelected = o => this.officeSrv.setParentId(o?.id||0);
    }


    setupForm(b: AssetInventoryDoc): UntypedFormGroup {
        this.buildingSrv.setParentId(b.locationId||0);
        this.officeSrv.setParentId(b.buildingId||0);
        const today = new Date();
        return  this.formBuilder.group({
            id:              [b.id],
            centerId:        [b.centerId || this.loginSrv.appCtx.center],
            inventoryYear:   [b.inventoryYear || 0],
            creationDate:    [b.creationDate || today],
            description:     [b.description, Validators.required],
            userId:          [b.userId || this.loginSrv.appCtx.id],
            accountNo:       [b.accountNo],
            minValue:        [b.minValue||0],
            maxValue:        [b.maxValue|60001],
            buildingId:      [b.buildingId],
            locationId:      [b.locationId],
            officeId:        [b.officeId],
            classId:         [b.classId],
            beneficiary:     [b.beneficiary],
            receptionNo:     [b.receptionNo],
            closed:          [b.closed||false],
            acquisitionFrom: [b.acquisitionFrom],
            acquisitionTo:   [b.acquisitionTo],
        });
    }

    public getPanelHeaderClass(section: string, panel: MatExpansionPanel): string {
        // if expanded return primary background class
        if (panel.expanded)
            return 'b-primary-expansion-panel';
        else
            return '';
    }


    openReception() {
        const id = this.form.get('receptionId').value || 0;
        if (id > 0) {
            this.router.navigate(['../../asset-receptions', id], {relativeTo: this.route}).then();
        }
    }

    override readForm(): AssetInventoryDoc {
        return this.form.getRawValue();
    }
}

class ReceptionAutoComplete extends DefaultAutoCompleteModel<AssetReception> {

    constructor(public override entitySrv: BaseEntityService<AssetReception>) {
        super(entitySrv, 'id', 'description');
    }

    override filter = (filter: string) =>
        this.entitySrv
            .getList(0, 50, filter, 'serial_number')
            .pipe(map(x => x.body));

}
