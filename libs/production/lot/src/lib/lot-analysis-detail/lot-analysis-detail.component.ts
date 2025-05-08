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
import { LotAutoCompleteModel } from '@ss/master-data/api-article';
import { Agent, SupplierService } from '@ss/logistics/api-agent';

@Component({
    selector: 'ss-production-lot-analysis-detail',
    styleUrls: ['./lot-analysis-detail.component.scss'],
    templateUrl: './lot-analysis-detail.component.html',
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
export class LotAnalysisDetailComponent
    extends BaseEntityDetailComponent<Lot>
    implements OnInit
{
    private lotSrv = inject(LotsService);
    private supplierSrv = inject(SupplierService);

    supplierLookup = new DefaultAutoCompleteModel<Agent>(this.supplierSrv, 'id', 'denomination');
    storeLookup: LotAutoCompleteModel = new LotAutoCompleteModel(this.lotSrv);

    constructor(
        public articleSrv: LotsService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override formBuilder: UntypedFormBuilder,
        public override confirmationSrv: ConfirmationDialogService,
        public lookupsSrv: LookupsService,
        public httpSrv: HttpService,
        public router: Router,
    ) {
        super(
            articleSrv,
            shellSrv,
            snackBarSrv,
            route,
            formBuilder,
            confirmationSrv,
            'STOCK_ANALYSE_LOT',
        );
    }

    public override setupForm(l: Lot) {
        // Make sure to update the template if you edit the configuration here
        return this.formBuilder.group({
            id: [l.id],
            storeId: [{ value: l.storeId,  disabled: true } ],
            supplier: [{ value: l.supplier,  disabled: true }],
            description: [{ value: l.description,  disabled: true }],
            lotState: [{ value: l.lotState,  disabled: true }],
            lotNumber: [{ value: l.lotNumber,  disabled: true }],
            creationDate: [{ value: l.creationDate,  disabled: true }],
            expires: [{ value: l.expires,  disabled: true }],
            expirationDate: [{ value: l.expirationDate,  disabled: true }],
            memo: [l.memo, Validators.required],
            analyzed: [l.analyzed],
            analysisDate: [l.analysisDate, Validators.required],
        });
    }
}
