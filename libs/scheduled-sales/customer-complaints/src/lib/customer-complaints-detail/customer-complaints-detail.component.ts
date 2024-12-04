import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseEntityDetailComponent } from '@ss/common/ui-base-entity';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { FormsModule, ReactiveFormsModule, UntypedFormBuilder, Validators } from '@angular/forms';
import { ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { CustomerComplaint } from '../customer-complaint.class';
import { CustomerComplaintsService } from '../customer-complaint.service';
import { ComplaintTypeService } from '../complaint-type.service';
import {  DefaultAutoCompleteModel } from '@ss/common/ui-auto-complete';

import { MatCard, MatCardContent } from '@angular/material/card';
import { MatError, MatFormField, MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatInput, MatInputModule } from '@angular/material/input';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { LoginService, MaterialModule } from '@ss/common/api-common';
import { MatRadioButton, MatRadioGroup, MatRadioModule } from '@angular/material/radio';
import { DatePickerComponent } from '@ss/common/ui-datepicker';

import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';

@Component({
    selector: 'ss-customer-complaints-detail',
    standalone: true,
    imports: [
        CommonModule,

        DatePickerComponent,


        MatButtonModule,
        MatCheckboxModule,
        MatExpansionModule,
        MatFormFieldModule,
        MatInputModule,
        MatOptionModule,
        MatRadioModule,
        MatSelectModule,
        MaterialModule,
        ReactiveFormsModule
    ],
    templateUrl: './customer-complaints-detail.component.html',
    styleUrl: './customer-complaints-detail.component.css',
})
export class CustomerComplaintsDetailComponent extends BaseEntityDetailComponent<CustomerComplaint> {
    private loginSrv = inject(LoginService);
    private complaintTypeSrv = inject(ComplaintTypeService);
    complaintLookup = new DefaultAutoCompleteModel(this.complaintTypeSrv);

    constructor(
        public override entitySrv: CustomerComplaintsService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override formBuilder: UntypedFormBuilder,
        public override confirmationSrv: ConfirmationDialogService) {
        super(entitySrv, shellSrv, snackBarSrv, route, formBuilder, confirmationSrv, 'COMMON_COMPLAINTS');
    }


    public override setupForm(b: CustomerComplaint) {
        // Make sure to update the template if you edit the configuration here
        return this.formBuilder.group({
            id:            [b.id],
            centerId:      [b.centerId || this.loginSrv.appCtx.center],
            agentId:       [b.agentId || this.loginSrv.appCtx.agentId],
            complaintId:   [{ value: b.complaintId, disabled: this.loginSrv.appCtx.id > 0 }, Validators.required],
            complaintType: [{ value: b.complaintType, disabled: this.loginSrv.appCtx.id > 0 }, Validators.required],
            complaint:     [{ value: b.complaint, disabled: this.loginSrv.appCtx.id > 0 }, Validators.required],
            answer:        [{ value: b.answer, disabled: this.loginSrv.appCtx.id < 1 }],
        });
    }

    override readForm(): CustomerComplaint {
        const value = this.form.getRawValue();
        value.complaintType = +value.complaintType;
        return value;
    }
}
