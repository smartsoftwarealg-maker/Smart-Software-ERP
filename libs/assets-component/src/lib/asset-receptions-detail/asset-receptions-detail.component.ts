import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ABS_ASSET_RECEPTIONS_URL} from '../../../../../apps/erp/src/app/common';
import {AssetsService} from '../assets.service';
import {switchMap, tap} from 'rxjs/operators';
import {Asset, AssetReception} from '../assets-api';
import {UntypedFormBuilder, FormGroup, Validators} from '@angular/forms';
import {BaseEntityDetailComponent} from '@ss/common/ui-base-entity';
import {AssetReceptionService} from '../asset-reception.service';
import {Bank, BankService} from '@ss/administration/api-bank';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {LookupsService} from '@ss/common/api-lookup';
import {LoginService} from '@ss/common/api-common';
import {SupplierService} from '@ss/logistics/api-agent';
import {DefaultAutoCompleteModel} from '@ss/common/ui-auto-complete';

@Component({
    selector: 'ss-asset-receptions-detail',
    templateUrl: './asset-receptions-detail.component.html',
    styleUrls: ['./asset-receptions-detail.component.scss']
})
export class AssetReceptionsDetailComponent extends BaseEntityDetailComponent<AssetReception> {
    supplierAutoCompleteModel = new DefaultAutoCompleteModel(this.supplierSrv, 'id', 'denomination');
    origSupplierLookup = new DefaultAutoCompleteModel(this.supplierSrv, 'id', 'denomination');

    constructor(
        public override entitySrv: AssetReceptionService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override formBuilder: UntypedFormBuilder,
        public override confirmationSrv: ConfirmationDialogService,
        public lookupsSrv: LookupsService,
        private supplierSrv: SupplierService,
        private loginSrv: LoginService) {
        super(entitySrv, shellSrv, snackBarSrv, route, formBuilder, confirmationSrv, 'ADMINISTRATION_EDIT_BANK');
    }


    public setupForm(b: AssetReception) {
        // Make sure to update the template if you edit the configuration here

        return this.formBuilder.group({
            id:             [b.id],
            centerId:       [b.centerId || this.loginSrv.appCtx.center],
            serialNumber:   [{ value: b.serialNumber || 1, disabled: true }],
            receptionDate:  [b.receptionDate, Validators.required],
            supplier:       [b.supplier, Validators.required],
            origSupplier:   [b.origSupplier],
            requestNumber:  [b.requestNumber],
            orderNumber:    [b.orderNumber],
            deliveryNumber: [b.deliveryNumber],
            invoiceNumber:  [b.invoiceNumber],
            requestDate:    [b.requestDate ],
            orderDate:      [b.orderDate],
            deliveryDate:   [b.deliveryDate],
            invoiceDate:    [b.invoiceDate],
        });
    }

    override readForm(): AssetReception {
        const value =  super.readForm();
        value.serialNumber = 0;
        return value;
    }

    // ngOnInit(): void {
    //     this.shellSrv.setGoBackFn(() => this.router.navigate([ABS_ASSET_RECEPTIONS_URL]).then());
    //     this.route
    //         .paramMap
    //         .pipe(tap(params => this.id = +(params.get("id") || '0')),
    //             switchMap(_ => this.assetSrv.get(this.id)),
    //             tap(res => console.log(res)))
    //         .subscribe(ent => this.form = this.formBuilder.group({
    //                 id: [{value: ent.id, disabled: true}],
    //                 invoiceNumber: [{value: ent.invoiceNumber, disabled: true}],
    //                 acquisitionDate: [{value: ent.acquisitionDate, disabled: true}],
    //                 supplierName: [{value: ent.supplierName, disabled: true}]
    //             }
    //         ));
    // }
}
