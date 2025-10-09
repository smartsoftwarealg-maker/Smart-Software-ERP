import { Component, inject, OnInit } from '@angular/core';

import { BaseEntityDetailComponent } from '@ss/common/ui-base-entity';
import { Asset } from '../services/asset-api';
import { AGENT_ARCHIVES,  AppArchiveService } from '@ss/common/app-archive';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { ConsumerService, CustomerService } from '@ss/logistics/api-agent';
import { IsParamService, LoginService, MaterialModule } from '@ss/common/api-common';
import { AssetEndsService } from '@ss/accounting/accounting-api';
import { MatDialog } from '@angular/material/dialog';
import {
    FurnitureStatusService,
    Lookup,
    LookupsService,
    MarkService,
    Office,
    OfficeService
} from '@ss/common/api-lookup';
import { Account, AccountAutocompleteModel, AccountService } from '@ss/accounting/api-accounts';
import { CostCenterService } from '@ss/logistics/api-cost-center';
import { AssetClassService, AssetReception, AssetsService, OfficeSearchComponent } from '@ss/assets-component';
import {
    AssetReceptionService,
    Depreciation,
    OfficeAutoComplete
} from '@ss/assets-component';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { DefaultAutoCompleteModel, UiAutoCompleteComponent } from '@ss/common/ui-auto-complete';
import { FormsModule, ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { map, switchMap, tap } from 'rxjs/operators';
import { MatExpansionModule, MatExpansionPanel } from '@angular/material/expansion';
import { Observable } from 'rxjs';
import { CmmsAssetService } from '../services/cmms-asset.service';
import { DatePickerComponent } from '@ss/common/ui-datepicker';


import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';

import { CMMSFunctionService } from '@ss/cmms/lookups';
import { BaseEntityService } from '@ss/common/api-base-entity';
import { AssetPmService } from '../services/asset-pm.service';
import { CMMSAssetTriggerService } from '@ss/cmms/asset-triggers';
import { TranslateDirective, TranslatePipe } from '@ss/common/ui-lang';

@Component({
    selector: 'ss-cmms-asset-detail',
    standalone: true,
    imports: [DatePickerComponent, FormsModule, MatButtonModule, MatExpansionModule, MatFormFieldModule, MatInputModule, MatOptionModule, MatSelectModule, MatTableModule, MatTooltipModule, ReactiveFormsModule, RouterOutlet, MaterialModule, UiAutoCompleteComponent, TranslatePipe, TranslateDirective],
    templateUrl: './cmms-asset-detail.component.html',
    styleUrls: ['./cmms-asset-detail.component.scss'],
})
export class CmmsAssetDetailComponent extends BaseEntityDetailComponent<Asset> implements OnInit {
    private pmSrv = inject(AssetPmService);
    private router = inject(Router);
    private functionSrv = inject(CMMSFunctionService);
    private assetSrv = inject(AssetsService);
    private archiveSrv = inject(AppArchiveService);
    private customerSrv = inject(CustomerService);
    private loginSrv = inject(LoginService);
    private endSrv = inject(AssetEndsService);
    private dialog = inject(MatDialog);
    private officeSrv =  inject(OfficeService);
    private triggerSrv = inject(CMMSAssetTriggerService);
    private accountSrv = inject(AccountService);
    private isParamSrv =  inject(IsParamService);
    private costCenterSrv =  inject(CostCenterService);
    private classSrv =  inject(AssetClassService);
    private statusSrv =  inject(FurnitureStatusService);
    private consumerSrv =  inject(ConsumerService);
    private markSrv =  inject(MarkService);
    private receptionSrv =  inject(AssetReceptionService);

    private maxReference: string = null;

    // Public
    minLength = 1;
    activePanel = -1;
    PANEL_ROUTES = ['pm', 'inspection', 'triggers', 'archive'];
    readonly PM_PANEL = 0;
    readonly INSPECTION_PANEL = 1;
    readonly TRIGGER_PANEL = 2;
    readonly ARCHIVE_PANEL = 3;

    markAutoCompleteModel      = new DefaultAutoCompleteModel(this.markSrv);
    classAutoCompleteModel     = new DefaultAutoCompleteModel(this.classSrv);
    statusAutoCompleteModel    = new DefaultAutoCompleteModel(this.statusSrv);
    accountAutoCompleteModel   = new AccountAutocompleteModel(this.accountSrv);
    ccAutoCompleteModel        = new DefaultAutoCompleteModel(this.costCenterSrv);
    officeAutoCompleteModel    = new OfficeAutoComplete(this.officeSrv);
    functionLookup            = new DefaultAutoCompleteModel<Lookup>(this.functionSrv);
    customerAutoCompleteModel  = new DefaultAutoCompleteModel(this.customerSrv, 'id', 'denomination');
    accountantDepreciation: Depreciation[] = [];
    fiscalDepreciation: Depreciation[] = [];
    assetEnds: Lookup[] = [];
    receptionLookup            = new ReceptionAutoComplete(this.receptionSrv);

    constructor(
        public detailSrv: CmmsAssetService,
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
            'ASSETS');
        this.accountAutoCompleteModel.onObjectSelected = a => this.updateAccountDefaults(a);
        this.officeAutoCompleteModel.onObjectSelected = o => this.onOfficeChange(o);
    }

    setupForm(b: Asset): UntypedFormGroup {
        this.receptionSrv.sortColumn = { active: 'id', direction: 'asc'};
        this.minLength = 11;
        const ref2Validators = [Validators.maxLength(20)];
        const form = this.formBuilder.group({
            id: [b.id],
            reference: [{value: b.reference, disabled: !!b.isFinal}, [Validators.minLength(this.minLength),  Validators.required]],
            reference2: [{value: b.reference2 || this.maxReference, disabled: !!b.isFinal}, ref2Validators],
            description: [{value: b.description, disabled: !!b.isFinal}, Validators.required],
            acquisitionDate: [b.acquisitionDate],
            serviceDate: [b.serviceDate],
            acquisitionValue: [b.acquisitionValue || 0, Validators.required],
            supplier: [{ value: b.supplier, disabled: true }],
            dateOut: [b.dateOut],
            customer: [b.customer],
            serial_no: [{ value: b.serial_no, disabled: !!b.isFinal }],
            location: [b.location],
            centerId: [b.centerId || this.loginSrv.appCtx.center],
            accountno:  [{ value: b.accountno, disabled: !!b.isFinal}],
            accountId: [{ value: b.accountId, disabled: !!b.isFinal}, Validators.required],
            costCenter: [{ value: b.costCenter, disabled: !!b.isFinal}],
            investEnd: [b.investEnd],
            receptionNumber: [b.receptionNumber],
            receptionDate: [{ value: b.receptionDate, disabled: true }],
            comment: [b.comment],
            office: [b.office],
            sales_price: [b.sales_price],
            investment_type: [b.investment_type],
            outOfService: [b.outOfService || false],
            assetClass:  [{ value: b.assetClass, disabled: !!b.isFinal}, Validators.required],
            status:      [b.status],
            receptionId:    [{ value: b.receptionId, disabled: !!b.isFinal}],
            orderNumber:    [{ value: b.orderNumber, disabled: true }],
            orderDate:      [{ value: b.orderDate, disabled: true }],
            requestNumber:  [b.requestNumber],
            requestDate:    [b.requestDate],
            mark:           [{ value: b.mark, disabled: !!b.isFinal}],
            deliveryNumber: [{ value: b.deliveryNumber, disabled: true }],
            deliveryDate:   [{ value: b.deliveryDate, disabled: true }],
            invoiceNumber:  [{ value: b.invoiceNumber, disabled: true }],
            invoiceDate:    [{ value: b.invoiceDate, disabled: true }],
            site:           [{ value: b.site, disabled: true }],
            building:       [{ value: b.building, disabled: true }],
            isVehicle:      [b.isVehicle || false],
            function:       [b.function]
        });
        if (b.id) {
            this.maxReference = b.reference2;
        } else {
            this.accountantDepreciation = this.fiscalDepreciation = [];
            this.assetSrv
                .getMaxReference()
                .subscribe(res => {
                    this.maxReference = res.reference;
                    form.controls['reference2'].setValue(this.maxReference);
                    form.controls['reference'].setValue(this.maxReference);
                });
        }
        return form;
    }

    public getPanelHeaderClass(section: string, panel: MatExpansionPanel): string {
        // if expanded return primary background class
        if (panel.expanded)
            return 'b-primary-expansion-panel';
        else
            return '';
    }

    override preload(): Observable<any> {
        return this.isParamSrv.is('ANSEJ')
            .pipe(switchMap(() => this.endSrv.getList(0, 50)),
                tap(res => this.assetEnds = res.body));
    }

    private updateAccountDefaults(a: Account) {
        if (this.form && a) {
            this.form.controls['accountno'].setValue(a.accountNo);
        }
    }

    onOfficeChange(off: Office) {
        if (off) {
            this.form.get('site').setValue(off.locationDescription, {onlySelf: true});
            this.form.get('building').setValue(off.buildingDescription, {onlySelf: true});
        }
    }

    openSearchDlg() {
        const dialogRef = this.dialog.open(OfficeSearchComponent,
            {
                width: '600px',
                height: '520px',
                disableClose: true,
                data: {id: 0, description: null, cmms: true }
            });
        dialogRef
            .afterClosed()
            .subscribe(res => {
                this.onOfficeChange(res);
                this.form.controls['office']?.setValue(res?.id);
            });
    }

    openReception() {
        const id = this.form.get('receptionId').value || 0;
        if (id > 0) {
            this.router.navigate(['../../asset-receptions', id], {relativeTo: this.route}).then();
        }
    }

    override loadEntity(id: number): Observable<Asset> {
        this.archiveSrv.appId = AGENT_ARCHIVES;
        this.officeSrv.setParentId(id || 0);
        this.triggerSrv.setParentId(id || 0);
        this.pmSrv.setParentId(id || 0);
        return super.loadEntity(id);
    }

    showPanel(panel: -1|0|1|2|3|4|5) {
        this.activePanel = panel;
        const dest = this.PANEL_ROUTES[panel];
        if (this.router.url.indexOf(dest) <0) {
            this.router.navigate([dest], { relativeTo: this.route }).then();
        }
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
