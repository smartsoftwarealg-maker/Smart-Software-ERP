import { Component, inject } from '@angular/core';
import { BaseChildEntityDetailComponent } from '@ss/common/ui-base-entity';
import { Punishment, PUNISHMENTS_NATURE } from '../punishment-api';
import { FormBuilder, UntypedFormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProfessionalFaultService, PunishmentTypeService } from '@ss/payroll/api-employee';
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
import { ActivePersonnelService } from '../../active-personnel.service';
import { Lookup } from '@ss/common/api-lookup';

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
    private activePersonnelSrv = inject(ActivePersonnelService);

    faultAutoCompleteModel = new DefaultAutoCompleteModel(this.faultSrv);
    punishmentTypeAutoCompleteModel = new DefaultAutoCompleteModel(this.punishTypeSrv);

    protected readonly NATURE = PUNISHMENTS_NATURE;
    readonly MONTHS: Lookup[] = [
        { id: 1, description: 'JANUARY' },
        { id: 2, description: 'FEBRUARY' },
        { id: 3, description: 'MARCH' },
        { id: 4, description: 'APRIL' },
        { id: 5, description: 'MAY' },
        { id: 6, description: 'JUNE' },
        { id: 7, description: 'JULY' },
        { id: 8, description: 'AUGUST' },
        { id: 9, description: 'SEPTEMBER' },
        { id: 10, description: 'OCTOBER' },
        { id: 11, description: 'NOVEMBER' },
        { id: 12, description: 'DECEMBER' }
    ]
    constructor(protected detailSrv: PunishmentService) {
        super(detailSrv, 'Punishment');
    }

    override ngOnInit() {
        super.ngOnInit();
        this.isEditable = this.activePersonnelSrv.val;
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
            nature:         [a.nature],
            paymonthY:     [Math.floor(a.paymonth / 100), Validators.required],
            paymonthM:     [(a.paymonth % 100)||1, Validators.required],
        });
    }

    public override readForm(): Punishment {
        const formVal = this.form.value;
        const val: Punishment = formVal;
        val.paymonth = (+formVal.paymonthY) * 100 + (+formVal.paymonthM);
        delete formVal.paymonthY;
        delete formVal.paymonthM;
        return val;
    }
}
