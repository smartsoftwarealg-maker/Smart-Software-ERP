import { Component, inject, OnInit } from '@angular/core';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { LookupsService, Lot, LotsService, StoreService } from '@ss/common/api-lookup';
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
import { Location, LocationService } from '@ss/master-data/api-article';

@Component({
    selector: 'ss-production-priority-detail',
    styleUrls: ['./lot-priority-detail.component.scss'],
    templateUrl: './lot-priority-detail.component.html',
    standalone: true,
    imports: [
        CommonModule,
        MaterialModule,
        RouterModule,
        TranslateDirective,

    ],
})
export class LotPriorityDetailComponent extends BaseEntityDetailComponent<Location>
    implements OnInit {
    private storeSrv = inject(StoreService);
    private supplierSrv = inject(SupplierService);

    supplierLookup = new DefaultAutoCompleteModel<Agent>(this.supplierSrv, 'id', 'denomination');
    storeLookup = new DefaultAutoCompleteModel(this.storeSrv);

    constructor(
        public articleSrv: LocationService,
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
            'PROD_LOT_PRIORITY',
        );
    }

    public override setupForm(l: Location) {
        // Make sure to update the template if you edit the configuration here
        return this.formBuilder.group({
            id:           [l.id],
            storeId:      [l.storeId, Validators.required],
            reference:    [l.reference, Validators.required],
            referenceId:  [l.referenceId, Validators.required],
            storeName:    [{ value: l.storeName,  disabled: true } ],
            lotNumber:    [{ value: l.lotNumber,  disabled: true } ],
            description:  [{ value: l.description,  disabled: true }],
            blockedLot:   [{ value: l.blockedLot,  disabled: true }],
            analysisDate: [{ value: l.analysisDate, disabled: true }],
            stock:        [{ value: l.stock, disabled: true }],
            pp:           [{ value: l.pp, disabled: true }],
            price1:       [{ value: l.price1, disabled: true }],
            price2:       [{ value: l.price2, disabled: true }],
            price3:       [{ value: l.price3, disabled: true }],
            price4:       [{ value: l.price4, disabled: true }],
            price5:       [{ value: l.price5, disabled: true }],
            inventPMP:    [{ value: l.inventPMP, disabled: true }],
            inventStock:  [{ value: l.inventStock, disabled: true }],
            theoStock:    [{ value: l.theoStock, disabled: true }],
            priority:     [l.priority]
        });
    }
}
