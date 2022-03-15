import { Component, OnInit } from '@angular/core';
import {BaseEntityDetailComponent} from '@ss/common/ui-base-entity';
import {Asset} from '../assets-api';
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

@Component({
    selector: 'ss-assets-detail',
    templateUrl: './assets-detail.component.html',
    styleUrls: ['./assets-detail.component.scss']
})
export class AssetsDetailComponent extends BaseEntityDetailComponent<Asset>{
    supplierAutoCompleteModel = new DefaultAutoCompleteModel(this.supplierSrv, 'id', 'denomination');
    originalSupplierAutoCompleteModel = new DefaultAutoCompleteModel(this.supplierSrv, 'id', 'denomination');
    customerAutoCompleteModel = new DefaultAutoCompleteModel(this.customerSrv, 'id', 'denomination');

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
        private loginSrv: LoginService) {
        super(detailSrv,
            shellSrv,
            snackBarSrv,
            route,
            formBuilder,
            confirmationSrv, 'ADMINISTRATION_EDIT_BANK');
    }

    setupForm(b: Asset): FormGroup {
        return this.formBuilder.group({
            id: [b.id],
            reference: [b.reference, [Validators.maxLength(15), Validators.required]],
            reference2: [b.reference2, Validators.maxLength(15)],
            description: [b.description, Validators.required],
            acquisitionDate: [b.acquisitionDate, Validators.required],
            serviceDate: [b.serviceDate, Validators.required],
            acquisitionValue: [b.acquisitionValue, Validators.required],
            historicValue: [b.historicValue, Validators.required],
            depreciationRate: [b.depreciationRate, Validators.required],
            residualValue: [b.residualValue || 0, Validators.required],
            vat: [b.historicValue || 0, Validators.required],
            invoiceNumber: [b.serviceDate],
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
            useful_life: [b.useful_life],
            investment_type: [b.investment_type],
            old_depreciation: [b.old_depreciation || 0],
            outof_service: [b.outof_service],
            criticity: [b.criticity],
            startYear: [b.startYear || 0],
        });
    }

    public getPanelHeaderClass(section: string, panel: MatExpansionPanel): string {
        // if expanded return primary background class
        if (panel.expanded)
            return 'b-primary-expansion-panel';
        else
            return '';
    }

}
