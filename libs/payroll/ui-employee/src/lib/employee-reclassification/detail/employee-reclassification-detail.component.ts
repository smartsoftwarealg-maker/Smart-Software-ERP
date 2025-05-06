import { Component, inject } from '@angular/core';
import {
    FormBuilder,
    UntypedFormGroup,
    FormsModule,
    ReactiveFormsModule,
} from '@angular/forms';
import { BaseChildEntityDetailComponent } from '@ss/common/ui-base-entity';
import {
    Reclassification,
    EmployeeReclassificationService,
} from '@ss/payroll/api-employee';
import { MatMiniFabButton } from '@angular/material/button';
import { MatCard, MatCardContent } from '@angular/material/card';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { TranslateDirective } from '@ss/common/ui-lang';
import { MatInput } from '@angular/material/input';
import { DatePickerComponent } from '@ss/common/ui-datepicker';
import { MaterialModule } from '@ss/common/api-common';
import { ActivePersonnelService } from '../../active-personnel.service';
import {
    DefaultAutoCompleteModel,
    UiAutoCompleteComponent,
} from '@ss/common/ui-auto-complete';
import {
    ActivePostService,
    DepartmentService,
    ServiceService,
} from '@ss/common/api-lookup';

@Component({
    selector: 'ss-emp-reclassification-detail',
    templateUrl: './employee-reclassification-detail.component.html',
    styleUrls: ['./employee-reclassification-detail.component.scss'],
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
export class EmployeeReclassificationDetailComponent extends BaseChildEntityDetailComponent<Reclassification> {
    private formBuilder = inject(FormBuilder);
    private activePersonnelSrv = inject(ActivePersonnelService);
    private departmentSrv = inject(DepartmentService);
    private postSrv = inject(ActivePostService);
    private serviceSrv = inject(ServiceService);

    departmentLookup = new DefaultAutoCompleteModel(this.departmentSrv);
    postLookup = new DefaultAutoCompleteModel(this.postSrv);
    serviceLookup = new DefaultAutoCompleteModel(this.serviceSrv);

    constructor(
        protected employeeReclassificationSrv: EmployeeReclassificationService,
    ) {
        super(employeeReclassificationSrv, 'Reclassification');
    }

    override ngOnInit() {
        super.ngOnInit();
        this.isEditable = this.activePersonnelSrv.val;
    }

    override setupForm(a: Reclassification): UntypedFormGroup {
        return (this.form = this.formBuilder.group({
            id: [a.id],
            centerId: [a.centerId || this.loginSrv.appCtx.center],
            parentId: [
                a.parentId || this.employeeReclassificationSrv.getParentId(),
            ],
            refDate: [a.refDate],
            reference: [a.reference],
            decisionDate: [a.decisionDate],
            motive: [a.motive],
            post: [a.post],
            department: [a.department],
            service: [a.service],
        }));
    }
}
