import { Component, inject, OnInit } from '@angular/core';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { LookupsService, Lot, LotsService } from '@ss/common/api-lookup';
import { BaseEntityDetailComponent } from '@ss/common/ui-base-entity';
import { ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import {
    DefaultAutoCompleteModel,
    UiAutoCompleteComponent,
} from '@ss/common/ui-auto-complete';
import { HttpService, MaterialModule } from '@ss/common/api-common';
import { CommonModule } from '@angular/common';
import { TranslateDirective } from '@ss/common/ui-lang';
import { DatePickerComponent } from '@ss/common/ui-datepicker';
import { Agent, SupplierService } from '@ss/logistics/api-agent';
import { StoresService } from '@ss/stock/api-article-store';

@Component({
    selector: 'ss-production-lot-management-detail',
    styleUrls: ['./lot-management-detail.component.scss'],
    templateUrl: './lot-management-detail.component.html',
    standalone: true,
    imports: [
        CommonModule,
        MaterialModule,
        RouterModule,
        TranslateDirective,
        UiAutoCompleteComponent,
        DatePickerComponent,
    ],
})
export class LotManagementDetailComponent extends BaseEntityDetailComponent<Lot>
    implements OnInit {
    private storesSrv = inject(StoresService);
    private supplierSrv = inject(SupplierService);

    //supplierLookup = new DefaultAutoCompleteModel(this.supplierSrv);
    supplierLookup = new DefaultAutoCompleteModel<Agent>(this.supplierSrv, 'id', 'denomination');
    storeLookup = new DefaultAutoCompleteModel(this.storesSrv);

    constructor(
        public articleSrv: LotsService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override formBuilder: UntypedFormBuilder,
        public override confirmationSrv: ConfirmationDialogService,
        public lookupsSrv: LookupsService,
        public httpSrv: HttpService,
        public router: Router) {
        super(
            articleSrv,
            shellSrv,
            snackBarSrv,
            route,
            formBuilder,
            confirmationSrv,
            'STOCK_EDIT_LOT',
        );
    }

    public override setupForm(l: Lot) {
        // Make sure to update the template if you edit the configuration here
        return this.formBuilder.group({
            id: [l.id],
            storeId: [l.storeId, Validators.required],
            supplier: [l.supplier],
            description: [l.description],
            descriptionAr: [l.descriptionAr],
            lotState: [l.lotState],
            lotNumber: [l.lotNumber || '1', Validators.maxLength(14)],
            creationDate: [l.creationDate],
            expires: [l.expires||false, Validators.required],
            expirationDate: [l.expirationDate],
            team: [l.team || 0],
            center: [l.center || 0],
        });
    }


    override readForm(): Lot {
        const lot = this.form.getRawValue();
        lot.expires = lot.expirationDate !== null;
        lot.description = lot.lotNumber + '';
        return lot;
    }
}
