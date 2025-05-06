import { Component, inject } from '@angular/core';
import {
    FormBuilder,
    UntypedFormGroup,
    FormsModule,
    ReactiveFormsModule,
} from '@angular/forms';
import { BaseChildEntityDetailComponent } from '@ss/common/ui-base-entity';
import {
    Questioning,
    EmployeeQuestioningService, MotiveService
} from '@ss/payroll/api-employee';
import { MatMiniFabButton } from '@angular/material/button';
import { MatCard, MatCardContent } from '@angular/material/card';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { TranslateDirective } from '@ss/common/ui-lang';
import { MatInput } from '@angular/material/input';
import { DatePickerComponent } from '@ss/common/ui-datepicker';
import { MaterialModule } from '@ss/common/api-common';
import { ActivePersonnelService } from '../../active-personnel.service';
import { DefaultAutoCompleteModel, UiAutoCompleteComponent } from '@ss/common/ui-auto-complete';

@Component({
    selector: 'ss-emp-questioning-detail',
    templateUrl: './employee-questioning-detail.component.html',
    styleUrls: ['./employee-questioning-detail.component.scss'],
    standalone: true,
    imports: [
        MaterialModule,
        MatMiniFabButton,
        MatCard,
        MatCardContent,
        FormsModule,
        ReactiveFormsModule,
        MatFormField,
        MatLabel,
        TranslateDirective,
        MatInput,
        DatePickerComponent,
        UiAutoCompleteComponent,
    ],
})
export class EmployeeQuestioningDetailComponent extends BaseChildEntityDetailComponent<Questioning> {
    private formBuilder = inject(FormBuilder);
    private activePersonnelSrv = inject(ActivePersonnelService);
    private motiveSrv = inject(MotiveService);

    motiveAutoCompleteModel = new DefaultAutoCompleteModel(this.motiveSrv);

    constructor(protected employeeQuestioningSrv: EmployeeQuestioningService) {
        super(employeeQuestioningSrv, 'Questioning');
    }

    override ngOnInit() {
        super.ngOnInit();
        this.isEditable = this.activePersonnelSrv.val;
    }

    override setupForm(a: Questioning): UntypedFormGroup {
        return (this.form = this.formBuilder.group({
            id: [a.id],
            centerId: [a.centerId || this.loginSrv.appCtx.center],
            parentId: [a.parentId || this.employeeQuestioningSrv.getParentId()],
            reference: [a.reference],
            refDate: [a.refDate],
            motive: [a.motive],
            question: [a.question],
            answer: [a.answer],
        }));
    }
}
