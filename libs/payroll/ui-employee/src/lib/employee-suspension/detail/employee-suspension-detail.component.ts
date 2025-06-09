import { Component, inject } from '@angular/core';
import {
    FormBuilder,
    UntypedFormGroup,
    FormsModule,
    ReactiveFormsModule,
} from '@angular/forms';
import { BaseChildEntityDetailComponent } from '@ss/common/ui-base-entity';
import {
    Suspension,
    EmployeeSuspensionService,
} from '@ss/payroll/api-employee';
import { MatMiniFabButton } from '@angular/material/button';
import { MatCard, MatCardContent } from '@angular/material/card';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { TranslateDirective } from '@ss/common/ui-lang';
import { MatInput } from '@angular/material/input';
import { DatePickerComponent } from '@ss/common/ui-datepicker';
import { MaterialModule } from '@ss/common/api-common';
import { ActivePersonnelService } from '../../active-personnel.service';
import { SuspensionReasonService } from '@ss/common/api-lookup';
import { AsyncPipe } from '@angular/common';
import { map } from 'rxjs/operators';

@Component({
    selector: 'ss-emp-suspension-detail',
    templateUrl: './employee-suspension-detail.component.html',
    styleUrls: ['./employee-suspension-detail.component.scss'],
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
export class EmployeeSuspensionDetailComponent extends BaseChildEntityDetailComponent<Suspension> {
    private formBuilder = inject(FormBuilder);
    private activePersonnelSrv = inject(ActivePersonnelService);
    private suspensionReasonSrv = inject(SuspensionReasonService);

    suspensionReasons = this.suspensionReasonSrv.getList(0, 500).pipe(map(res => res.body));

    constructor(protected employeeSuspensionSrv: EmployeeSuspensionService) {
        super(employeeSuspensionSrv, 'Suspension');
    }

    override ngOnInit() {
        super.ngOnInit();
        this.isEditable = this.activePersonnelSrv.val;
    }

    override setupForm(a: Suspension): UntypedFormGroup {
        return (this.form = this.formBuilder.group({
            id: [a.id],
            centerId: [a.centerId || this.loginSrv.appCtx.center],
            parentId: [a.parentId || this.employeeSuspensionSrv.getParentId()],
            refDate: [a.refDate],
            reference: [a.reference],
            fromDate: [a.fromDate],
            toDate: [a.toDate],
            motive: [a.motive],
        }));
    }
}
