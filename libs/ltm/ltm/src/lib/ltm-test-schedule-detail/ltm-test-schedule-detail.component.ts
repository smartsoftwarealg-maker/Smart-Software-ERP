import { Component, inject } from '@angular/core';

import { FormBuilder, ReactiveFormsModule, UntypedFormGroup } from "@angular/forms";
import { LTMTestSchedule } from '@ltm/ltm-api';
import { CommonModule } from "@angular/common";
import { MaterialModule } from "@ss/common/api-common";
import { DatePickerComponent } from "@ss/common/ui-datepicker";
import { BaseChildEntityDetailComponent } from "@ss/common/ui-base-entity";
import { LtmTestScheduleService } from '@ltm/ltm-api';
import { TranslateDirective, TranslatePipe } from '@ss/common/ui-lang';

@Component({
    selector: 'ss-ltm-test-schedule-detail',
    templateUrl: './ltm-test-schedule-detail.component.html',
    styleUrls: ['../line-matter-detail/line-matter-detail.component.scss'],
    standalone: true,
    imports: [
        CommonModule,
        MaterialModule,
        ReactiveFormsModule,
        DatePickerComponent,
        TranslateDirective,
        TranslatePipe
    ]
})
export class LtmTestScheduleDetailComponent extends BaseChildEntityDetailComponent<LTMTestSchedule> {
    private fb = inject(FormBuilder);


    constructor(protected override entitySrv: LtmTestScheduleService) {
        super(entitySrv, 'LTMTestSchedule');
    }

    setupForm(e: LTMTestSchedule): UntypedFormGroup {
        return this.fb.group({
            id:        [e.id],
            parentId:  [e.parentId || this.entitySrv.getParentId()],
            dueDay:    [e.dueDay],
            testDate:  [e.testDate],
            startDate: [e.startDate],
        });
    }
}
