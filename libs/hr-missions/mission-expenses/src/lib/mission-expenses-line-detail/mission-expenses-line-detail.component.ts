import {
    UntypedFormGroup,
    FormBuilder,
    ReactiveFormsModule,
} from '@angular/forms';
import { BaseChildEntityDetailComponent } from '@ss/common/ui-base-entity';
import { Component, inject } from '@angular/core';
import { MissionJourney } from '../journey-api.class';
import { JourneyLineService } from '../journey.service';
import { DatePickerComponent } from '@ss/common/ui-datepicker';

import { TranslateDirective, TranslatePipe } from '@ss/common/ui-lang';
import { MaterialModule } from '@ss/common/api-common';

@Component({
    selector: 'ss-missions-expenses-line-detail',
    templateUrl: './mission-expenses-line-detail.component.html',
    styleUrls: ['./mission-expenses-line-detail.component.scss'],
    standalone: true,
    imports: [
    MaterialModule,
    ReactiveFormsModule,
    DatePickerComponent,
    TranslateDirective,
    TranslatePipe
],
})
export class MissionExpensesLineDetailComponent extends BaseChildEntityDetailComponent<MissionJourney> {
    private fb = inject(FormBuilder);

    constructor(protected override entitySrv: JourneyLineService) {
        super(entitySrv, 'MISSION_EXPENSES');
    }

    public override setupForm(b: MissionJourney): UntypedFormGroup {
        return this.fb.group({
            id: [b.id || 0],
            parentId: [b.parentId || this.entitySrv.getParentId()],
            fromDate: [b.fromDate || new Date()],
            toDate: [b.toDate || new Date()],
            exclMeal: [b.exclMeal || false],
            routeCount: [b.routeCount || 2],
        });
    }
}
