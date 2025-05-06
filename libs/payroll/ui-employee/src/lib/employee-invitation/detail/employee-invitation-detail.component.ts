import { Component, inject } from '@angular/core';
import {
    FormBuilder,
    UntypedFormGroup,
    FormsModule,
    ReactiveFormsModule,
} from '@angular/forms';
import { BaseChildEntityDetailComponent } from '@ss/common/ui-base-entity';
import {
    Invitation,
    EmployeeInvitationService,
} from '@ss/payroll/api-employee';
import { MatMiniFabButton } from '@angular/material/button';
import { MatCard, MatCardContent } from '@angular/material/card';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { TranslateDirective } from '@ss/common/ui-lang';
import { MatInput } from '@angular/material/input';
import { DatePickerComponent } from '@ss/common/ui-datepicker';
import { MaterialModule } from '@ss/common/api-common';
import { ActivePersonnelService } from '../../active-personnel.service';

@Component({
    selector: 'ss-emp-invitation-detail',
    templateUrl: './employee-invitation-detail.component.html',
    styleUrls: ['./employee-invitation-detail.component.scss'],
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
    ],
})
export class EmployeeInvitationDetailComponent extends BaseChildEntityDetailComponent<Invitation> {
    private formBuilder = inject(FormBuilder);
    private activePersonnelSrv = inject(ActivePersonnelService);

    constructor(protected employeeInvitationSrv: EmployeeInvitationService) {
        super(employeeInvitationSrv, 'Invitation');
    }

    override ngOnInit() {
        super.ngOnInit();
        this.isEditable = this.activePersonnelSrv.val;
    }

    override setupForm(a: Invitation): UntypedFormGroup {
        return (this.form = this.formBuilder.group({
            id: [a.id],
            centerId: [a.centerId || this.loginSrv.appCtx.center],
            parentId: [a.parentId || this.employeeInvitationSrv.getParentId()],
            issueDate: [a.issueDate],
            reference: [a.reference],
            invitationDate: [a.invitationDate],
            invitationHour: [a.invitationHour],
            subject: [a.subject],
        }));
    }
}
