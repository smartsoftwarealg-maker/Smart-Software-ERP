import { Component, inject } from '@angular/core';
import { CommonUiAutoCompleteModule, DefaultAutoCompleteModel } from "@ss/common/ui-auto-complete";
import { FormBuilder, ReactiveFormsModule, UntypedFormGroup } from "@angular/forms";
import { RouterOutlet } from "@angular/router";
import { CommonUiConfirmationDialogModule } from "@ss/common/ui-confirmation-dialog";
import { LTMMixtureDetail, LTMTestSchedule } from '../../../../ltm-api/src/lib/ltm-api';
import { CommonModule } from "@angular/common";
import { MaterialModule } from "@ss/common/api-common";
import { CommonUiLangModule } from "@ss/common/ui-lang";
import { UiPaginationModule } from "@ss/common/ui-pagination";
import { CommonUiDatepickerModule } from "@ss/common/ui-datepicker";
import { CommonUiHourPickerModule } from "@ss/common/ui-hour-picker";
import { BaseChildEntityDetailComponent } from "@ss/common/ui-base-entity";
import { LtmTestScheduleService } from '@ltm/ltm-api';

@Component({
    selector: 'ss-ltm-test-schedule-detail',
    templateUrl: './ltm-test-schedule-detail.component.html',
    styleUrls: ['../line-matter-detail/line-matter-detail.component.scss'],
    standalone: true,
    imports: [
        CommonModule,
        MaterialModule,
        CommonUiLangModule,
        UiPaginationModule,
        ReactiveFormsModule,
        CommonUiConfirmationDialogModule,


        CommonUiAutoCompleteModule,
        CommonUiDatepickerModule,
        RouterOutlet,
        CommonUiHourPickerModule
    ],
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
