import { Component, inject } from '@angular/core';
import {BaseEntityDetailComponent} from '@ss/common/ui-base-entity';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import { ActivatedRoute, RouterOutlet } from "@angular/router";
import { ReactiveFormsModule, UntypedFormBuilder, Validators } from "@angular/forms";
import {  ConfirmationDialogService } from "@ss/common/ui-confirmation-dialog";
import { DefaultAutoCompleteModel, UiAutoCompleteComponent } from '@ss/common/ui-auto-complete';

import { MaterialModule } from "@ss/common/api-common";
import { LtmPickupPointService } from '@ltm/ltm-api';
import { LTMPickupPoint } from '@ltm/ltm-api';
import { LtmEquipmentService } from '@ltm/ltm-api';
import { TranslateDirective } from '@ss/common/ui-lang';

@Component({
    selector: 'ss-ltm-product-detail',
    templateUrl: './ltm-pickup-point-detail.component.html',
    styleUrls: ['./ltm-pickup-point-detail.component.scss'],
    standalone: true,
    imports: [
    MaterialModule,
    TranslateDirective,
    ReactiveFormsModule,
    UiAutoCompleteComponent
]
})
export class LtmPickupPointDetailComponent extends BaseEntityDetailComponent<LTMPickupPoint> {
    private equipmentSrv = inject(LtmEquipmentService);

    equipmentLookup = new DefaultAutoCompleteModel(this.equipmentSrv);

    constructor(
        public override entitySrv: LtmPickupPointService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override formBuilder: UntypedFormBuilder,
        public override confirmationSrv: ConfirmationDialogService) {
        super(entitySrv, shellSrv, snackBarSrv, route, formBuilder, confirmationSrv, 'LTM_PICKUP_POINTS');
    }

    public override setupForm(b: LTMPickupPoint) {
        return this.formBuilder.group({
            id:            [b.id],
            description:   [b.description, Validators.required],
            descriptionAr: [b.descriptionAr],
            equipmentId:   [b.equipmentId],
            bleacherId:    [b.bleacherId],
            zoneId:        [b.zoneId],
        });
    }
}
