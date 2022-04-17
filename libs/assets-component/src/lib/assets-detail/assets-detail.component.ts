import { Component, OnInit } from '@angular/core';
import {BaseEntityDetailComponent} from '@ss/common/ui-base-entity';
import {Asset, Depreciation} from '../assets-api';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {LookupsService} from '@ss/common/api-lookup';
import {AssetsService} from '../assets.service';
import {LoginService} from '@ss/common/api-common';
import {DefaultAutoCompleteModel} from '@ss/common/ui-auto-complete';
import {CustomerService, SupplierService} from '@ss/logistics/api-agent';
import {MatExpansionPanel} from '@angular/material/expansion';
import {AccountAutocompleteModel, AccountService} from '@ss/accounting/api-accounts';

@Component({
    selector: 'ss-assets-detail',
    templateUrl: './assets-detail.component.html',
    styleUrls: ['./assets-detail.component.scss']
})
export class AssetsDetailComponent extends BaseEntityDetailComponent<Asset> {
    private maxReference: string = null;
    supplierAutoCompleteModel = new DefaultAutoCompleteModel(this.supplierSrv, 'id', 'denomination');
    accountAutoCompleteModel = new AccountAutocompleteModel(this.accountSrv);
    originalSupplierAutoCompleteModel = new DefaultAutoCompleteModel(this.supplierSrv, 'id', 'denomination');
    customerAutoCompleteModel = new DefaultAutoCompleteModel(this.customerSrv, 'id', 'denomination');
    accountantDepreciation: Depreciation[] = [];
    fiscalDepreciation: Depreciation[] = [];
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
        private accountSrv: AccountService,
        private loginSrv: LoginService) {
        super(detailSrv,
            shellSrv,
            snackBarSrv,
            route,
            formBuilder,
            confirmationSrv, 'ASSETS');
    }

    setupForm(b: Asset): FormGroup {
        const today = new Date();
        const form = this.formBuilder.group({
            id: [b.id],
            reference: [b.reference, [Validators.minLength(11), Validators.maxLength(11), Validators.required]],
            reference2: [b.reference2 || this.maxReference, [Validators.maxLength(5), Validators.required ]],
            description: [b.description, Validators.required],
            acquisitionDate: [b.acquisitionDate || today, Validators.required],
            serviceDate: [b.serviceDate || today, Validators.required],
            acquisitionValue: [b.acquisitionValue || 0, Validators.required],
            historicValue: [b.historicValue, Validators.required],
            depreciationRate: [b.depreciationRate || 0, Validators.required],
            residualValue: [b.residualValue || 0, Validators.required],
            vat: [b.historicValue || 0, Validators.required],
            invoiceNumber: [b.invoiceNumber],
            itemCount: [b.itemCount || 1],
            info: [b.info],
            supplier: [b.supplier],
            originalSupplier: [b.originalSupplier],
            barcode: [b.barcode],
            dateOut: [b.dateOut],
            customer: [b.customer],
            serial_no: [b.serial_no],
            location: [b.location],
            centerId: [b.centerId || this.loginSrv.appCtx.center],
            accountno: [b.accountno],
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
            startYear: [b.startYear || 0, Validators.required],
        });
        if (b.id) {
            this.maxReference = b.reference2;
            this.detailSrv
                .getDepreciation(b.id)
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
}
