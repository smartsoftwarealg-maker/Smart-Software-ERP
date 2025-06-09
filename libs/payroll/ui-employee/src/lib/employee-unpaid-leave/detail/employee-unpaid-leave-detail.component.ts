import { Component, inject } from '@angular/core';
import {
    FormBuilder,
    UntypedFormGroup,
    FormsModule,
    ReactiveFormsModule,
} from '@angular/forms';
import { BaseChildEntityDetailComponent } from '@ss/common/ui-base-entity';
import { UnpaidLeave, EmployeeUnpaidLeavesService } from '@ss/payroll/api-employee';
import { MatMiniFabButton } from '@angular/material/button';
import { MatCard, MatCardContent } from '@angular/material/card';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { TranslateDirective } from '@ss/common/ui-lang';
import { MatInput } from '@angular/material/input';
import { DatePickerComponent } from '@ss/common/ui-datepicker';
import { MaterialModule } from '@ss/common/api-common';
import { ActivePersonnelService } from '@ss/payroll/ui-employee';
import { SuspensionReasonService } from '@ss/common/api-lookup';
import { AsyncPipe } from '@angular/common';
import { map } from 'rxjs/operators';

@Component({
    selector: 'ss-emp-unpaid-leave-detail',
    templateUrl: './employee-unpaid-leave-detail.component.html',
    styleUrls: ['./employee-unpaid-leave-detail.component.scss'],
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
        AsyncPipe,
    ],
})
export class EmployeeUnpaidLeaveDetailComponent extends BaseChildEntityDetailComponent<UnpaidLeave> {
    private formBuilder = inject(FormBuilder);
    private activePersonnelSrv = inject(ActivePersonnelService);
    private suspensionReasonSrv = inject(SuspensionReasonService);

    suspensionReasons = this.suspensionReasonSrv.getList(0, 500).pipe(map(res => res.body));

    constructor(protected employeeUnpaidLeaveSrv: EmployeeUnpaidLeavesService) {
        super(employeeUnpaidLeaveSrv, 'UnpaidLeave');
    }

    override ngOnInit() {
        super.ngOnInit();
        this.isEditable = this.activePersonnelSrv.val;
    }

    override setupForm(a: UnpaidLeave): UntypedFormGroup {
        return (this.form = this.formBuilder.group({
            id: [a.id],
            centerId: [a.centerId || this.loginSrv.appCtx.center],
            parentId: [a.parentId || this.employeeUnpaidLeaveSrv.getParentId()],
            refDate: [a.refDate],
            reference: [a.reference],
            fromDate: [a.fromDate],
            toDate: [a.toDate],
            motive: [a.motive],
        }));
    }
}
