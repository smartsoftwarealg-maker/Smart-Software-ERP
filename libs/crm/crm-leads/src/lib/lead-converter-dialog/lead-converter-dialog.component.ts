import { Component, Inject, inject } from '@angular/core';
import { MaterialModule } from '@ss/common/api-common';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, Validators } from '@angular/forms';
import {
    DefaultAutoCompleteModel,
    UiAutoCompleteComponent,
} from '@ss/common/ui-auto-complete';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TranslateDirective, TranslatePipe } from '@ss/common/ui-lang';
import { LeadConverter } from '../lead-api';
import { CompanyService } from '@ss/administration/api-company';
import { CrmContactService } from '@ss/crm/crm-customer';
import { CRMContactLookup } from '../../../../crm-opportunity/src/lib/crm-opportunity-api';
import { CRMLeadsService } from '@ss/crm/leads';

@Component({
    selector: 'ss-lead-converter-dialog',
    standalone: true,
    imports: [
        MatButtonModule,
        TranslateDirective,
        MaterialModule,
        TranslatePipe,
        UiAutoCompleteComponent,
    ],
    templateUrl: './lead-converter-dialog.component.html',
    styleUrl: './lead-converter-dialog.component.scss',
})
export class LeadConverterDialogComponent {
    private leadSrv = inject(CRMLeadsService);
    private companySrv = inject(CompanyService);
    private contactSrv = inject(CrmContactService);
    private fb = inject(FormBuilder);

    leadLookup = new DefaultAutoCompleteModel(this.leadSrv);
    contactLookup = new CRMContactLookup(this.contactSrv);
    companyLookup = new DefaultAutoCompleteModel(this.companySrv);

    form = this.fb.group({
        leadId: [{ value: 0, disabled: true }],
        companyId: [0, Validators.required],
        contactId: [0, Validators.required],
    });

    constructor(
        private dialogRef: MatDialogRef<LeadConverterDialogComponent>,
        @Inject(MAT_DIALOG_DATA) private data: LeadConverter,
    ) {
        this.contactSrv.setParentId(data.leadId)
        this.form.controls['leadId'].setValue(data.leadId);
        this.form.controls['companyId'].setValue(data.companyId || 0);
        this.form.controls['contactId'].setValue(data.contactId || 0);
    }

    save() {
        const val: LeadConverter = this.form.getRawValue() as LeadConverter;
        this.leadSrv.converter(val).subscribe({
            next: () => {
                this.dialogRef.close(true);
            },
            error: (e) => {
                throw e;
            },
        });

    }

    public cancel() {
        this.dialogRef.close(false);
    }
}
