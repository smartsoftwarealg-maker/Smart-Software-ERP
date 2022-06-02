import {Component, OnInit} from '@angular/core';
import {BaseEntityDetailComponent} from '@ss/common/ui-base-entity';
import {Asset, Depreciation} from '../assets-api';
import {KeepOnToolbar, ShellService, SnackBarService, ToolbarButton} from '@ss/common/ui-shell';
import {ActivatedRoute} from '@angular/router';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {Lookup, LookupsService, OfficeService} from '@ss/common/api-lookup';
import {AssetsService} from '../assets.service';
import {IsParamService, LoginService} from '@ss/common/api-common';
import {DefaultAutoCompleteModel} from '@ss/common/ui-auto-complete';
import {CustomerService, SupplierService} from '@ss/logistics/api-agent';
import {MatExpansionPanel} from '@angular/material/expansion';
import {AccountAutocompleteModel, AccountService} from '@ss/accounting/api-accounts';
import {switchMap, tap} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {AssetLocationService} from '../asset-location.service';
import {AssetEndsService} from '@ss/accounting/accounting-api';
import {MatDialog} from '@angular/material/dialog';
import {AssetSearchDialogComponent} from '../asset-search-dialog/asset-search-dialog.component';
import {CostCenterService} from '@ss/logistics/api-cost-center';
import {AssetClassService} from '../asset-class.service';

@Component({
    selector: 'ss-assets-detail',
    templateUrl: './assets-detail.component.html',
    styleUrls: ['./assets-detail.component.scss']
})
export class AssetsDetailComponent extends BaseEntityDetailComponent<Asset> implements OnInit {
    private isANSEJ = false;
    private importBtn: ToolbarButton = {
        icon: 'fa-solid fa-file-import',
        label: 'ASSET_IMPORT',
        disabled: false,
        visible: this.isANSEJ,
        keepOnToolbar: KeepOnToolbar.ALWAYS, // save button is too important to hide
        click: () => this.importAsset()
    };
    private minLength = 1;
    private maxReference: string = null;
    classAutoCompleteModel = new DefaultAutoCompleteModel(this.classSrv);
    supplierAutoCompleteModel = new DefaultAutoCompleteModel(this.supplierSrv, 'id', 'denomination');
    accountAutoCompleteModel  = new AccountAutocompleteModel(this.accountSrv);
    ccAutoCompleteModel  = new DefaultAutoCompleteModel(this.costCenterSrv);
    locationAutoCompleteModel  = new DefaultAutoCompleteModel(this.locationSrv);
    officeAutoCompleteModel  = new DefaultAutoCompleteModel(this.officeSrv);
    originalSupplierAutoCompleteModel = new DefaultAutoCompleteModel(this.supplierSrv, 'id', 'denomination');
    customerAutoCompleteModel = new DefaultAutoCompleteModel(this.customerSrv, 'id', 'denomination');
    accountantDepreciation: Depreciation[] = [];
    fiscalDepreciation: Depreciation[] = [];
    assetEnds: Lookup[] = [];
    depreciationColumns = ['year', 'depreciation', 'totalDepreciation', 'remaining'];

    constructor(
        public detailSrv: AssetsService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override formBuilder: FormBuilder,
        public override confirmationSrv: ConfirmationDialogService,
        public lookupsSrv: LookupsService,
        private supplierSrv: SupplierService,
        private customerSrv: CustomerService,
        private officeSrv: OfficeService,
        private locationSrv: AssetLocationService,
        private accountSrv: AccountService,
        private loginSrv: LoginService,
        private endSrv: AssetEndsService,
        private dialog: MatDialog,
        private isParamSrv: IsParamService,
        private costCenterSrv: CostCenterService,
        private classSrv: AssetClassService) {
        super(detailSrv,
            shellSrv,
            snackBarSrv,
            route,
            formBuilder,
            confirmationSrv, 'ASSETS');
        this.officeSrv.setParentId(0);
    }

    setupForm(b: Asset): FormGroup {
        const today = new Date();
        this.importBtn.visible = !b.id && this.isANSEJ;
        this.minLength = this.isANSEJ? 11 : 1;
        const ref2Validators = this.isANSEJ? [Validators.maxLength(5), Validators.required] : [Validators.maxLength(20)];
        const form = this.formBuilder.group({
            id: [b.id],
            reference: [b.reference, [Validators.minLength(this.minLength),  Validators.required]],
            reference2: [b.reference2 || this.maxReference, ref2Validators],
            description: [b.description, Validators.required],
            acquisitionDate: [b.acquisitionDate || today, Validators.required],
            serviceDate: [b.serviceDate || today, Validators.required],
            acquisitionValue: [b.acquisitionValue || 0, Validators.required],
            historicValue: [b.historicValue || 0, Validators.required],
            depreciationRate: [b.depreciationRate || 0, Validators.required],
            residualValue: [b.residualValue || 0, Validators.required],
            vat: [b.vat || 0, Validators.required],
            invoiceNumber: [b.invoiceNumber],
            itemCount: [b.itemCount || 1],
            info: [b.info],
            depreciationType: [b.depreciationType || 1],
            supplier: [b.supplier],
            originalSupplier: [b.originalSupplier],
            barcode: [b.barcode],
            dateOut: [b.dateOut],
            customer: [b.customer],
            serial_no: [b.serial_no],
            location: [b.location],
            centerId: [b.centerId || this.loginSrv.appCtx.center],
            accountno: [b.accountno || '21'],
            accountId: [b.accountId, Validators.required],
            costCenter: [b.costCenter],
            investEnd: [b.investEnd],
            receptionNumber: [b.receptionNumber],
            receptionDate: [b.receptionDate],
            positionNumb: [b.positionNumb],
            modelNumb: [b.modelNumb],
            installation_code: [b.installation_code],
            tech_specific: [b.tech_specific],
            comment: [b.comment],
            order_numb: [b.order_numb],
            order_date: [b.order_date],
            office: [b.office],
            sales_price: [b.sales_price],
            useful_life: [b.useful_life || 5, Validators.required],
            investment_type: [b.investment_type],
            old_depreciation: [b.old_depreciation || 0, Validators.required],
            outof_service: [b.outof_service || false, Validators.required],
            criticity: [b.criticity],
            startYear: [b.startYear || 0],
            assetClass: [b.assetClass],
        });
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
                .getMaxReference()
                .subscribe(res => {
                    this.maxReference = res.reference;
                    form.controls['reference2'].setValue(this.maxReference);
                    form.controls['reference'].setValue(this.maxReference);
                })
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
        return this.isParamSrv
            .is('ANSEJ')
            .pipe(tap(res => this.isANSEJ = res),
                  switchMap(_ => this.endSrv.getList(0, 50)),
                  tap(res => this.assetEnds = res.body));
    }

    override ngOnInit() {
        super.ngOnInit();
        this.shellSrv.addButton(this.importBtn);
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
                asset.id = 0;
                asset.reference2         =  this.form.controls['reference2'].value;
                asset.centerId           =  this.loginSrv.appCtx.center;
                asset.accountno          =  asset.accountno        || null;
                asset.description        =  asset.description      || null;
                asset.info               =  asset.info             || null;
                asset.acquisitionDate    =  asset.acquisitionDate  || null;
                asset.serviceDate        =  asset.serviceDate      || null;
                asset.invoiceNumber      =  asset.invoiceNumber    || null;
                asset.itemCount          =  asset.itemCount        || null;
                asset.acquisitionValue   =  asset.acquisitionValue || null;
                asset.historicValue      =  asset.historicValue    || null;
                asset.depreciationRate   =  asset.depreciationRate || null;
                asset.depreciationType   =  asset.depreciationType || null;
                asset.residualValue      =  asset.residualValue    || null;
                asset.supplier           =  asset.supplier         || null;
                asset.originalSupplier   =  asset.originalSupplier || null;
                asset.barcode            =  asset.barcode          || null;
                asset.receptionNumber    =  asset.receptionNumber  || null;
                asset.dateOut            =  null;
                asset.customer           =  null;
                asset.serial_no          =  asset.serial_no        || null;
                asset.location           =  asset.location         || null;
                asset.costCenter         =  asset.costCenter       || null;
                asset.investEnd          =  null;
                asset.startYear          =  asset.startYear        || 0;
                asset.receptionDate      =  asset.receptionDate    || null;
                asset.positionNumb       =  asset.positionNumb     || null;
                asset.modelNumb          =  asset.modelNumb        || null;
                asset.installation_code  =  asset.installation_code|| null;
                asset.tech_specific      =  asset.tech_specific    || null;
                asset.comment            =  asset.comment          || null;
                asset.order_numb         =  asset.order_numb       || null;
                asset.order_date         =  asset.order_date       || null;
                asset.office             =  asset.office           || null;
                asset.sales_price        =  asset.sales_price      || null;
                asset.investment_type    =  asset.investment_type  || 1;
                asset.outof_service      =  !!asset.outof_service;
                asset.criticity          =  asset.criticity        || null;
                asset.accountId          =  asset.accountId        || null;

                this.form.setValue(asset, { onlySelf: false, emitEvent: true });
            }
        });
    }

}
