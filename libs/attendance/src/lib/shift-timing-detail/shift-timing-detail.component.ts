import { Component, inject } from "@angular/core";
import { FormBuilder, Validators, FormsModule, ReactiveFormsModule, UntypedFormGroup } from '@angular/forms';
import { ShiftTimingService } from '../shift-timing.service';
import { Timing } from '../attendance-api';
import { MatCard, MatCardHeader, MatCardContent } from '@angular/material/card';
import { MatMiniFabButton } from '@angular/material/button';
import { MatTooltip } from '@angular/material/tooltip';
import { MatFormField, MatLabel, MatError } from '@angular/material/form-field';
import { DatePickerComponent } from '@ss/common/ui-datepicker';
import { TranslatePipe, TranslateDirective } from '@ss/common/ui-lang';
import {
    dateTimeToStr,
    isString,
    MaterialModule,
    strToDateTime
} from '@ss/common/api-common';
import { BaseChildEntityDetailComponent } from '@ss/common/ui-base-entity';

@Component({
    selector: 'ss-shift-timing-detail',
    templateUrl: './shift-timing-detail.component.html',
    styleUrls: ['./shift-timing-detail.component.scss'],
    standalone: true,
    imports: [
        MatCard,
        MaterialModule,
        MatCardHeader,
        MatMiniFabButton,
        MatTooltip,
        TranslateDirective,
        MatCardContent,
        FormsModule,
        ReactiveFormsModule,
        MatFormField,
        MatLabel,
        DatePickerComponent,
        MatError,
        TranslatePipe
    ]
})
export class ShiftTimingDetailComponent extends BaseChildEntityDetailComponent<Timing> {

    private fb = inject(FormBuilder);

    constructor(protected override entitySrv: ShiftTimingService) {
        super(entitySrv, 'LTMTestSchedule');
        this.EMPTY_RECORD = {
            id:        0,
            parentId:  this.entitySrv.getParentId(),
            from:      '08:00',
            to:        '16:00',
            breakFrom: null,
            breakTo:   null
        }
    }

    override setupForm(e: Timing): UntypedFormGroup {
        const form = this.fb.group({
            id:        [e.id],
            parentId:  [e.parentId||this.entitySrv.getParentId(), Validators.required],
            from:      [this.toDate(e.from),                 Validators.required],
            to:        [this.toDate(e.to),                   Validators.required],
            breakFrom: [this.toDate(e.breakFrom)],
            breakTo:   [this.toDate(e.breakTo)],
            date:      [e.date]
        });
        if (e.id === 0) {
            this.entitySrv
                .getList(0, 1, null, '-id')
                .subscribe(res => {
                    if (res.itemCount > 0) {
                        const tmg = res.body[0];
                        tmg.id = 0;
                        form.controls.from.setValue(tmg.from as unknown as string);
                        form.controls.to.setValue(tmg.to as unknown as string);
                        form.controls.breakFrom.setValue(tmg.breakFrom as unknown as string);
                        form.controls.breakTo.setValue(tmg.breakTo as unknown as string);
                    }
                });
        }
        return form;
    }

    private toDate(val: string | Date) {
        if (val == null) {
            return null;
        }
        let date: Date;
        if (isString(val)) {
            date = strToDateTime(val as string);
        } else {
            date = val as Date;
        }
        return dateTimeToStr(date);
    }

    override readForm(): Timing {
        const value = super.readForm();
        value.from = this.toDate(value.from);
        value.to = this.toDate(value.to);
        value.breakFrom = this.toDate(value.breakFrom);
        value.breakTo = this.toDate(value.breakTo);
        value.date = value.date || dateTimeToStr(new Date());
        return value;
    }

}
