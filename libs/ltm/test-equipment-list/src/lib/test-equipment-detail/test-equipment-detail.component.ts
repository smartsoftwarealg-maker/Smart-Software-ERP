import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseEntityDetailComponent } from '@ss/common/ui-base-entity';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { LoginService, MaterialModule } from '@ss/common/api-common';
import { ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatCard } from '@angular/material/card';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { LtmEquipmentTestService } from '../services/ltm-equipment-test.service';
import { Observable } from 'rxjs';
import { LtmTestingEquipmentService } from '../services/ltm-testing-equipment.service';
import { LTMTestingEquipment } from '@ltm/ltm-api';

@Component({
    selector: 'ss-test-equipment-detail',
    standalone: true,
    imports: [CommonModule, MatCard, MatFormField, MatInput, MatLabel, MaterialModule, ReactiveFormsModule, RouterOutlet],
    templateUrl: './test-equipment-detail.component.html',
    styleUrl: './test-equipment-detail.component.scss'
})
export class TestEquipmentDetailComponent extends BaseEntityDetailComponent<LTMTestingEquipment> {
    #loginSrv = inject(LoginService);
    #equipmentTestSrv = inject(LtmEquipmentTestService);

    constructor(
        public override entitySrv: LtmTestingEquipmentService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override formBuilder: UntypedFormBuilder,
        public override confirmationSrv: ConfirmationDialogService) {
        super(entitySrv, shellSrv, snackBarSrv, route, formBuilder, confirmationSrv, 'LTM_TEST_EQUIPMENT');
    }

    public override setupForm(b: LTMTestingEquipment): UntypedFormGroup {
        return this.formBuilder.group({
            id:            [b.id],
            description:   [b.description, Validators.required],
            centerId:      [b.centerId || this.#loginSrv.appCtx.center],
        });
    }

    override loadEntity(id: number): Observable<LTMTestingEquipment> {
        this.#equipmentTestSrv.setParentId(id);
        return super.loadEntity(id);
    }
}
