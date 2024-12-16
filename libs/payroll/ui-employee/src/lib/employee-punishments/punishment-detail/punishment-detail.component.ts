import { Component, inject } from '@angular/core';
import { BaseChildEntityDetailComponent } from '@ss/common/ui-base-entity';
import {Punishment} from '../punishment-api';
import { FormBuilder, UntypedFormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
    ProfessionalFaultService,
    PunishmentTypeService
} from '@ss/payroll/api-employee';
import {PunishmentService} from '../punishment.service';
import {DefaultAutoCompleteModel} from '@ss/common/ui-auto-complete';
import { NgIf } from '@angular/common';
import { MatMiniFabButton } from '@angular/material/button';
import { MatCard } from '@angular/material/card';
import { MatFormField, MatLabel, MatError } from '@angular/material/form-field';
import { TranslateDirective } from '@ss/common/ui-lang';
import { MatInput } from '@angular/material/input';
import { DatePickerComponent } from '@ss/common/ui-datepicker';
import { UiAutoCompleteComponent } from '@ss/common/ui-auto-complete';
import { MaterialModule } from '@ss/common/api-common';

@Component({
    selector: 'ss-punishment-detail',
    templateUrl: './punishment-detail.component.html',
    styleUrls: ['./punishment-detail.component.scss'],
    standalone: true,
    imports: [NgIf, MaterialModule, MatMiniFabButton, MatCard, FormsModule, ReactiveFormsModule, MatFormField, MatLabel, TranslateDirective, MatInput, MatError, DatePickerComponent, UiAutoCompleteComponent]
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
            date:           [a.date||new Date()],
            punishmentType: [a.punishmentType, Validators.required],
            fault:          [a.fault, Validators.required],
            faultType:      [a.faultType, Validators.required],
            sanction:       [a.sanction, Validators.required],
            memo:           [a.memo],
            dayCount:       [a.dayCount],
        });
    }
}
