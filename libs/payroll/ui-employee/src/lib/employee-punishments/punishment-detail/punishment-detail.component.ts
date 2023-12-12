import { Component, inject } from '@angular/core';
import { BaseChildEntityDetailComponent } from '@ss/common/ui-base-entity';
import {Punishment} from '../punishment-api';
import { FormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import {LoginService} from '@ss/common/api-common';
import {
    ProfessionalFaultService,
    PunishmentTypeService
} from '@ss/payroll/api-employee';
import {PunishmentService} from '../punishment.service';
import {DefaultAutoCompleteModel} from '@ss/common/ui-auto-complete';

@Component({
    selector: 'ss-punishment-detail',
    templateUrl: './punishment-detail.component.html',
    styleUrls: ['./punishment-detail.component.scss']
})
export class PunishmentDetailComponent extends BaseChildEntityDetailComponent<Punishment> {
    private formBuilder = inject(FormBuilder);
    private faultSrv =  inject(ProfessionalFaultService);
    private punishTypeSrv =  inject(PunishmentTypeService);

    faultAutoCompleteModel = new DefaultAutoCompleteModel(this.faultSrv);
    punishmentTypeAutoCompleteModel = new DefaultAutoCompleteModel(this.punishTypeSrv);

    constructor(protected detailSrv: PunishmentService) {
        super(detailSrv, 'Punishment');
    }

    override setupForm(a: Punishment): UntypedFormGroup {
        return this.form = this.formBuilder.group({
            id:             [a.id],
            parentId:       [a.parentId || this.detailSrv.getParentId()],
            centerId:       [this.loginSrv.appCtx.center],
            number:         [a.number],
            date:           [a.date],
            punishmentType: [a.punishmentType, Validators.required],
            fault:          [a.fault, Validators.required],
            faultType:      [a.faultType, Validators.required],
            sanction:       [a.sanction, Validators.required],
            memo:           [a.memo],
        });
    }
}
