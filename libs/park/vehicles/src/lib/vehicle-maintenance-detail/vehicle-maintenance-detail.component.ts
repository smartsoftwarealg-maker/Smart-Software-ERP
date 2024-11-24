import { Component, inject } from "@angular/core";
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@ss/common/api-common';
import { CommonUiLangModule } from '@ss/common/ui-lang';
import { UiPaginationModule } from '@ss/common/ui-pagination';
import { CommonUiConfirmationDialogModule } from '@ss/common/ui-confirmation-dialog';
import { CommonUiDatepickerModule } from '@ss/common/ui-datepicker';
import { RouterModule } from '@angular/router';
import { CommonUiAutoCompleteModule, DefaultAutoCompleteModel } from "@ss/common/ui-auto-complete";

import { BaseChildEntityDetailComponent } from "@ss/common/ui-base-entity";
import { VehicleMaintenance } from "../vehicle-api";
import { FormBuilder, UntypedFormGroup, Validators } from "@angular/forms";
import { VehicleMaintenanceService } from "../services/vehicle-maintenance.service";
import { Agent, SupplierService } from "@ss/logistics/api-agent";

@Component({
    selector: 'ss-vehicle-maintenance-detail',
    standalone: true,
    imports: [
        CommonModule,
        MaterialModule,
        CommonUiLangModule,
        UiPaginationModule,
        CommonUiConfirmationDialogModule,
        CommonUiDatepickerModule,
        RouterModule,
        CommonUiAutoCompleteModule,
        CommonUiDatepickerModule
    ],
    templateUrl: './vehicle-maintenance-detail.component.html',
    styleUrls: ['./vehicle-maintenance-detail.component.css']
})
export class VehicleMaintenanceDetailComponent extends BaseChildEntityDetailComponent<VehicleMaintenance> {
    private supplierSrv = inject(SupplierService);
    private fb = inject(FormBuilder);

    supplierLookup =  new DefaultAutoCompleteModel<Agent>(this.supplierSrv, 'id', 'denomination');

    constructor(protected override entitySrv: VehicleMaintenanceService) {
        super(entitySrv, 'VehicleMaintenance');
    }

    setupForm(e: VehicleMaintenance): UntypedFormGroup {
        return this.fb.group( {
            id:          [e.id],
            parentId:    [e.parentId || this.entitySrv.getParentId()],
            date:        [e.date, Validators.required],
            supplier:    [e.supplier],
            price:       [e.price],
            invoiceNo:   [e.invoiceNo],
            description: [e.description],
        });
    }
}
