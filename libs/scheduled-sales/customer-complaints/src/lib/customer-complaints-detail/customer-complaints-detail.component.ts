import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseEntityDetailComponent } from '@ss/common/ui-base-entity';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { ActivatedRoute } from '@angular/router';
import { FormsModule, ReactiveFormsModule, UntypedFormBuilder, Validators } from '@angular/forms';
import { ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { CustomerComplaint } from '../customer-complaint.class';
import { CustomerComplaintsService } from '../customer-complaint.service';
import { ComplaintTypeService } from '../complaint-type.service';
import { CommonUiAutoCompleteModule, DefaultAutoCompleteModel } from '@ss/common/ui-auto-complete';
import { CommonUiLangModule } from '@ss/common/ui-lang';
import { MatCard, MatCardContent } from '@angular/material/card';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { LoginService } from '@ss/common/api-common';

@Component({
    selector: 'ss-customer-complaints-detail',
    standalone: true,
    imports: [CommonModule, CommonUiLangModule, FormsModule, MatCard, MatCardContent, MatError, MatFormField, MatInput, MatLabel, ReactiveFormsModule, CdkTextareaAutosize, CommonUiAutoCompleteModule],
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
            id:          [b.id],
            centerId:    [b.centerId || this.loginSrv.appCtx.center],
            agentId:     [b.agentId || this.loginSrv.appCtx.agentId],
            complaintId: [b.complaintId, Validators.maxLength(4)],
            complaint:   [b.complaint, Validators.required],
            answer:      [{ value: b.answer, disabled: true }],
        });
    }

}
