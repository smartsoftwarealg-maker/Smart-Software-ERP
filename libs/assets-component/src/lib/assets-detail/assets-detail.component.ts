import { Component, inject, OnInit, ViewChild } from '@angular/core';
import {BaseEntityDetailComponent} from '@ss/common/ui-base-entity';
import {Asset, AssetReception, Depreciation, OfficeAutoComplete} from '../assets-api';
import {KeepOnToolbar, ShellService, SnackBarService, ToolbarButton} from '@ss/common/ui-shell';
import { ActivatedRoute, Router, RouterModule, RouterOutlet } from '@angular/router';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import {  ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import {
    FurnitureStatusService,
    Lookup,
    LookupsService,
    MarkService,
    Office,
    OfficeService
} from '@ss/common/api-lookup';
import {AssetsService} from '../services/assets.service';
import { IsParamService, LoginService, MaterialModule } from '@ss/common/api-common';
import { DefaultAutoCompleteModel, UiAutoCompleteComponent } from '@ss/common/ui-auto-complete';
import {Agent, AgentService, ConsumerService, CustomerService, SupplierService} from '@ss/logistics/api-agent';
import {MatExpansionPanel} from '@angular/material/expansion';
import {Account, AccountAutocompleteModel, AccountService} from '@ss/accounting/api-accounts';
import {debounceTime, distinctUntilChanged, map, switchMap, tap} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {AssetEndsService} from '@ss/accounting/accounting-api';
import {MatDialog} from '@angular/material/dialog';
import {AssetSearchDialogComponent} from '../asset-search-dialog/asset-search-dialog.component';
import {CostCenterService} from '@ss/logistics/api-cost-center';
import {AssetClassService} from '../services/asset-class.service';
import {BaseEntityService} from '@ss/common/api-base-entity';
import {OfficeSearchComponent} from '../office-search/office-search.component';
import {AssetReceptionService} from '../services/asset-reception.service';
import {
    AGENT_ARCHIVES,
    AppArchiveService,
    ASSET_ARCHIVES,
    ARCHIVE_ROUTE_URL, AppArchiveListComponent
} from '@ss/common/app-archive';
import {AssetCostsService} from '../services/asset-costs.service';
import {AssetRevaluationService} from '../services/asset-revaluation.service';
import {AssetBlockingService} from '../services/asset-blocking.service';
import {DepreciationRateService} from '../services/depreciation-rate.service';
import { CommonModule } from '@angular/common';
import { DatePickerComponent } from '@ss/common/ui-datepicker';
import { AssetAppointmentListComponent } from '../asset-appointment-list/asset-appointment-list.component';
import { AssetCostsListComponent } from '../asset-costs-list/asset-costs-list.component';
import { TranslateDirective, TranslatePipe } from '@ss/common/ui-lang';
import { ChildAttributesComponent } from '@ss/custom-attributes';

@Component({
    selector: 'ss-assets-detail',
    templateUrl: './assets-detail.component.html',
    styleUrls: ['./assets-detail.component.scss'],
    standalone: true,
    imports: [
        CommonModule,
        MaterialModule,
        TranslateDirective,
        TranslatePipe,
        DatePickerComponent,
        RouterModule,
        AssetAppointmentListComponent,
        UiAutoCompleteComponent,
        ChildAttributesComponent
    ]
})
export class AssetsDetailComponent extends BaseEntityDetailComponent<Asset> implements OnInit {
    // Private
    private archiveSrv = inject(AppArchiveService);
    private router = inject(Router);
    private agentSrv = inject(AgentService);
    private customerSrv = inject(CustomerService);
    private loginSrv = inject(LoginService);
    private endSrv = inject(AssetEndsService);
    private dialog = inject(MatDialog);
    private officeSrv = inject(OfficeService);
    private accountSrv = inject(AccountService);
    private isParamSrv = inject(IsParamService);
    private costCenterSrv = inject(CostCenterService);
    private classSrv = inject(AssetClassService);
    private statusSrv = inject(FurnitureStatusService);
    private consumerSrv = inject(ConsumerService);
    private markSrv = inject(MarkService);
    private receptionSrv = inject(AssetReceptionService);
    private assetCostsSrv = inject(AssetCostsService);
    private assetRevaluationSrv = inject(AssetRevaluationService);
    private assetBlockingSrv = inject(AssetBlockingService);
    private rateSrv = inject(DepreciationRateService);
    private isANSEJ = false;

    private importBtn: ToolbarButton = {
        icon: 'fa-solid fa-file-import',
        label: 'ASSET_IMPORT',
        disabled: false,
        visible: this.isANSEJ,
        keepOnToolbar: KeepOnToolbar.ALWAYS, // save button is too important to hide
        click: () => this.importAsset()
    };
    private maxReference: string = null;

    @ViewChild(RouterOutlet) outlet: RouterOutlet | null = null;

    // Public
    minLength = 1;
    depreciationTypes: Lookup[] = [
        {id: 1, description: 'ASSET_LINEAR'},
        {id: 2, description: 'ASSET_DECLINING'},
        {id: 3, description: 'ASSET_ACTIVITY'},
    ];

    isAQS = false;
    isCMMS: boolean = false;

    markAutoCompleteModel = new DefaultAutoCompleteModel(this.markSrv);
    classAutoCompleteModel = new DefaultAutoCompleteModel(this.classSrv);
    statusAutoCompleteModel = new DefaultAutoCompleteModel(this.statusSrv);
    accountAutoCompleteModel = new AccountAutocompleteModel(this.accountSrv);
    ccAutoCompleteModel = new DefaultAutoCompleteModel(this.costCenterSrv);
    officeAutoCompleteModel = new OfficeAutoComplete(this.officeSrv);
    requesterLookup = new DefaultAutoCompleteModel<Agent>(this.consumerSrv, 'id', 'denomination');
    agentLookup = new DefaultAutoCompleteModel<Agent>(this.agentSrv, 'id', 'denomination');
    beneficiaryLookup = new DefaultAutoCompleteModel<Agent>(this.consumerSrv, 'id', 'denomination');
    customerAutoCompleteModel = new DefaultAutoCompleteModel(this.customerSrv, 'id', 'denomination');
    receptionLookup = new ReceptionAutoComplete(this.receptionSrv);
    accountantDepreciation: Depreciation[] = [];
    fiscalDepreciation: Depreciation[] = [];
    assetEnds: Lookup[] = [];
    depreciationColumns = ['year', 'depreciation', 'totalDepreciation', 'remaining'];
    readonly LOCAL_ASSET_ARCHIVE = ASSET_ARCHIVES;

    readonly COSTS_ROUT = 4;
    readonly REVALUATIONS_ROUT = 5;
    readonly BLOCKINGS_ROUT = 6;
    readonly DEPRECIATION_RATE_ROUT = 9;
    readonly ARCHIVE_ROUT = 10;

    #panelIndexs = [0, 0, 0, 0, 1, 2, 3, 0, 0, 4, 5, 0];

    private PANELS = [
        ARCHIVE_ROUTE_URL,     // 0
        'costs',               // 1
        'revaluations',        // 2
        'blockings',           // 3
        'depreciation-rate',   // 4
        ARCHIVE_ROUTE_URL,     // 5
    ];

    activePanel: number;

    constructor(
        public detailSrv: AssetsService,
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
        this.officeSrv.setParentId(0);
        this.accountAutoCompleteModel.onObjectSelected = a => this.updateAccountDefaults(a);
        this.officeAutoCompleteModel.onObjectSelected = o => this.onOfficeChange(o);
        this.receptionLookup.onObjectSelected = o => this.onReceptionChange(o);
    }

    showPanel(panel: number) {
        this.activePanel = panel;
        if (this.#panelIndexs[panel] > 0) {
            const dest = this.PANELS[this.#panelIndexs[panel]];
            if (this.router.url.indexOf(dest) < 0) {
                this.router
                    .navigate([dest], { relativeTo: this.route })
                    .then(_ => {
                        if (this.outlet?.component instanceof AssetCostsListComponent) {
                            (<AssetCostsListComponent>this.outlet?.component).isEditable = this.isEditable;
                        }
                    });
            }
        }
    }

    setupForm(b: Asset): UntypedFormGroup {
        this.archiveSrv.setParentId(b.id||0);
        this.assetCostsSrv.setParentId(b.id||0);
        this.assetRevaluationSrv.setParentId(b.id);
        this.assetBlockingSrv.setParentId(b.id);
        this.rateSrv.setParentId(b.id);
        this.receptionSrv.sortColumn = {active: 'id', direction: 'asc'};
        const today = new Date();
        this.importBtn.visible = !b.id && this.isANSEJ;
        this.minLength = this.isANSEJ ? 11 : 1;
        const ref2Validators = this.isANSEJ ? [Validators.maxLength(5), Validators.required] : [Validators.maxLength(20)];
        const form = this.formBuilder.group({
            id: [b.id],
            reference: [{
                value: b.reference,
                disabled: !!b.isFinal
            }, [Validators.minLength(this.minLength), Validators.required]],
            reference2: [{value: b.reference2 || this.maxReference, disabled: !!b.isFinal}, ref2Validators],
            description: [{value: b.description, disabled: !!b.isFinal}, Validators.required],
            acquisitionDate: [b.acquisitionDate],
            serviceDate: [b.serviceDate],
            reserviceDate: [b.reserviceDate],
            acquisitionValue: [b.acquisitionValue || 0, Validators.required],
            historicValue: [b.historicValue || 0],
            depreciationRate: [b.depreciationRate || 0, Validators.required],
            residualValue: [b.residualValue || 0, Validators.required],
            vat: [b.vat || 0, Validators.required],
            itemCount: [b.itemCount || 1],
            depreciationType: [b.depreciationType || 1],
            supplier: [{value: b.supplier, disabled: true}],
            originalSupplier: [{value: b.originalSupplier, disabled: true}],
            dateOut: [b.dateOut],
            customer: [b.customer],
            serial_no: [{value: b.serial_no, disabled: !!b.isFinal}],
            location: [b.location],
            centerId: [b.centerId || this.loginSrv.appCtx.center],
            accountno: [{value: b.accountno, disabled: !!b.isFinal}],
            accountId: [{value: b.accountId, disabled: !!b.isFinal}, Validators.required],
            costCenter: [{value: b.costCenter, disabled: !!b.isFinal}],
            investEnd: [b.investEnd],
            receptionNumber: [b.receptionNumber],
            receptionDate: [{value: b.receptionDate, disabled: true}],
            comment: [b.comment],
            office: [b.office],
            beneficiaryId: [b.beneficiaryId],
            sales_price: [b.sales_price],
            useful_life: [b.useful_life || 5, Validators.required],
            investment_type: [b.investment_type],
            old_depreciation: [b.old_depreciation || 0],
            outOfService: [b.outOfService || false],
            startYear: [b.startYear || 0],
            assetClass: [{value: b.assetClass, disabled: !!b.isFinal}, Validators.required],
            status: [b.status],
            receptionId: [{value: b.receptionId, disabled: !!b.isFinal}],
            orderNumber: [{value: b.orderNumber, disabled: true}],
            orderDate: [{value: b.orderDate, disabled: true}],
            requestNumber: [b.requestNumber],
            requestDate: [b.requestDate],
            requester: [b.requester],
            mark: [{value: b.mark, disabled: !!b.isFinal}],
            deliveryNumber: [{value: b.deliveryNumber, disabled: true}],
            deliveryDate: [{value: b.deliveryDate, disabled: true}],
            invoiceNumber: [{value: b.invoiceNumber, disabled: true}],
            invoiceDate: [{value: b.invoiceDate, disabled: true}],
            site: [{value: b.site, disabled: true}],
            building: [{value: b.building, disabled: true}],
            isVehicle: [b.isVehicle]
        });
        if (!this.isAQS) {
            form.controls['assetClass'].clearValidators();
        }
        if (b.id) {
            this.maxReference = b.reference2;
            this.detailSrv.getDepreciation(b.id)
                .subscribe(res => {
                    this.accountantDepreciation = res[0] || [];
                    this.fiscalDepreciation = res[1] || [];
                });
        } else {
            this.accountantDepreciation = this.fiscalDepreciation = [];
            this.detailSrv
                .getMaxReception()
                .pipe(tap(res => form.controls['receptionNumber'].setValue(res.reception)),
                    switchMap(_ => this.detailSrv.getMaxReference()))
                .subscribe(res => {
                    this.maxReference = res.reference;
                    form.controls['reference2'].setValue(this.maxReference);
                    form.controls['reference'].setValue(this.maxReference);
                });
        }
        this.setClassListener(form);
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
            .pipe(tap(res => {
                this.isANSEJ = res;
                this.importBtn.visible = this.isANSEJ;
            }),
            switchMap(_ => this.isParamSrv.is('AQS')),
            tap(res => this.isAQS = res),
            switchMap(_ => this.endSrv.getList(0, 50)),
            tap(res => this.assetEnds = res.body),
            switchMap(() => this.route.data),
            tap(map => this.isCMMS = map['isCMMS'] === 'true'));
    }

    override ngOnInit() {
        super.ngOnInit();
        this.archiveSrv.appId = ASSET_ARCHIVES;
        this.shellSrv.addButton(this.importBtn);
    }

    private setClassListener(form: UntypedFormGroup) {
        if (this.isAQS) {
            const subs = form
                .controls['assetClass']
                .valueChanges
                .pipe(
                    debounceTime(300),
                    distinctUntilChanged(),
                    switchMap(res => this.detailSrv.getAQSMaxReference(<number>res))
                ).subscribe(res => form.controls['reference'].setValue(res.reference));
            this.subscriptions.push(subs);
        }
    }

    private importAsset() {
        const dialogRef = this.dialog.open(AssetSearchDialogComponent,
            {
                data: {id: 0, reference: '', centerId: 0}
            });

        dialogRef.afterClosed().subscribe(asset => {
            if (asset) {
                delete asset['decliningRate'];
                delete asset['creation_date'];
                delete asset['parentId'];
                delete asset['className'];
                delete asset['ccCode'];
                asset.id = 0;
                asset.reference2 = this.form?.controls['reference2']?.value;
                asset.centerId = this.loginSrv.appCtx.center;
                asset.accountno = asset.accountno || null;
                asset.description = asset.description || null;
                asset.acquisitionDate = asset.acquisitionDate || null;
                asset.serviceDate = asset.serviceDate || null;
                asset.reserviceDate = asset.reserviceDate || null;
                asset.invoiceNumber = asset.invoiceNumber || null;
                asset.itemCount = asset.itemCount || null;
                asset.acquisitionValue = asset.acquisitionValue || 0;
                asset.historicValue = asset.historicValue || 0;
                asset.depreciationRate = asset.depreciationRate || null;
                asset.depreciationType = asset.depreciationType || null;
                asset.residualValue = asset.residualValue || null;
                asset.supplier = asset.supplier || null;
                asset.requester = asset.requester || null;
                asset.originalSupplier = asset.originalSupplier || null;
                asset.receptionNumber = asset.receptionNumber || null;
                asset.dateOut = null;
                asset.customer = null;
                asset.serial_no = asset.serial_no || null;
                asset.location = asset.location || null;
                asset.costCenter = asset.costCenter || null;
                asset.investEnd = null;
                asset.startYear = asset.startYear || 0;
                asset.receptionDate = asset.receptionDate || null;
                asset.comment = asset.comment || null;
                asset.requester = asset.requester || null;
                asset.requestNumber = asset.requestNumber || null;
                asset.requestDate = asset.requestDate || null;
                asset.orderNumber = asset.orderNumber || null;
                asset.orderDate = asset.orderDate || null;
                asset.office = asset.office || null;
                asset.vat = asset.vat || 0;
                asset.sales_price = asset.sales_price || null;
                asset.investment_type = asset.investment_type || null;
                asset.outOfService = false;
                asset.accountId = asset.accountId || null;
                asset.assetClass = asset.assetClass || null;
                asset.status = asset.status || null;
                asset.mark = asset.mark || null;
                asset.site = asset.site || null;
                asset.building = asset.building || null;
                asset.beneficiaryId = asset.beneficiaryId || null;
                asset.receptionId = asset.receptionId || null;
                asset.deliveryNumber = asset.deliveryNumber || null;
                asset.deliveryDate = asset.deliveryDate || null;
                asset.invoiceDate = asset.invoiceDate || null;
                asset.isVehicle = asset.isVehicle || false;
                asset.reserviceDate = asset.reserviceDate || null;

                this.form.setValue(asset, {onlySelf: false, emitEvent: true});
            }
        });
    }

    openSearchDlg() {
        const dialogRef = this.dialog.open(OfficeSearchComponent,
            {
                width: '600px',
                height: '540px',
                data: {id: 0, description: null, cmms: this.isCMMS}
            });
        dialogRef
            .afterClosed()
            .subscribe(res => {
                this.onOfficeChange(res);
                this.form.controls['office']?.setValue(res?.id);
            });
    }

    private updateAccountDefaults(a: Account) {
        if (this.form && a) {
            this.form.controls['accountno'].setValue(a.accountNo);
            this.form.controls['depreciationRate'].setValue(a.depreciationRate || 0);
            this.form.controls['useful_life'].setValue(a.usefulLife || 0);
        }
    }

    onOfficeChange(off: Office) {
        if (off) {
            this.form.get('site').setValue(off.locationDescription, {onlySelf: true});
            this.form.get('building').setValue(off.buildingDescription, {onlySelf: true});
        }
    }

    onReceptionChange(r: AssetReception) {
        if (r) {
            const numb = this.form.get('requestNumber').value;
            const date = this.form.get('requestDate').value;
            if (!numb || numb.trim() === '') {
                this.form.get('requestNumber').setValue(r.requestNumber);
                this.form.get('requester').setValue(r.requester);
            }
            if (!date) {
                this.form.get('requestDate').setValue(r.requestDate);
            }
            this.form.get('orderDate').setValue(r.orderDate);
            this.form.get('orderNumber').setValue(r.orderNumber);
            this.form.get('receptionDate').setValue(r.receptionDate);

            this.form.get('deliveryDate').setValue(r.deliveryDate);
            this.form.get('deliveryNumber').setValue(r.deliveryNumber);

            this.form.get('invoiceDate').setValue(r.invoiceDate);
            this.form.get('invoiceNumber').setValue(r.invoiceNumber);

            this.form.get('supplier').setValue(r.supplierName);
        }
    }

    openReception() {
        const id = this.form.get('receptionId').value || 0;
        if (id > 0) {
            this.router.navigate(['../../asset-receptions', id], {relativeTo: this.route}).then();
        }
    }

    override readForm(): Asset {
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
