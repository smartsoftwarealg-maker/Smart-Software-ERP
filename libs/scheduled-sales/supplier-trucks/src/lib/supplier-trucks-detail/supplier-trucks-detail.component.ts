import { Component, inject } from '@angular/core';
import {BaseEntityDetailComponent} from '@ss/common/ui-base-entity';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute} from '@angular/router';
import { UntypedFormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {LookupsService} from '@ss/common/api-lookup';
import {SupplierTruck, SupplierTruckService} from '@ss/scheduled-sales/api-scheduled-sales';
import {DefaultAutoCompleteModel} from '@ss/common/ui-auto-complete';
import {SupplierService} from '@ss/logistics/api-agent';
import { MatCard, MatCardContent } from '@angular/material/card';

import { MatFormField, MatLabel, MatError } from '@angular/material/form-field';
import { TranslateDirective } from '@ss/common/ui-lang';
import { UiAutoCompleteComponent } from '@ss/common/ui-auto-complete';
import { MatInput } from '@angular/material/input';

@Component({
    selector: 'ss-supplier-trucks-detail',
    templateUrl: './supplier-trucks-detail.component.html',
    styleUrls: ['./supplier-trucks-detail.component.scss'],
    standalone: true,
    imports: [
    MatCard,
    MatCardContent,
    FormsModule,
    ReactiveFormsModule,
    MatFormField,
    MatLabel,
    TranslateDirective,
    UiAutoCompleteComponent,
    MatError,
    MatInput
],
})
export class SupplierTrucksDetailComponent extends BaseEntityDetailComponent<SupplierTruck> {
    private supplierSrv = inject(SupplierService);
    customerLookupModel = new DefaultAutoCompleteModel(this.supplierSrv, 'id', 'denomination');

    constructor(
        public override entitySrv: SupplierTruckService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override formBuilder: UntypedFormBuilder,
        public override confirmationSrv: ConfirmationDialogService,
        public lookupsSrv: LookupsService) {
        super(entitySrv, shellSrv, snackBarSrv, route, formBuilder, confirmationSrv, 'SCH_SUPPLIER_TRUCKS');
    }


    public override setupForm(b: SupplierTruck) {
        // Make sure to update the template if you edit the configuration here
        return this.formBuilder.group({
            id:          [b.id],
            supplier:    [b.supplier, Validators.required],
            plateNumber: [b.plateNumber, Validators.required],
        });
    }
}
